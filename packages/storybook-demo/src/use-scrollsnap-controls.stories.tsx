import clsx from "clsx";
import React from "react";
import { useScrollSnapControls } from "@rendr-view/use-scrollsnap-controls";

export default {
  title: "hooks/useScrollSnapControls"
};

const Item = ({ index, className }: { index: number; className?: string }) => (
  <div
    className={clsx(
      "slide aspect-video bg-gray-100 border flex justify-center items-center font-bold transition duration-1000",
      {
        "snap-center": true
      },
      className
    )}
  >
    Index {index}
  </div>
);

const items = Array.from(Array(10).keys());

function Example(props: { itemClassName?: string | string[]; options?: any }) {
  const ref = React.useRef(null);
  const controls = useScrollSnapControls(ref, props.options);

  return (
    <div>
      <div className="flex justify-between py-2">
        <div className="flex">
          <span className="block pr-4 font-bold">Slides</span>
          <span className="block pr-4">
            Visible: {controls.slides.visible.join(", ")}
          </span>
          <span className="block pr-4">
            Wholly visible: {controls.slides.whollyVisible.join(", ")}
          </span>
          <span className="block">Count: {controls.slides.count}</span>
        </div>
        <div>
          <button onClick={controls.slides.prev}>Prev</button>
          <button className="ml-2" onClick={controls.slides.next}>
            Next
          </button>
        </div>
      </div>
      <div className="flex justify-between py-2">
        <div className="flex">
          <span className="block pr-4 font-bold">Views</span>
          <span className="block pr-4">
            Visible: {controls.views.visible.join(", ")}
          </span>
          <span className="block pr-4">
            Wholly visible: {controls.views.whollyVisible.join(", ")}
          </span>
          <span className="block">Count: {controls.views.count}</span>
        </div>
        <div>
          <button onClick={controls.views.prev}>Prev</button>
          <button className="ml-2" onClick={controls.views.next}>
            Next
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className="carousel relative flex flex-nowrap snap-x snap-mandatory overflow-x-scroll"
      >
        {items.map(i => (
          <Item
            key={i}
            index={i}
            className={clsx(
              Array.isArray(props.itemClassName)
                ? props.itemClassName[i]
                : props.itemClassName,
              "flex-shrink-0",
              {
                "border-green-200": controls.slides.visible.includes(i),
                "border-green-500": controls.slides.whollyVisible.includes(i)
              }
            )}
          />
        ))}
      </div>
    </div>
  );
}

export const FullWidth = () => (
  <Example itemClassName="w-full" options={{ debounceTime: 50 }} />
);

export const FullWidthInContainer = () => (
  <div className="flex">
    <div className="w-1/2"></div>
    <div className="w-1/2">
      <Example itemClassName="w-full" />
    </div>
  </div>
);

export const HalfWidth = () => <Example itemClassName="w-1/2" />;
export const ThirdWidth = () => (
  <Example
    itemClassName="w-1/3"
    options={{ slidesPerScreen: 3, slideFullscreen: true }}
  />
);

export const variableWidth = () => (
  <Example
    itemClassName={[
      "w-[280px]",
      "w-[480px]",
      "w-[506px]",
      "w-[315px]",
      "w-[280px]",
      "w-[480px]",
      "w-[506px]",
      "w-[315px]",
      "w-[516px]",
      "w-[300px]"
    ]}
  />
);
