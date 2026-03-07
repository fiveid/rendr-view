import React from "react";
import {
  useScrollMarkersStateless,
  scrollMarkers,
  offsetTop
} from "@rendr-view/use-scroll-markers";

export interface Props {
  titleBarActiveClassList?: string[];
  dataAttribute?: string;
}

const selectors = (dataAttribute: string) => [`[${dataAttribute}]`];

const scrollMarkerTransformer = (el: HTMLElement) => ({
  text: el.textContent || "",
  top: offsetTop(el)
});

const onScroll =
  (
    titleRef: React.RefObject<HTMLElement | null>,
    titleBarActiveClassList: string[] = []
  ) =>
  (container?: HTMLElement | null) => {
    const title = titleRef.current;
    if (title) {
      const scrollTop = container ? container.scrollTop : window.scrollY;
      const titleHeight = title.clientHeight;

      if (scrollTop > titleHeight) {
        title.classList.add(...titleBarActiveClassList);
      } else {
        title.classList.remove(...titleBarActiveClassList);
      }
    }
  };

export function dynamicTitleBar(
  container: HTMLDivElement,
  title: HTMLElement,
  titleBarActiveClassList: string[],
  dataAttribute = "data-title"
) {
  if (typeof window !== "undefined") {
    const titleOutput = title?.querySelector("[data-title-output]");
    return scrollMarkers(
      selectors(dataAttribute),
      currentPoint => {
        if (titleOutput && currentPoint.text) {
          titleOutput.textContent = currentPoint.text;
        }
      },
      container,
      scrollMarkerTransformer,
      onScroll({ current: title }, titleBarActiveClassList)
    );
  }

  return;
}

export function useDynamicTitleBar({
  titleBarActiveClassList = [],
  dataAttribute = "data-title"
}: Props) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  const memoizedSelectors = React.useMemo(
    () => selectors(dataAttribute),
    [dataAttribute]
  );

  useScrollMarkersStateless<{ text?: string }>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    containerRef: containerRef as any,
    selectors: memoizedSelectors,
    scrollMarkerTransformer,
    // eslint-disable-next-line react-hooks/refs
    onScroll: onScroll(titleRef, titleBarActiveClassList),
    callback: currentPoint => {
      const activeTitle = currentPoint?.text || "";

      if (typeof window !== "undefined" && activeTitle) {
        const titleOutput = titleRef.current?.querySelector(
          "[data-title-output]"
        );

        if (titleOutput) {
          titleOutput.textContent = activeTitle;
        }
      }
    }
  });

  return {
    containerRef,
    titleRef
  };
}
