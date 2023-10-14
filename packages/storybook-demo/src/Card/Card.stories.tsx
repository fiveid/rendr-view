import React from "react";
import { action } from "@storybook/addon-actions";
import Card, {
  ClassNamesList,
  Props,
  renderCardSectionGroup
} from "@rendr-view/card";
import { PropsWithClxnLoader, clxn } from "@rendr-view/with-clxn";
import cardSectionsList from "@rendr-view/card/dist/lib/card-sections";
import { MdVerified } from "react-icons/md";

type CardProps = PropsWithClxnLoader<Props, ClassNamesList>;

const baseStyles = {
  card: "relative max-w-sm border border-slate-300 p-4 shadow-xl overflow-hidden rounded",
  title: "block text-2xl font-black",
  subtitle: "block text-sm italic text-slate-500",
  paragraph: "block text-md leading-wide text-gray-500 my-2",
  categories: "text-xs flex gap-2 my-2",
  category: "bg-slate-100 hover:bg-slate-300 rounded p-1",
  buttons: "flex mt-4",
  button:
    "cursor-pointer bg-orange-500 hover:bg-orange-600 border border-orange-600 text-white font-bold py-2 px-4 rounded",
  imageWrapper: "block aspect-video overflow-hidden border-1 border-slate-300",
  image: "w-full h-full object-cover object-center"
};

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
    image={{
      alt: "",
      src: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    }}
    custom={{
      category: "test"
    }}
    {...props}
  />
);

const CardStyled = (props: CardProps) => (
  <CardContent clx={baseStyles} {...props} />
);

export const Default = () => <CardContent />;

export const ClassNames = () => <CardStyled />;

export const CustomStructure = () => (
  <CardStyled
    structure={[
      cardSectionsList.title,
      cardSectionsList.paragraph,
      cardSectionsList.image,
      cardSectionsList.buttons,
      () => (
        <span className="absolute top-2 right-2 text-orange-600">
          <MdVerified size="2rem" />
        </span>
      )
    ]}
  />
);

export const CustomGroups = () => (
  <CardStyled
    clx={clxn<ClassNamesList>(
      {
        card: "lg:!max-w-xl",
        content: "lg:flex lg:gap-6",
        figure: "h-full mb-4 lg:mb-0",
        imageWrapper: "h-full w-full lg:!aspect-none"
      },
      baseStyles
    )}
    structure={[
      renderCardSectionGroup("lg:w-1/2 lg:flex-shrink-0", [
        cardSectionsList.image
      ]),
      renderCardSectionGroup("", [
        cardSectionsList.title,
        cardSectionsList.paragraph,
        cardSectionsList.buttons
      ])
    ]}
  />
);

export const ReducedStructure = () => (
  <CardStyled
    structure={[cardSectionsList.title, cardSectionsList.paragraph]}
  />
);
