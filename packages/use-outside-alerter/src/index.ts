import debounce from "lodash.debounce";
import React from "react";

export function useOutsideAlerter(
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
  events: string[] = ["mouseup"]
) {
  React.useEffect(() => {
    const el = ref.current;
    function handleClickOutside(event: MouseEvent) {
      if (el && event.target !== el && !el.contains(event.target as Node)) {
        callback();
      }
    }

    const handleFocusChange = debounce(() => {
      const focusedElement = document.activeElement;
      // if has focus, don't do anything
      if (
        el &&
        (focusedElement === el || el.contains(focusedElement as Node))
      ) {
        return;
      }
      // otherwise, trigger callback
      callback();
    }, 500);

    const handleBlurChange = debounce(() => {
      const focusedElement = document.activeElement;
      // if focus is still on element, don't do anything
      if (
        el &&
        (focusedElement === el || el.contains(focusedElement as Node))
      ) {
        return;
      }
      // otherwise, trigger callback
      callback();
    }, 500);

    if (events.includes("mouseup")) {
      document.addEventListener("mouseup", handleClickOutside);
    }

    if (events.includes("focus")) {
      document.addEventListener("focus", handleFocusChange, true);
    }

    if (events.includes("blur")) {
      document.addEventListener("blur", handleBlurChange, true);
    }

    return () => {
      if (events.includes("mouseup")) {
        document.removeEventListener("mouseup", handleClickOutside);
      }

      if (events.includes("focus")) {
        document.removeEventListener("focus", handleFocusChange);
      }

      if (events.includes("blur")) {
        document.removeEventListener("blur", handleBlurChange);
      }
    };
  }, [ref, callback, events]);
}
