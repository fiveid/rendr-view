import React from "react";
import {
  useScrollMarkers,
  scrollMarkers
} from "@rendr-view/use-scroll-markers";

export interface Props {
  titleBarActiveClassList?: string[];
  dataAttribute?: string;
}

const selectors = (dataAttribute: string) => [`[${dataAttribute}]`];

const scrollMarkerTransformer = (el: HTMLElement) => ({
  text: el.textContent || "",
  top: el.offsetTop
});

const onScroll =
  (
    container?: HTMLElement | null,
    title?: HTMLElement | null,
    titleBarActiveClassList: string[] = []
  ) =>
  () => {
    if (container && title) {
      const scrollTop = container.scrollTop;
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
      onScroll(container, title, titleBarActiveClassList)
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

  const { currentScrollPoint } = useScrollMarkers<{ text?: string }>({
    containerRef,
    selectors: selectors(dataAttribute),
    scrollMarkerTransformer,
    onScroll: onScroll(
      containerRef.current,
      titleRef.current,
      titleBarActiveClassList
    )
  });

  const activeTitle = currentScrollPoint?.text || "";

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const titleOutput = titleRef.current?.querySelector(
        "[data-title-output]"
      );

      if (titleOutput) {
        titleOutput.textContent = activeTitle;
      }
    }
  }, [activeTitle]);

  return {
    containerRef,
    titleRef
  };
}
