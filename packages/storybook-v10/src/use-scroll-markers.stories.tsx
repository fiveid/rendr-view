import { useRef } from "react";
import {
  useScrollMarkers,
  useScrollMarkersStateless
} from "@rendr-view/use-scroll-markers";
import type { Meta, StoryObj } from "@storybook/react-vite";
import clsx from "clsx";

/**
 * `useScrollMarkers` is a hook that identifies the current scroll point based on a set of selectors.
 * It's useful for creating scroll-spy navigation, TOCs, or any UI that needs to react to scroll progress.
 */
const meta = {
  title: "Hooks/useScrollMarkers",
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;
type Story = StoryObj;

const Section = ({
  id,
  marker,
  color
}: {
  id: string;
  marker?: boolean;
  color: string;
}) => (
  <div
    id={id}
    className={clsx(
      "w-full h-[70vh] flex items-center justify-center border-b border-white/5 transition-colors duration-1000",
      color,
      marker && "scroll-marker"
    )}
  >
    <div className="text-center text-white space-y-2">
      <h3 className="text-3xl font-black uppercase tracking-tighter italic">
        {id}
      </h3>
      <p className="opacity-40 text-xs font-bold uppercase tracking-widest">
        {marker ? "✨ Scroll Marker Active" : "Buffer Section"}
      </p>
    </div>
  </div>
);

export const Default: Story = {
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { currentScrollPoint } = useScrollMarkers<{ id: string }>({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      containerRef: containerRef as any,
      selectors: [".scroll-marker"],
      scrollMarkerTransformer: el => ({ id: el.id })
    });

    return (
      <div className="h-screen flex flex-col overflow-hidden bg-slate-950 text-white font-sans">
        {/* Navigation / Header */}
        <div className="h-20 bg-slate-900/50 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-10 shrink-0 z-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center font-black shadow-lg shadow-indigo-500/20">
              SM
            </div>
            <span className="font-bold tracking-tight text-lg">Scroll Spy</span>
          </div>
          <div className="flex gap-6">
            {["Section 1", "Section 2", "Section 3", "Section 4"].map(id => (
              <span
                key={id}
                className={clsx(
                  "text-xs font-bold uppercase tracking-widest transition-all cursor-pointer relative py-2",
                  currentScrollPoint?.id === id
                    ? "text-white"
                    : "text-slate-500 hover:text-slate-300"
                )}
                onClick={() => {
                  containerRef.current
                    ?.querySelector(`#${id.replace(" ", "\\ ")}`)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {id}
                {currentScrollPoint?.id === id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll Container */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto scroll-smooth"
        >
          <Section id="Intro" color="bg-slate-950" />
          <Section id="Section 1" marker color="bg-indigo-600" />
          <Section id="Gap" color="bg-slate-900" />
          <Section id="Section 2" marker color="bg-violet-600" />
          <Section id="Gap 2" color="bg-slate-800" />
          <Section id="Section 3" marker color="bg-indigo-900" />
          <Section id="Gap 3" color="bg-slate-700" />
          <Section id="Section 4" marker color="bg-slate-900" />
          <div className="h-[50vh] bg-slate-950 flex flex-col items-center justify-center text-slate-600 gap-4">
            <div className="w-px h-20 bg-gradient-to-b from-slate-800 to-transparent" />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em]">
              End of Sequence
            </p>
          </div>
        </div>

        {/* Debug Overlay */}
        <div className="fixed bottom-10 left-10 p-5 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 text-[10px] font-bold uppercase tracking-widest shadow-2xl z-50 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-indigo-400">Current Node:</span>
          </div>
          <span className="text-white bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
            {currentScrollPoint?.id || "None"}
          </span>
        </div>
      </div>
    );
  }
};

export const Stateless: Story = {
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLSpanElement>(null);

    useScrollMarkersStateless<{ id: string }>({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      containerRef: containerRef as any,
      selectors: [".scroll-marker"],
      scrollMarkerTransformer: el => ({ id: el.id }),
      callback: point => {
        if (titleRef.current) {
          titleRef.current.textContent = point?.id || "Searching...";
        }
      }
    });

    return (
      <div className="h-screen flex flex-col overflow-hidden bg-slate-950 text-white font-sans">
        <div className="h-16 bg-black/40 backdrop-blur-md flex items-center px-10 shrink-0 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest">
            Stateless Hook:{" "}
            <span
              ref={titleRef}
              className="text-indigo-400 ml-3 bg-indigo-500/10 px-3 py-1 rounded-md border border-indigo-500/20"
            >
              None
            </span>
          </p>
          <span className="ml-auto text-[10px] uppercase tracking-[0.2em] text-slate-500 font-medium">
            0 Re-renders • Native DOM Updates
          </span>
        </div>

        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto scroll-smooth"
        >
          <Section id="Start" color="bg-slate-950" />
          <Section id="Alpha" marker color="bg-slate-900" />
          <Section id="Mid-point" color="bg-slate-800" />
          <Section id="Beta" marker color="bg-indigo-950" />
          <div className="h-screen bg-slate-950" />
        </div>
      </div>
    );
  }
};
