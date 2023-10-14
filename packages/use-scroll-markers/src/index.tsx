import debounce from "lodash.debounce";
import React from "react";

export type SelectorsType = string[];
export type ScrollMarkerTransformerFn<P = {}> = (el: HTMLElement) => P;
export type OnScrollFn = (container?: HTMLElement | null) => void;
export type ScrollPoint<P = {}> = Omit<P, "top"> & { top: number };

export interface Props {
  selectors: SelectorsType;
  scrollMarkerTransformer?: ScrollMarkerTransformerFn;
  containerRef?: React.RefObject<HTMLElement>;
  onScroll?: OnScrollFn;
}

export function offsetTop(node?: HTMLElement): number {
  if (!node) {
    return 0;
  }
  return Math.round(
    node.getBoundingClientRect().top + document.documentElement.scrollTop
  );
}

export function getScrollPoints<P = {}>(
  container: HTMLElement,
  selectors: SelectorsType,
  fn?: ScrollMarkerTransformerFn
) {
  const points: ScrollPoint<P>[] = [];
  const elements: HTMLElement[] = [];

  selectors.forEach((selector, i) => {
    if (selector) {
      try {
        const els = container.querySelectorAll<HTMLElement>(selector);

        els?.forEach(e => {
          e.dataset.scrollMarker = `${i}`;
          e.dataset.scrollMarkerSelector = selector;
          elements.push(e);
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(err);
      }
    }
  });

  elements.forEach(el => {
    points.push({
      top: offsetTop(el),
      ...(fn ? fn(el) : {})
    } as ScrollPoint<P>);
  });

  return points;
}

function sortScrollPoints(a: any, b: any) {
  return (a.top || 0) - (b.top || 0);
}

export function scrollMarkers(
  selectors: SelectorsType,
  callback: (currentPoint: any) => void,
  container?: HTMLElement | null,
  fn?: ScrollMarkerTransformerFn,
  onScrollFn?: OnScrollFn
) {
  let scrollPoints: any = [];

  function onResize() {
    scrollPoints = getScrollPoints(container || document.body, selectors, fn);
  }

  function onScroll() {
    if (onScrollFn) {
      onScrollFn(container);
    }

    const scrollTop = container?.scrollTop || window.scrollY;

    const currentPoint = scrollPoints
      .sort(sortScrollPoints)
      .reduce((acc: string, current: any) => {
        if (scrollTop > current.top) {
          return current;
        }

        return acc;
      }, undefined);

    callback(currentPoint);
  }

  onResize();

  const debouncedOnScroll = debounce(onScroll, 10);
  const debouncedOnResize = debounce(onResize, 100);

  if (container) {
    container.addEventListener("scroll", debouncedOnScroll);
  } else {
    window.addEventListener("scroll", debouncedOnScroll);
  }

  window.addEventListener("resize", debouncedOnResize);

  // We will also add a mutation observer to update scrollpoints in response
  // to changes to the DOM
  const observer = new MutationObserver(debouncedOnResize);
  observer.observe(container || document.body, {
    childList: true
  });

  return () => {
    if (container) {
      container.removeEventListener("scroll", debouncedOnScroll);
    } else {
      window.removeEventListener("scroll", debouncedOnScroll);
    }

    window.removeEventListener("resize", debouncedOnResize);

    // disconnect the mutation observer
    observer.disconnect();
  };
}

export function useScrollMarkers<P = {}>({
  selectors,
  scrollMarkerTransformer,
  containerRef,
  onScroll
}: Props): {
  currentScrollPoint?: ScrollPoint<P>;
} {
  const [currentScrollPoint, setCurrentScrollPoint] = React.useState();

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    return scrollMarkers(
      selectors,
      setCurrentScrollPoint,
      containerRef?.current,
      scrollMarkerTransformer,
      onScroll
    );
  }, [selectors, scrollMarkerTransformer, containerRef, setCurrentScrollPoint]);

  return {
    currentScrollPoint
  };
}
