import { useRef } from "react";
import { useScrollSnapControls } from "@rendr-view/use-scrollsnap-controls";
import type { Meta, StoryObj } from "@storybook/react-vite";
import clsx from "clsx";
import Btn from "@rendr-view/btn";

/**
 * `useScrollSnapControls` is a hook for managing carousels that use CSS scroll snap.
 * It provides state for visible slides/views and functions to navigate between them.
 */
const meta = {
  title: "Hooks/useScrollSnapControls",
  parameters: {
    layout: "fullscreen"
  },
  argTypes: {
    itemWidth: {
      control: "select",
      options: ["w-full", "w-1/2", "w-1/3", "w-[300px]"],
      description: "Width of each carousel item"
    },
    gap: {
      control: "select",
      options: ["gap-0", "gap-4", "gap-8"],
      description: "Gap between items"
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj;

const Slide = ({
  index,
  width,
  isVisible,
  isWhollyVisible
}: {
  index: number;
  width: string;
  isVisible: boolean;
  isWhollyVisible: boolean;
}) => (
  <div
    className={clsx(
      "slide flex-shrink-0 aspect-video rounded-2xl flex flex-col items-center justify-center transition-all duration-500 snap-center border-4",
      width,
      isWhollyVisible
        ? "bg-indigo-600 border-indigo-400 scale-100"
        : isVisible
          ? "bg-indigo-900 border-indigo-700 scale-95"
          : "bg-slate-800 border-slate-700 scale-90 opacity-40"
    )}
  >
    <span className="text-4xl font-black text-white">{index}</span>
    <span className="text-[10px] uppercase tracking-widest text-white/50 mt-2 font-bold">
      {isWhollyVisible ? "Wholly Visible" : isVisible ? "Visible" : "Hidden"}
    </span>
  </div>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CarouselDemo = (args: any) => {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controls = useScrollSnapControls(ref as any, { debounceTime: 50 });
  const items = Array.from({ length: 10 });

  return (
    <div className="bg-slate-950 min-h-screen text-white flex flex-col gap-8 p-12">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-black uppercase tracking-tighter bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">
            Scroll Snap
          </h2>
          <div className="flex flex-wrap gap-4 text-xs font-mono">
            <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
              <span className="text-indigo-400 mr-2">SLIDES:</span>
              {controls.slides.visible.join(", ") || "None"}
            </div>
            <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
              <span className="text-purple-400 mr-2">VIEWS:</span>
              {controls.views.visible.join(", ") || "None"}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Btn
            onClick={controls.slides.prev}
            clx={{ button: "bg-white/5 hover:bg-white/10 border-white/10" }}
          >
            Prev
          </Btn>
          <Btn
            onClick={controls.slides.next}
            clx={{ button: "bg-white/5 hover:bg-white/10 border-white/10" }}
          >
            Next
          </Btn>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        ref={ref}
        className={clsx(
          "carousel relative flex flex-nowrap snap-x snap-mandatory overflow-x-auto pb-8 no-scrollbar",
          args.gap || "gap-4"
        )}
      >
        {items.map((_, i) => (
          <Slide
            key={i}
            index={i}
            width={args.itemWidth || "w-full"}
            isVisible={controls.slides.visible.includes(i)}
            isWhollyVisible={controls.slides.whollyVisible.includes(i)}
          />
        ))}
      </div>

      {/* View Indicators */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: controls.views.count }).map((_, i) => (
          <button
            key={i}
            onClick={() => controls.views.goTo(i)}
            className={clsx(
              "h-1 transition-all duration-300 rounded-full",
              controls.views.visible.includes(i)
                ? "w-8 bg-indigo-500"
                : "w-4 bg-white/10"
            )}
            title={`Go to view ${i}`}
          />
        ))}
      </div>
    </div>
  );
};

export const FullWidth: Story = {
  args: {
    itemWidth: "w-full",
    gap: "gap-0"
  },
  render: CarouselDemo
};

export const PartialWidth: Story = {
  args: {
    itemWidth: "w-[300px]",
    gap: "gap-6"
  },
  render: CarouselDemo
};
