import React from "react";
import TagManager from "react-gtm-module";
import GTMContext from "./gtm-context";
import { gtmPush } from "./gtm-push";
import {
  GTMElementEventParser,
  GTMEventDataset,
  GTMEventTransformer,
  GTMPushFn
} from "./types";
import {
  defaultTransformer,
  getElementWithGTMDataset,
  shouldCaptureEvent
} from "./utils";

export interface Props {
  containerClassName?: string;
  trackingId?: string;
  captureClicks?: boolean;
  mockPushHandler?: GTMPushFn;
  children: React.ReactNode;
  event?: GTMEventDataset;
  transformer?: GTMEventTransformer;
  elementEventParser?: GTMElementEventParser;
}

function GTMHandler(props: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  const parent = React.useContext(GTMContext);
  const [initialised, setInitialised] = React.useState(false);
  const defaultEvent = { ...parent.event, ...props.event };
  const mockPushHandler = props.mockPushHandler || parent.mockPushHandler;
  const transformer =
    props.transformer || parent.transformer || defaultTransformer;

  React.useEffect(() => {
    if (props.trackingId) {
      // Note: this will fire twice in DEV mode due to react 18 rendering behaviour
      // see here: https://github.com/vercel/next.js/issues/35822
      window.dataLayer = window.dataLayer || [];
      TagManager.initialize({ gtmId: props.trackingId });
    }
    setInitialised(true);
  }, []);

  function push(gtmEvent: GTMEventDataset) {
    const eventWithDefaults = transformer(
      Object.assign({}, gtmEvent, defaultEvent)
    );

    if (mockPushHandler) {
      mockPushHandler(eventWithDefaults);
      return;
    }

    gtmPush(eventWithDefaults);
  }

  // If props.captureClicks is true, all clicks on the site will trigger the method below
  // the idea is to trigger or modify GTM events, if not set up in data layer
  // this is not active by default
  function handleClick(e: React.MouseEvent<HTMLElement>) {
    if (e.target) {
      const target = e.target as HTMLElement;
      const eventElement = getElementWithGTMDataset(target);

      if (eventElement) {
        // This is in case we have nested GTMHandlers with click capture
        // Only capture the click if this GTMHandler is the first parent
        // of the target element
        if (!shouldCaptureEvent(eventElement, ref)) {
          return;
        }

        let gtmData: GTMEventDataset = {
          event: eventElement.dataset.eventType,
          category: eventElement.dataset.eventCategory,
          label: eventElement.dataset.eventLabel,
          page: eventElement.dataset.eventPage,
          action: eventElement.dataset.eventAction,
          context: eventElement.dataset.eventContext,
          data: eventElement.dataset.eventData
        };

        if (props.elementEventParser) {
          gtmData = {
            ...gtmData,
            ...props.elementEventParser(eventElement)
          };
        }

        push(gtmData);
      }
    }
  }

  const containerProps = props.captureClicks
    ? { onClickCapture: handleClick }
    : {};

  return (
    <GTMContext.Provider
      value={{
        push,
        event: defaultEvent,
        mockPushHandler,
        initialised,
        transformer
      }}
    >
      <div
        className={props.containerClassName}
        ref={ref}
        data-gtm-handler
        {...containerProps}
      >
        {props.children}
      </div>
    </GTMContext.Provider>
  );
}

export default GTMHandler;
