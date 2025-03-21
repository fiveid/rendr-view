import clsx from "clsx";
import debounce from "lodash.debounce";
import React from "react";

export type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  React.PropsWithChildren<{
    className?: string;
    opened?: boolean;
    duration?: string;
    /**
     * hideOnLoad: boolean
     * normally, the content will be initially rendered on the page and then hidden
     * immediately after load. You can disable this to make sure the content is
     * always hidden until activated
     */
    hideOnLoad?: boolean;
    /**
     * alwaysRenderChildren: boolean
     * if set to true, children will always render whether accordion open or not
     * otherwise, children will only render if the accordion is opened
     * default: true
     * */
    alwaysRenderChildren?: boolean;
    /**
     * getInnerContentHeight: function
     * by default, the accordion uses scrollHeight on the first child of the container to get
     * the target "open" height. If this causes problems, you can pass a function to
     * calculate the height in a different way
     */
    getInnerContentHeight?: (div: HTMLDivElement) => number | void;
    /** disableMutationObserver: boolean
     * by default, we use mutation observer to resize accordion when content changes,
     * if this is not needed, you can disable this
     */
    disableMutationObserver?: boolean;
    /**
     * alwaysDebounceAdjustHeight: boolean
     * this ensures we always debounce adjust height, even when triggered by `opened` changing
     * by default this is set to true, which is the way it originally was
     * and so is how it's been used to date
     * set it to false to disable this behaviour
     **/
    alwaysDebounceAdjustHeight?: boolean;
  }>;

const defaultGetInnerContentHeight = (div?: HTMLDivElement) => {
  const child = div?.children?.[0];
  return child?.scrollHeight;
};

function AccordionBox({
  opened,
  duration = "duration-700",
  hideOnLoad,
  alwaysRenderChildren = true,
  alwaysDebounceAdjustHeight = true,
  getInnerContentHeight,
  disableMutationObserver,
  children,
  ...props
}: Props) {
  const [renderedChildren, setRenderedChildren] =
    React.useState<React.ReactNode>(
      alwaysRenderChildren ? children : undefined
    );
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    const div = ref.current;

    function adjustHeight() {
      if (opened) {
        const getContentHeight =
          getInnerContentHeight ?? defaultGetInnerContentHeight;
        const contentHeight = getContentHeight(div);

        if (!contentHeight) {
          return;
        }

        div.style.height = `${contentHeight}px`;
        div.ariaHidden = "false";
        div.style.visibility = "visible"; // prevent content from being focusable
      } else {
        div.style.height = "0px";
        div.ariaHidden = "true";
        div.style.visibility = "hidden";
      }
    }

    const handleResize = debounce(adjustHeight, 100);

    let observer: MutationObserver | undefined;

    if (!disableMutationObserver) {
      // We will also add a mutation observer to update accordion box in response
      // to changes to the DOM
      observer = new MutationObserver(adjustHeight);
      observer.observe(div || document.body, {
        childList: true,
        subtree: true
      });
    }

    if (alwaysDebounceAdjustHeight) {
      handleResize();
    } else {
      adjustHeight();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (observer) {
        // disconnect the mutation observer
        observer.disconnect();
      }
    };
  }, [
    opened,
    getInnerContentHeight,
    disableMutationObserver,
    alwaysDebounceAdjustHeight
  ]);

  React.useEffect(() => {
    if (alwaysRenderChildren) {
      setRenderedChildren(children);
      return;
    }

    // If the accordion content changes dynamically
    // (when using a loading animation, for example)
    // we render children with a slight delay to avoid
    // firing mutationobserver incorrectly
    if (opened) {
      const tm = setTimeout(() => {
        setRenderedChildren(children);
      }, 50);

      return () => {
        clearTimeout(tm);
      };
    }
  }, [children, opened, alwaysRenderChildren]);

  const initialStyle: React.CSSProperties = {
    overflow: "hidden"
  };

  if (hideOnLoad) {
    initialStyle.height = "0px";
  }

  return (
    <div
      ref={ref}
      style={initialStyle}
      {...props}
      className={clsx(duration, props.className)}
    >
      {renderedChildren}
    </div>
  );
}

export default AccordionBox;
