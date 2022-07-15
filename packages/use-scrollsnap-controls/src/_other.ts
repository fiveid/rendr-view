// function getSlides(slider: Element, slideSelector: string): NodeListOf<HTMLElement> {
//   return slider.querySelectorAll(slideSelector);
// }

// function getNextSlideIndex(currentIndex: number, maxIndex: number) {
//   return currentIndex < 0 ? maxIndex - 1 : currentIndex >= maxIndex ? 0 : currentIndex;
// }

// export function getElementOffsetCenter(el: Element): number {
//   return el.getBoundingClientRect().left + (el.getBoundingClientRect().width / 2);
// }

// export function getVisibleSlides(slider: Element, slides: NodeListOf<HTMLElement>) {
//   const inView: number[] = [];
//   const whollyInView: number[] = [];

//   const viewBounds = slider.getBoundingClientRect();
//   const viewStart = viewBounds.left;
//   const viewEnd = viewStart + viewBounds.width;

//   slides.forEach((slide, i) => {
//     const bounds = slide.getBoundingClientRect();
//     const start = bounds.left;
//     const end = start + bounds.width;

//     if ((start >= viewStart && start <= viewEnd) || (end < viewEnd && end > viewStart)) {
//       inView.push(i);

//       if (start >= viewStart && end <= viewEnd) {
//         whollyInView.push(i);
//       }
//     }
//   });

//   return {
//     whollyInView,
//     inView,
//     estimatedCurrent: whollyInView[0] ?? inView[0]
//   };
// };

// export function getNextScrollPositionFromCenter(
//   slider: HTMLElement,
//   slides: NodeListOf<HTMLElement>,
//   nextSlideIndex: number
// ) {
//   const i = nextSlideIndex
//   const nextSlide = slides[i];

//   if (!nextSlide) {
//     return;
//   }

//   // original approach of trying to scroll to center of target slide
//   const slideCenterPos = getElementOffsetCenter(nextSlide);
//   const sliderOffsetCenter = getElementOffsetCenter(slider);
//   const diff = slideCenterPos - sliderOffsetCenter;
//   const nextScrollLeft = slider.scrollLeft + diff;

//   console.log({ i, slideCenterPos, sliderOffsetCenter, diff, nextScrollLeft, scrollWidth: slider.scroll });


//   // These are some exceptions I created for three-slides or variable width slides

//   // if (slider.scrollLeft > (slider.scrollWidth - slider.clientWidth)) {
//   //   // if we're already on the last scrollable point, this might represent a problem. We'll assume the user has reached the end of the carousel and can return to 0
//   //   return 0;
//   // }


//   // if (nextScrollLeft <= 0 && i !== 0 && slideCenterPos > slider.scrollLeft) {
//   //   console.log("This does not sound right... Trying to go to 0 without target index being 0 while our target is to the right. Let's move a portion of the width of the target slide");

//   //   return slider.scrollLeft + nextSlide.clientWidth / 2;
//   // }

//   // if (Math.floor(diff) === 0) {
//   //   // This does not sound right. This would cause no change in scroll position. Let's move a portion of the width of the target slide
//   //   return slider.scrollLeft + nextSlide.clientWidth / 2;
//   // }

//   return nextScrollLeft
// };
