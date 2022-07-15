import { GTMEventDataset } from "./types";

export const gtmDatasetSelector =
  "*:is([data-event-type], [data-event-label], [data-event-category]):not([data-event-disable]";

export function hasGTMDataset(el?: HTMLElement) {
  return el && !el.dataset.eventDisabled && el?.matches(gtmDatasetSelector);
}

export function getElementWithGTMDataset(el: HTMLElement) {
  if (hasGTMDataset(el)) {
    return el;
  }
  const parent = el.closest(gtmDatasetSelector) as HTMLElement;
  if (hasGTMDataset(parent)) {
    return parent;
  }
  return null;
}

export function shouldCaptureEvent(
  el: HTMLElement,
  ref: React.RefObject<HTMLElement>
) {
  const captureHandler = el.closest("[data-gtm-handler]");
  return captureHandler === ref.current;
}

export function defaultTransformer(event: GTMEventDataset) {
  return event;
}
