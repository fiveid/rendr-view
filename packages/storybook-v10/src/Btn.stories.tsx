import React from "react";
import Btn from "@rendr-view/btn";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MdOpenInNew, MdArrowForward } from "react-icons/md";
import { StoryStage, DemoBox, themeClx } from "./theme";

/**
 * `Btn` is a versatile button component that can also act as a link.
 * It supports icons, custom class names for its sub-components, and integrates well with Tailwind CSS.
 */
const meta = {
  title: "Components/Btn",
  component: Btn,
  argTypes: {
    children: {
      control: "text",
      description: "The button label or content"
    },
    href: {
      control: "text",
      description: "If provided, the component renders as an `<a>` tag"
    },
    target: {
      control: "select",
      options: ["_blank", "_self", "_parent", "_top"],
      description: "The target attribute for link buttons"
    },
    icon: {
      control: "select",
      options: ["None", "OpenInNew", "ArrowForward"],
      mapping: {
        None: undefined,
        OpenInNew: MdOpenInNew,
        ArrowForward: MdArrowForward
      },
      description: "Optional icon to display"
    },
    iconProps: {
      control: "object",
      description: "Props passed to the icon component (e.g., size, color)"
    },
    clx: {
      control: "object",
      description:
        "Override class names for sub-elements: { button, label, icon }"
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
      description: "The HTML button type"
    }
  }
} satisfies Meta<typeof Btn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Primary Action",
    clx: { button: themeClx.button.primary }
  },
  render: args => (
    <StoryStage
      title="Standard Button"
      description="The primary button style using the project's brand colors."
    >
      <Btn {...args} />
    </StoryStage>
  )
};

export const Variants: Story = {
  render: () => (
    <StoryStage
      title="Button Variants"
      description="Different visual weights for various actions."
    >
      <div className="flex flex-wrap gap-4">
        <Btn clx={{ button: themeClx.button.primary }}>Primary Button</Btn>
        <Btn clx={{ button: themeClx.button.secondary }}>Secondary Button</Btn>
        <Btn
          clx={{ button: themeClx.button.secondary }}
          icon={MdArrowForward}
          iconProps={{ size: "1.2em" }}
        >
          With Icon
        </Btn>
      </div>
    </StoryStage>
  )
};

export const Links: Story = {
  render: () => (
    <StoryStage
      title="Link Buttons"
      description="Buttons that behave as anchors while maintaining button styling."
    >
      <DemoBox className="flex gap-4">
        <Btn
          href="https://github.com/fiveid/rendr-view"
          target="_blank"
          icon={MdOpenInNew}
          clx={{ button: themeClx.button.primary }}
        >
          View on GitHub
        </Btn>
        <Btn
          href="#"
          clx={{ button: "text-indigo-600 font-bold hover:underline" }}
        >
          Simple Text Link
        </Btn>
      </DemoBox>
    </StoryStage>
  )
};
