import debounce from "lodash.debounce";
import React from "react";

export interface Options {
  debounce?: number;
}

export function useFillAvailable(options: Options = {}) {
  React.useEffect(() => {
    if (typeof window === undefined) {
      return;
    }

    if (document.documentElement.dataset.useFillAvailable === "enabled") {
      return;
    }

    document.documentElement.dataset.useFillAvailable = "enabled";

    // Set VH variable to ensure full screen height in visible area
    function setVh() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    const debouncedSetVh = debounce(setVh, options?.debounce || 200);
    window.addEventListener("resize", debouncedSetVh);

    setVh();

    return () => {
      document.documentElement.dataset.useFillAvailable = "disabled";
      window.removeEventListener("resize", debouncedSetVh);
    };
  }, []);
}
