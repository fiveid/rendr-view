import React from "react";
import debounce from "lodash.debounce";
import { initialState, ScrollSnapState } from "./state";
import * as ScrollSnapFunctions from "./functions";

export function useScrollSnapControls(
  ref: React.RefObject<HTMLDivElement>,
  options: {
    initialSlide?: number;
    slideSelector?: string;
    debounceTime?: number;
    getSlides?: typeof ScrollSnapFunctions.getSlides;
    getScrollLeftForView?: typeof ScrollSnapFunctions.getScrollLeftForView;
    getScrollLeftForSlide?: typeof ScrollSnapFunctions.getScrollLeftForSlide;
    getScrollState?: typeof ScrollSnapFunctions.getScrollState;
    getModifiedIndex?: typeof ScrollSnapFunctions.getModifiedIndex;
    normaliseIndex?: typeof ScrollSnapFunctions.normaliseIndex;
  } = {}
) {
  const [state, setState] = React.useState<ScrollSnapState>(initialState);

  const slideSelector = options.slideSelector || ".slide";

  const getScrollLeftForSlide =
    options.getScrollLeftForSlide || ScrollSnapFunctions.getScrollLeftForSlide;
  const getScrollLeftForView =
    options.getScrollLeftForView || ScrollSnapFunctions.getScrollLeftForView;
  const getSlides = options.getSlides || ScrollSnapFunctions.getSlides;
  const getScrollState =
    options.getScrollState || ScrollSnapFunctions.getScrollState;
  const getModifiedIndex =
    options.getModifiedIndex || ScrollSnapFunctions.getModifiedIndex;
  const normaliseIndex =
    options.normaliseIndex || ScrollSnapFunctions.normaliseIndex;

  React.useEffect(() => {
    if (!ref.current || typeof window === "undefined") {
      return;
    }

    const slider = ref.current;
    const slides = getSlides(slider, slideSelector);

    if (options.initialSlide !== undefined) {
      const initialOffset = getScrollLeftForSlide(
        slider,
        slides,
        normaliseIndex(options.initialSlide || 0, [0, slides.length - 1])
      );

      if (initialOffset) {
        slider.scrollLeft = initialOffset;
      }
    }

    const handleScroll = debounce(() => {
      if (slides && slides[0]) {
        const slideState = getScrollState(slider, slides);
        setState(slideState);
      }
    }, options.debounceTime || 200);

    slider.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      slider.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  function goToSlide(i: number) {
    if (!ref.current || typeof window === "undefined") {
      return;
    }

    const slider = ref.current;
    const slides = getSlides(slider, slideSelector);
    const normalisedIndex = normaliseIndex(i, state.slides.range);
    const scrollLeft = getScrollLeftForSlide(slider, slides, normalisedIndex);
    ScrollSnapFunctions.goToScrollLeft(slider, scrollLeft);
  }

  function shiftToSlide(modifier: number) {
    const targetIndex = getModifiedIndex(state.slides, modifier);
    goToSlide(targetIndex);
  }

  function goToView(i: number) {
    if (!ref.current || typeof window === "undefined") {
      return;
    }

    const slider = ref.current;
    const normalisedIndex = normaliseIndex(i, state.views.range);
    const scrollLeft = getScrollLeftForView(slider, normalisedIndex);
    ScrollSnapFunctions.goToScrollLeft(slider, scrollLeft);
  }

  function shiftToView(modifier: number) {
    const targetIndex = getModifiedIndex(state.views, modifier);
    goToView(targetIndex);
  }

  return {
    slides: {
      ...state.slides,
      prev: () => shiftToSlide(-1),
      next: () => shiftToSlide(1),
      goTo: goToSlide
    },
    views: {
      ...state.views,
      prev: () => shiftToView(-1),
      next: () => shiftToView(1),
      goTo: goToView
    }
  };
}
