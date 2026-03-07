import React from "react";
import Card, {
  cardSectionsList,
  renderCardSectionGroup
} from "@rendr-view/card";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MdVerified } from "react-icons/md";
import { action } from "@storybook/addon-actions";
import { StoryStage, themeClx } from "./theme";

/**
 * `Card` is a highly flexible component for displaying content in a structured way.
 * It follows a "Composition over Configuration" approach, allowing you to define the `structure` of the card.
 */
const meta = {
  title: "Components/Card",
  component: Card,
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    text: { control: "text" },
    image: { control: "object" },
    buttons: { control: "object" },
    categories: { control: "object" },
    clx: { control: "object" },
    structure: {
      control: "object",
      description:
        "Array of sections or functions to render the card's structure"
    }
  }
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseCardStyles = {
  card: themeClx.well + " max-w-sm transition-all hover:shadow-xl",
  content: "p-6 flex flex-col gap-4",
  title: themeClx.typography.heading + " text-xl",
  subtitle: themeClx.typography.subheading,
  paragraph: themeClx.typography.body + " text-sm",
  categories: "flex flex-wrap gap-2",
  category:
    "text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded uppercase",
  buttons: "flex gap-3 pt-2",
  button: themeClx.button.primary + " !py-2 !px-4 !text-xs",
  imageWrapper: "aspect-video overflow-hidden bg-slate-100",
  image: "w-full h-full object-cover"
};

const defaultCardArgs = {
  title: "Modern UI Design",
  subtitle: "Architecture",
  text: "Explore the latest trends in modern web architecture and UI design patterns for 2026. This card showcases the flexible structure of the @rendr-view/card package.",
  categories: [
    { label: "Design", link: "#" },
    { label: "Tech", link: "#" }
  ],
  buttons: [
    {
      children: "Read More",
      onClick: action("on-read-more")
    },
    { children: "Share", onClick: action("on-share") }
  ],
  image: {
    alt: "Architecture",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop"
  },
  clx: baseCardStyles
};

export const Default: Story = {
  args: defaultCardArgs,
  render: args => (
    <StoryStage
      title="Vertical Card"
      description="The standard layout for blog posts or product features."
    >
      <Card {...args} />
    </StoryStage>
  )
};

export const Horizontal: Story = {
  args: {
    ...defaultCardArgs,
    clx: {
      ...baseCardStyles,
      card: themeClx.well + " max-w-2xl",
      content: "p-0 flex flex-col md:flex-row",
      imageWrapper: "md:w-1/3 aspect-video md:aspect-auto",
      image: "w-full h-full object-cover",
      buttons: "flex md:flex-col gap-3 md:gap-2 pt-2"
    },
    structure: [
      cardSectionsList.image,
      renderCardSectionGroup(
        "p-8 md:w-2/3 flex flex-col gap-4 justify-center",
        [
          cardSectionsList.subtitle,
          cardSectionsList.title,
          cardSectionsList.paragraph,
          cardSectionsList.categories,
          cardSectionsList.buttons
        ]
      )
    ]
  },
  render: args => (
    <StoryStage
      title="Horizontal Layout"
      description="Responsive layout that shifts to a side-by-side view on larger screens."
    >
      <Card {...args} />
    </StoryStage>
  )
};

export const CustomSections: Story = {
  args: {
    ...defaultCardArgs,
    structure: [
      cardSectionsList.title,
      cardSectionsList.subtitle,
      cardSectionsList.paragraph,
      () => (
        <div className="flex items-center gap-2 py-3 border-y border-slate-100">
          <MdVerified className="text-blue-500" />
          <span className="text-xs font-bold text-slate-500 uppercase">
            Verified Content
          </span>
        </div>
      ),
      cardSectionsList.buttons
    ],
    clx: {
      ...baseCardStyles,
      imageWrapper: "hidden"
    }
  },
  render: args => (
    <StoryStage
      title="Custom Structure"
      description="Using functional sections to inject custom components anywhere in the card."
    >
      <Card {...args} />
    </StoryStage>
  )
};
