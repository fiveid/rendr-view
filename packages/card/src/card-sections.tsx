import React from "react";
import clsx from "clsx";
import {
  CardButtonProps,
  CardCategory,
  CardSectionProps,
  CardSectionsDirectory,
  HTMLImageProps
} from "./types";

export function CardImage({
  clx = {},
  CustomComp = "img",
  ...props
}: CardSectionProps<HTMLImageProps>) {
  if (!props.image || !props.image.src) {
    return null;
  }
  return (
    <figure className={clsx("Card__figure", clx.figure)}>
      <span className={clsx("Card__imageWrapper", clx.imageWrapper)}>
        <CustomComp
          className={clsx("Card__image", clx.image)}
          {...props.image}
        />
      </span>
    </figure>
  );
}

export function CardCategories({
  clx = {},
  CustomComp = "span",
  ...props
}: CardSectionProps<React.PropsWithChildren<CardCategory>>) {
  if (!props.categories || props.categories.length === 0) {
    return null;
  }
  return (
    <div className={clsx("Card__categories", clx.categories)}>
      {props.categories.map((category, i) => (
        <CustomComp
          key={category.label}
          className={clsx("Card__category", clx.category)}
          {...category}
        >
          <a className={category.className} href={category.link}>
            {category.label}
          </a>
        </CustomComp>
      ))}
    </div>
  );
}

export function CardTitle({
  clx = {},
  CustomComp = "span",
  ...props
}: CardSectionProps) {
  if (!props.title) {
    return null;
  }

  return (
    <CustomComp className={clsx("Card__title", clx.title)}>
      {props.title}
    </CustomComp>
  );
}

export function CardSubtitle({
  clx = {},
  CustomComp = "span",
  ...props
}: CardSectionProps<React.PropsWithChildren<{ className?: string }>>) {
  if (!props.subtitle) {
    return null;
  }
  return (
    <CustomComp className={clsx("Card__subtitle", clx.subtitle)}>
      {props.subtitle!}
    </CustomComp>
  );
}

export function CardParagraph({
  clx = {},
  CustomComp = "span",
  ...props
}: CardSectionProps) {
  if (!props.text) {
    return null;
  }
  return (
    <CustomComp className={clsx("Card__paragraph", clx.paragraph)}>
      {props.text!}
    </CustomComp>
  );
}

export function CardButtons({
  clx = {},
  CustomComp = "a",
  ...props
}: CardSectionProps<CardButtonProps>) {
  if (!props.buttons || props.buttons.length === 0) {
    return null;
  }
  return (
    <div className={clsx("Card__buttons", clx.buttons)}>
      {props.buttons!.map(({ className: buttonClassName, ...button }, i) => (
        <CustomComp
          className={clsx("Card__button", clx.button, buttonClassName)}
          key={`${i}-${button.id || "card-button"}`}
          {...button}
        />
      ))}
    </div>
  );
}

export const cardSectionsList: CardSectionsDirectory = {
  image: CardImage,
  categories: CardCategories,
  title: CardTitle,
  subtitle: CardSubtitle,
  paragraph: CardParagraph,
  buttons: CardButtons
};

export default cardSectionsList;
