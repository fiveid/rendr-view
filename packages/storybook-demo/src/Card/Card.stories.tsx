import React from "react";
import { action } from "@storybook/addon-actions";
import Card, {
  CardSectionProps,
  ClassNamesList,
  Props,
  CardButtons
} from "@rendr-view/card";
import { PropsWithClxnLoader } from "@rendr-view/with-clxn";
import cardSectionsList from "@rendr-view/card/dist/lib/card-sections";

type CardProps = PropsWithClxnLoader<Props, ClassNamesList>;

const CardContent = (props: CardProps) => (
  <Card
    title="Card title"
    subtitle="In duis laborum veniam"
    text="Veniam cupidatat nostrud amet culpa cillum cillum fugiat. Adipisicing id nostrud Lorem dolor occaecat."
    categories={[
      { label: "Category 1", link: "#" },
      { label: "Category 2", link: "#" }
    ]}
    buttons={[{ onClick: action("clicked"), children: "Click me" }]}
    image={{ alt: "", src: "https://via.placeholder.com/500/000000/808080" }}
    {...props}
  />
);

const CardStyled = (props: CardProps) => (
  <CardContent
    clx={{
      card: "relative max-w-sm border border-gray-100 p-4 shadow overflow-hidden",
      title: "block text-3xl font-bold mb-2",
      subtitle: "block font-semibold text-orange-600",
      paragraph: "block my-2 text-sm leading-wide text-gray-500",
      categories: "text-xs mb-4",
      category: "inline-block bg-orange-100 px-2 py-1 mr-2 last:mr-0",
      buttons: "mt-6 mb-2 block",
      button:
        "cursor-pointer bg-orange-500 hover:bg-orange-600 border border-orange-600 text-white font-bold py-2 px-4 rounded",
      imageWrapper: "block aspect-video overflow-hidden mb-4",
      image: "w-full h-full object-cover object-center"
    }}
    {...props}
  />
);

const CustomButtons = (props: CardSectionProps) => <CardButtons {...props} />;

const Tag = (props: CardSectionProps) => (
  <span className="absolute top-0 right-0 -rotate-45 bg-orange-500 overflow-hidden w-20 h-20 transform -translate-y-1/2 translate-x-1/2 shadow-lg" />
);

export const Default = () => <CardContent />;

export const ClassNames = () => <CardStyled />;

export const CustomStructure = () => (
  <CardStyled
    structure={[
      cardSectionsList.title,
      cardSectionsList.paragraph,
      cardSectionsList.image,
      CustomButtons,
      Tag
    ]}
  />
);

export const ReducedStructure = () => (
  <CardStyled
    structure={[cardSectionsList.title, cardSectionsList.paragraph]}
  />
);
