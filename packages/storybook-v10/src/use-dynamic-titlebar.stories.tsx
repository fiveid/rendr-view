import { useDynamicTitleBar } from "@rendr-view/use-dynamic-titlebar";
import type { Meta, StoryObj } from "@storybook/react-vite";
import clsx from "clsx";

/**
 * `useDynamicTitleBar` is a hook that updates a fixed/sticky title bar's content
 * based on the user's scroll position within a container.
 * It identifies the current section by looking for elements with a specific data attribute (default: `data-title`).
 */
const meta = {
  title: "Hooks/useDynamicTitleBar",
  parameters: {
    layout: "fullscreen"
  },
  argTypes: {
    titleBarActiveClassList: {
      control: "object",
      description:
        "Classes to apply to the title bar when scrolled past its height"
    }
  },
  args: {
    dataAttribute: "data-title",
    titleBarActiveClassList: [
      "shadow-xl",
      "bg-white/70",
      "text-white",
      "backdrop-blur-md"
    ]
  }
} satisfies Meta;

export default meta;
type Story = StoryObj;

const Section = ({ color, title }: { color: string; title?: string }) => (
  <div
    className={clsx(
      "w-full h-[95vh] flex items-center justify-center p-12",
      color
    )}
  >
    {title && (
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl text-white text-center">
        <h3
          className="text-3xl font-black uppercase tracking-tight mb-2"
          data-title
        >
          {title}
        </h3>
        <p className="opacity-70 text-sm">
          Scroll past this to see the title bar update
        </p>
      </div>
    )}
  </div>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Example(args: any) {
  const { titleRef, containerRef } = useDynamicTitleBar(args);

  return (
    <div ref={containerRef} className="h-screen overflow-y-auto bg-slate-50">
      {/* The Title Bar */}
      <div
        ref={titleRef}
        className="sticky top-0 left-0 z-50 w-full h-16 bg-white border-b border-slate-200 px-8 flex items-center transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            R
          </div>
          <span data-title-output className="text-lg font-bold text-slate-900">
            Start Scrolling...
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="w-full">
        <Section color="bg-slate-900" />
        <Section title="Overview" color="bg-indigo-600" />
        <Section color="bg-slate-800" />
        <Section title="Features" color="bg-purple-600" />
        <Section color="bg-slate-700" />
        <Section title="Pricing" color="bg-emerald-600" />
        <Section color="bg-slate-600" />
        <Section title="Contact" color="bg-rose-600" />
        <div className="h-screen bg-slate-900 flex items-center justify-center text-white/20 italic">
          End of demo
        </div>
      </div>
    </div>
  );
}

export const Default: Story = {
  args: {},
  render: Example
};
