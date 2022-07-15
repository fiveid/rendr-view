import { ScrollData, ScrollSnapState } from "./state";

export function getSlides(slider: Element, slideSelector: string): NodeListOf<HTMLElement> {
  return slider.querySelectorAll(slideSelector);
}

export function normaliseIndex(currentIndex: number, range: [number, number]) {
  const [minIndex, maxIndex] = range;
  return currentIndex < minIndex ? maxIndex : currentIndex > maxIndex ? minIndex : currentIndex;
}

export function getElementOffsetCenter(el: Element): number {
  return el.getBoundingClientRect().left + (el.getBoundingClientRect().width / 2);
}

export function getModifiedIndex(scrollData: ScrollData, modifier: number) {
  let targetIndex = 0;

  // First check against whollyVisible items
  if (scrollData.whollyVisible.length) {
    const indexes = scrollData.whollyVisible;
    // Modify either the last of first index NOT wholly visible

    if (modifier > 0) {
      // If increase, add modifier to LAST visible slide
      targetIndex = indexes[indexes.length - 1] + modifier;
    } else {
      // If decrease, or no change, add modifier to FIRST visible slide;
      targetIndex = indexes[0] + modifier;
    }
    // Else use partially visible items
  } else {
    const indexes = scrollData.visible
    const lastScreenIsVisible = indexes[indexes.length - 1] === scrollData.range[1];
    const firstScreenIsVisible = indexes[0] === scrollData.range[0];

    // if last screen is visible, but not wholly visible...
    if (modifier > 0 && !lastScreenIsVisible) {
      // If increase, add modifier to FIRST visible slide
      targetIndex = indexes[indexes.length - 1] + modifier;
    } else {
      // If decrease, or no change, add modifier to LAST visible slide;
      targetIndex = indexes[0] + modifier;

      // If the first screen is only partially visible and we'd attempt to scroll beyond that
      // first display the wholly visible first screen
      if (firstScreenIsVisible && targetIndex < scrollData.range[0]) {
        targetIndex = 0;
      }
    }
  }

  return targetIndex;
}

export function getScrollLeftForSlide(
  slider: HTMLElement,
  slides: NodeListOf<HTMLElement>,
  slideIndex: number
) {
  const i = slideIndex
  const nextSlide = slides[i];

  if (!nextSlide) {
    return;
  }

  // original approach of trying to scroll to center of target slide
  const slideCenterPos = getElementOffsetCenter(nextSlide);
  const sliderOffsetCenter = getElementOffsetCenter(slider);
  const diff = slideCenterPos - sliderOffsetCenter;
  const nextScrollLeft = slider.scrollLeft + diff;

  return nextScrollLeft;
}

export function getScrollLeftForView(slider: HTMLElement, viewIndex: number) {
  return slider.clientWidth * viewIndex;
}

export function getScrollState(slider: Element, slides: NodeListOf<HTMLElement>): ScrollSnapState {
  const visible: number[] = [];
  const whollyVisible: number[] = [];

  const viewBounds = slider.getBoundingClientRect();
  const viewStart = viewBounds.left;
  const viewEnd = viewStart + viewBounds.width;

  slides.forEach((slide, i) => {
    const bounds = slide.getBoundingClientRect();
    const start = bounds.left;
    const end = start + bounds.width;

    if ((start >= viewStart && start <= viewEnd) || (end < viewEnd && end > viewStart)) {
      visible.push(i);

      if (start >= viewStart && end <= viewEnd) {
        whollyVisible.push(i);
      }
    }
  });

  const viewsCount = slider.scrollWidth / slider.clientWidth;
  const currentView = slider.scrollLeft / slider.clientWidth;
  const whollyVisibleViews = Number.isInteger(currentView) ? [currentView] : []

  // the last view is wholly visible as it is a partial view
  if (whollyVisibleViews.length === 0 && currentView >= viewsCount - 1) {
    whollyVisibleViews.push(Math.ceil(currentView));
  }

  const visibleViews = Number.isInteger(currentView) ? whollyVisibleViews : [
    Math.floor(currentView),
    Math.ceil(currentView)
  ];

  return {
    slides: {
      whollyVisible,
      visible,
      count: slides.length,
      range: [0, slides.length - 1]
    },
    views: {
      whollyVisible: whollyVisibleViews,
      visible: visibleViews,
      count: viewsCount,
      range: [0, Math.ceil(viewsCount) - 1]
    }
  };
};


export function goToScrollLeft(slider: HTMLElement, scrollLeft: number) {
  if (!slider || typeof scrollLeft === "undefined") {
    return;
  }

  slider.scroll({
    top: 0,
    left: scrollLeft,
    behavior: "smooth",
  });
};
