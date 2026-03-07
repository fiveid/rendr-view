import React from "react";
import ParallaxWipe from "@rendr-view/parallaxwipe";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { themeClx } from "./theme";

/**
 * `ParallaxWipe` creates a "wipe" effect where content appears fixed in the background
 * as you scroll. It supports three modes: `always`, `in`, and `out`.
 */
const meta = {
  title: "Components/ParallaxWipe",
  component: ParallaxWipe,
  parameters: {
    layout: "fullscreen"
  },
  argTypes: {
    parallaxMode: {
      control: "select",
      options: ["always", "in", "out"],
      description: "How the parallax effect behaves during scroll"
    },
    width: {
      control: "text",
      description: "Tailwind width class"
    },
    height: {
      control: "text",
      description: "Tailwind height class"
    }
  }
} satisfies Meta<typeof ParallaxWipe>;

export default meta;
type Story = StoryObj<typeof meta>;

const ContentExample = ({ title, mode }: { title: string; mode: string }) => (
  <div
    className="w-full h-full flex items-center justify-center relative overflow-hidden"
    style={{
      backgroundImage:
        "url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop)",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}
  >
    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-slate-900/60" />

    <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-12 rounded-3xl max-w-2xl text-white shadow-2xl">
      <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">
        {title}
      </h3>
      <p className="text-lg leading-relaxed opacity-90 mb-6">
        Parallax Mode:{" "}
        <code className="bg-white/20 px-2 py-1 rounded font-mono text-sm">
          {mode}
        </code>
        . As you scroll, the background remains fixed while content transitions
        smoothly.
      </p>
      <div className="h-1.5 w-20 bg-indigo-500 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.6)]" />
    </div>
  </div>
);

export const Default: Story = {
  args: {
    parallaxMode: "always",
    width: "w-full",
    height: "h-screen",
    children: null
  },
  render: args => (
    <div className="w-full">
      <div className="h-[80vh] bg-slate-950 flex flex-col items-center justify-center text-white px-8 text-center">
        <h2 className={themeClx.typography.display}>Scroll To Explore</h2>
        <p className="text-slate-400 max-w-md mt-4">
          Experience the fluid parallax wipe effect as you scroll through
          different layers of content.
        </p>
      </div>

      <ParallaxWipe {...args}>
        <ContentExample
          title="Fixed Background"
          mode={args.parallaxMode ?? "always"}
        />
      </ParallaxWipe>

      <div className="h-screen bg-white flex items-center justify-center">
        <p className="text-slate-400 font-medium uppercase tracking-widest text-xs">
          End of Section
        </p>
      </div>
    </div>
  )
};
