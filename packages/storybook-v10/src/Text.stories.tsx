import React from "react";
import Text, { generateTypography } from "@rendr-view/text";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryStage, themeClx } from "./theme";

/**
 * `Text` is a simple wrapper component that allows you to specify any supported HTML tag for rendering text.
 * The `generateTypography` utility is a powerful tool to create a consistent typography system for your application.
 */
const meta = {
  title: "Utilities/Text",
  component: Text,
  argTypes: {
    tagName: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "li"],
      description: "The HTML tag to use for rendering"
    },
    className: {
      control: "text",
      description: "The class name to apply to the text"
    },
    children: {
      control: "text",
      description: "The text content to display"
    }
  }
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseText: Story = {
  args: {
    tagName: "p",
    className: themeClx.typography.body,
    children:
      "This is a basic text component. You can change the tag name using the controls."
  },
  render: args => (
    <StoryStage
      title="Base Text Component"
      description="A primitive for rendering any HTML text tag with custom classes."
    >
      <Text {...args} />
    </StoryStage>
  )
};

// Define a standard typography set for the demo
const DemoTypography = generateTypography(
  {
    Display: {
      tagName: "h1",
      className: themeClx.typography.display + " mb-8"
    },
    Heading: {
      tagName: "h2",
      className: themeClx.typography.heading + " mb-4"
    },
    Subheading: {
      tagName: "h3",
      className: themeClx.typography.subheading + " mb-2"
    },
    Intro: {
      tagName: "p",
      className: themeClx.typography.body + " text-xl mb-6"
    },
    Body: {
      tagName: "p",
      className: themeClx.typography.body + " mb-4"
    }
  },
  "max-w-2xl"
);

export const TypographySet: Story = {
  render: () => (
    <StoryStage
      title="Brand Typography System"
      description="Using generateTypography to create a unified, semantic type system."
    >
      <div className="bg-white">
        <DemoTypography.Subheading>Design System</DemoTypography.Subheading>
        <DemoTypography.Display>Typography Set</DemoTypography.Display>

        <DemoTypography.Heading>
          Why use generateTypography?
        </DemoTypography.Heading>
        <DemoTypography.Intro>
          Instead of manually applying classes everywhere, you can define your
          brand's type set once and use semantic components throughout your app.
        </DemoTypography.Intro>

        <DemoTypography.Body>
          The `generateTypography` utility returns an object of components that
          automatically apply both individual styles and a shared base class.
          This ensures consistency across your entire user interface.
        </DemoTypography.Body>

        <DemoTypography.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </DemoTypography.Body>
      </div>
    </StoryStage>
  )
};
