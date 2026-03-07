import { useState } from "react";
import Stagger from "@rendr-view/stagger";
import Btn from "@rendr-view/btn";
import type { Meta, StoryObj } from "@storybook/react-vite";
import clsx from "clsx";
import { StoryStage, themeClx } from "./theme";

/**
 * `Stagger` is a render-prop component used to coordinate timed animations across multiple elements.
 * It manages a sequence of "steps", declaring when each part of the UI is "ready" to be shown.
 */
const meta = {
  title: "Components/Stagger",
  component: Stagger,
  argTypes: {
    start: {
      control: "boolean",
      description: "Triggers the start of the stagger sequence"
    },
    step: {
      control: "object",
      description:
        "Configuration for the timing of each step (ID and duration in/out)"
    }
  }
} satisfies Meta<typeof Stagger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicReveal: Story = {
  args: {
    start: false,
    step: [
      { id: "title", in: 400 },
      { id: "content", in: 300 }
    ],
    children: () => <></>
  },
  render: args => {
    const [isActive, setIsActive] = useState(false);

    return (
      <StoryStage
        title="Coordinated Entry"
        description="Elements reveal themselves in a timed sequence."
      >
        <div className="space-y-6">
          <div className="h-40 bg-slate-50 border border-slate-100 rounded-2xl p-8 overflow-hidden">
            <Stagger {...args} start={isActive}>
              {({ ready }) => (
                <div className="space-y-4">
                  <h3
                    className={clsx(
                      "text-xl font-bold transition-all duration-700 transform",
                      ready("title")
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    )}
                  >
                    Staggered Reveal
                  </h3>
                  <p
                    className={clsx(
                      "text-slate-500 text-sm transition-all duration-700 transform",
                      ready("content")
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    )}
                  >
                    This content appears shortly after the title.
                  </p>
                </div>
              )}
            </Stagger>
          </div>
          <Btn
            clx={{ button: themeClx.button.secondary }}
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? "Reset Animation" : "Start Animation"}
          </Btn>
        </div>
      </StoryStage>
    );
  }
};

export const StaggeredList: Story = {
  args: {
    start: false,
    step: Array.from({ length: 5 }).map((_, i) => ({
      id: `item-${i}`,
      in: 150
    })),
    children: () => <></>
  },
  render: args => {
    const [isActive, setIsActive] = useState(false);
    const items = [
      "Brand consistency matters",
      "Unified design language",
      "Premium user experiences",
      "Coordinated transitions",
      "Refined typography"
    ];

    return (
      <StoryStage
        title="List Sequencing"
        description="Efficiently animating lists without manual delays on every item."
      >
        <div className="space-y-6">
          <Stagger {...args} start={isActive}>
            {({ ready }) => (
              <div className="grid gap-2">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className={clsx(
                      "p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm transition-all duration-500 transform",
                      ready(`item-${i}`)
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-4 opacity-0"
                    )}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </Stagger>
          <Btn
            clx={{ button: themeClx.button.secondary }}
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? "Reset List" : "Animate List"}
          </Btn>
        </div>
      </StoryStage>
    );
  }
};

export const HeroSection: Story = {
  parameters: {
    layout: "fullscreen"
  },
  args: {
    start: true,
    step: [
      { id: "bg", in: 0, out: 500 },
      { id: "heading", in: 600, out: 500 },
      { id: "subheading", in: 300, out: 500 },
      { id: "actions", in: 400, out: 500 }
    ],
    children: () => <></>
  },
  render: args => {
    const [isActive, setIsActive] = useState(true);

    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <Stagger {...args} start={isActive}>
          {({ ready }) => (
            <>
              {/* Background Reveal */}
              <div
                className={clsx(
                  "absolute inset-0 bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 transition-all duration-1000",
                  ready("bg") ? "opacity-100" : "opacity-0"
                )}
              />

              <div className="relative z-10 text-center text-white px-8 space-y-6">
                <h1
                  className={clsx(
                    "text-5xl font-black transition-all duration-1000 transform",
                    ready("heading")
                      ? "translate-y-0 opacity-100 scale-100"
                      : "translate-y-12 opacity-0 scale-95"
                  )}
                >
                  ANIMATE EVERYTHING
                </h1>

                <p
                  className={clsx(
                    "text-lg text-white/80 max-w-lg mx-auto transition-all duration-1000 transform",
                    ready("subheading")
                      ? "translate-y-0 opacity-100"
                      : "translate-y-12 opacity-0"
                  )}
                >
                  Coordinate complex sequences with ease using the
                  @rendr-view/stagger component.
                </p>

                <div
                  className={clsx(
                    "flex justify-center gap-4 transition-all duration-1000 transform",
                    ready("actions")
                      ? "translate-y-0 opacity-100 scale-100"
                      : "translate-y-12 opacity-0 scale-90"
                  )}
                >
                  <Btn
                    clx={{
                      button:
                        "bg-white text-indigo-600 hover:bg-slate-50 border-none px-8 text-lg rounded-xl shadow-xl"
                    }}
                  >
                    Get Started
                  </Btn>
                  <Btn
                    clx={{
                      button:
                        "bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 px-8 text-lg rounded-xl"
                    }}
                  >
                    Learn More
                  </Btn>
                </div>
              </div>
            </>
          )}
        </Stagger>

        <div className="absolute bottom-6 right-6 z-20">
          <Btn
            onClick={() => setIsActive(!isActive)}
            clx={{
              button: themeClx.button.primary
            }}
          >
            {isActive ? "Reverse" : "Replay"}
          </Btn>
        </div>
      </div>
    );
  }
};
