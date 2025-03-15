import clsx from "clsx";
import React from "react";
import { offsetTop } from "@rendr-view/use-scroll-markers";
// import { Breakpoint, matchesBreakpoint } from "../../utils/tailwind-utils";

export type Props = React.PropsWithChildren<{
  parallaxMode?: "always" | "in" | "out";
  className?: string;
  innerClassName?: string;
  width?: string;
  height?: string;
  // breakpoint?: Breakpoint;
}>;

function ParallaxWipe({
  width = "w-screen",
  height = "h-screen",
  parallaxMode = "always",
  // breakpoint,
  ...props
}: Props) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const parallaxRef = React.useRef<HTMLDivElement>(null);
  const id = React.useId();

  React.useEffect(() => {
    if (
      !containerRef.current ||
      !parallaxRef.current ||
      typeof window === "undefined"
    ) {
      return;
    }

    const container = containerRef.current;
    const parallax = parallaxRef.current;

    const setAsFixed = () => {
      parallax.style.position = "fixed";
      parallax.style.bottom = "0px";
      parallax.style.left = "0px";
    };

    const setAsRelative = () => {
      parallax.style.position = "relative";
      parallax.style.bottom = "auto";
      parallax.style.left = "auto";
    };

    if (parallaxMode === "always") {
      setAsFixed();
      return;
    }

    const handleScroll = () => {
      // if (!!breakpoint && !matchesBreakpoint(breakpoint)) {
      //   setAsRelative();
      //   return;
      // }

      const scrollY = window.scrollY;
      const bottomPosition =
        offsetTop(container) - window.innerHeight + container.clientHeight;
      const condition =
        parallaxMode === "in"
          ? scrollY >= bottomPosition
          : scrollY < bottomPosition;

      if (condition) {
        setAsRelative();
      } else {
        setAsFixed();
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    parallaxMode
    // breakpoint
  ]);

  return (
    <div
      id={id}
      ref={containerRef}
      className={clsx(
        "ParallaxWipe",
        width,
        height,
        "relative overflow-hidden",
        props.className
      )}
      style={{ clipPath: "inset(0)" }}
    >
      <div
        ref={parallaxRef}
        className={clsx(
          "ParallaxWipe__inner",
          width,
          height,
          props.innerClassName
        )}
      >
        {props.children}
      </div>
    </div>
  );
}

export default ParallaxWipe;
