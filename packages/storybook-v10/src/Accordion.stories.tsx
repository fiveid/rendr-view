import React, { useState } from "react";
import Accordion from "@rendr-view/accordion";
import Btn from "@rendr-view/btn";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryStage, DemoBox, themeClx } from "./theme";

/**
 * `Accordion` is a component that animates its height to show or hide its children.
 * It uses a `MutationObserver` by default to respond to content changes and `ResizeObserver` (via window resize event) for window changes.
 */
const meta = {
  title: "Components/Accordion",
  component: Accordion,
  argTypes: {
    opened: {
      control: "boolean",
      description: "Whether the accordion is expanded or collapsed"
    },
    duration: {
      control: "select",
      options: [
        "duration-0",
        "duration-100",
        "duration-200",
        "duration-300",
        "duration-500",
        "duration-700",
        "duration-1000"
      ],
      description: "Tailwind CSS duration class for the transition"
    },
    alwaysRenderChildren: {
      control: "boolean",
      description:
        "If false, children are only rendered when the accordion is opened"
    },
    hideOnLoad: {
      control: "boolean",
      description: "If true, ensures content is hidden immediately on mount"
    },
    disableMutationObserver: {
      control: "boolean",
      description:
        "Disables the automatic height adjustment when DOM changes occur inside the accordion"
    }
  }
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <StoryStage
        title="Interactive Toggle"
        description="The accordion's height adjusts smoothly to fit its content."
      >
        <div className="space-y-4">
          <Btn
            clx={{ button: themeClx.button.secondary }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "Close Accordion" : "Open Accordion"}
          </Btn>
          <Accordion {...args} opened={isOpen}>
            <DemoBox>
              <p className="text-slate-600">
                This accordion is managed by the button above. The `opened` prop
                is tied to a local `useState` hook.
              </p>
            </DemoBox>
          </Accordion>
        </div>
      </StoryStage>
    );
  }
};

export const DynamicContent: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(true);
    const [count, setCount] = useState(1);

    return (
      <StoryStage
        title="Dynamic Content Adjustment"
        description="The MutationObserver ensures the height stays in sync with DOM changes."
      >
        <div className="space-y-4">
          <div className="flex gap-2">
            <Btn
              clx={{ button: themeClx.button.secondary }}
              onClick={() => setIsOpen(!isOpen)}
            >
              Toggle
            </Btn>
            <Btn
              clx={{ button: themeClx.button.primary }}
              onClick={() => setCount(c => c + 1)}
            >
              Add Paragraph
            </Btn>
          </div>
          <Accordion {...args} opened={isOpen}>
            <DemoBox className="space-y-4 bg-indigo-50 border-indigo-100">
              <p className="text-indigo-900 font-bold">
                The accordion automatically adjusts its height when content is
                added!
              </p>
              {Array.from({ length: count }).map((_, i) => (
                <p key={i} className="text-indigo-800/80 text-sm">
                  Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Donec a diam lectus. Sed sit amet ipsum
                  mauris.
                </p>
              ))}
            </DemoBox>
          </Accordion>
        </div>
      </StoryStage>
    );
  }
};
