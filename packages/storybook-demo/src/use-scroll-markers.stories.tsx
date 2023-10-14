import { useScrollMarkers } from "@rendr-view/use-scroll-markers";
import clsx from "clsx";
import React from "react";

export default {
  title: "hooks/useScrollMarkers",
  parameters: {
    layout: "fullscreen"
  }
};

const MarkerBox = (props: {
  id: string;
  height?: number;
  className?: string;
  marker?: boolean;
}) => (
  <div
    id={props.id}
    className={clsx("w-full p-6", props.className, {
      "MarkerBox--with-marker": props.marker
    })}
    style={{ height: `${props.height ?? 300}px` }}
  >
    <span className="font-bold">
      {props.id} -{" "}
      {props.marker ? "Has scroll marker" : "Does not have scroll marker"}
    </span>
  </div>
);

export const Example = () => {
  const { currentScrollPoint } = useScrollMarkers<{ id: string }>({
    selectors: [".MarkerBox--with-marker"],
    scrollMarkerTransformer: el => ({
      id: el.id
    })
  });
  return (
    <div>
      <MarkerBox id="box-1" className="bg-red-900 text-white" />
      <MarkerBox id="box-2" className="bg-red-500 text-white" marker />
      <MarkerBox id="box-3" className="bg-red-600 text-white" marker />
      <MarkerBox id="box-4" className="bg-red-200" />
      <MarkerBox id="box-5" className="bg-red-300" marker />
      <MarkerBox id="box-6" className="bg-red-900 text-white" />
      <MarkerBox id="box-7" className="bg-red-500 text-white" marker />
      <MarkerBox id="box-8" className="bg-red-600 text-white" />
      <MarkerBox id="box-9" className="bg-red-200" marker />
      <MarkerBox id="box-10" className="bg-red-300" />
      <MarkerBox id="box-11" className="bg-red-600 text-white" marker />
      <MarkerBox id="box-12" className="bg-red-500 text-white" />

      {currentScrollPoint ? (
        <div className="fixed top-6 right-6 p-6 bg-white border-2 border-black">
          Current scroll point: {currentScrollPoint.id}
        </div>
      ) : null}
    </div>
  );
};
