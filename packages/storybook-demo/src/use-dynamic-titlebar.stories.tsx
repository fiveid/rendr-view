import { useDynamicTitleBar } from "@rendr-view/use-dynamic-titlebar";
import clsx from "clsx";
import React from "react";

export default {
  title: "hooks/useDynamicTitleBar",
  parameters: {
    layout: "fullscreen"
  }
};

const MarkerBox = (props: {
  height?: number;
  className?: string;
  title?: string;
}) => (
  <div
    className={clsx("w-full p-6", props.className)}
    style={{ height: `${props.height ?? 300}px` }}
  >
    {props.title ? (
      <span className="font-bold" data-title={props.title}>
        {props.title}
      </span>
    ) : null}
  </div>
);

export const Example = () => {
  const { titleRef } = useDynamicTitleBar({});
  return (
    <div className="relative">
      <div
        ref={titleRef}
        className="sticky top-0 right-0 py-4 px-6 bg-white border-b-2 border-black w-full h-16 font-bold"
      >
        <span data-title-output>Title Bar</span>
      </div>
      <MarkerBox className="bg-red-900 text-white" />
      <MarkerBox
        className="bg-red-500 text-white"
        title="A Long-expected Party"
      />
      <MarkerBox className="bg-red-600 text-white" />
      <MarkerBox className="bg-red-200" title="A Shadow of the Past" />
      <MarkerBox className="bg-red-300" />
      <MarkerBox className="bg-red-900 text-white" title="Three is Company" />
      <MarkerBox
        className="bg-red-500 text-white"
        title="A Short Cut to Mushrooms"
      />
      <MarkerBox className="bg-red-600 text-white" />
      <MarkerBox className="bg-red-200" />
      <MarkerBox className="bg-red-300" title="A Conspiracy Unmasked" />
      <MarkerBox className="bg-red-600 text-white" />
      <MarkerBox className="bg-red-500 text-white" />
    </div>
  );
};
