import React from "react";
import CardSectionsList from "./card-sections";
import { CardSectionProps, CardStructureType } from "./types";

export const defaultStructure = [
  "image",
  "categories",
  "title",
  "subtitle",
  "paragraph",
  "buttons"
];

export enum CardSections {
  Image = "image",
  Categories = "categories",
  Title = "title",
  Subtitle = "subtitle",
  Paragraph = "paragraph",
  Buttons = "buttons"
}

export function renderCardSections(
  structure: CardStructureType,
  props: CardSectionProps
) {
  return structure.map((contentBlock, i) => {
    const Comp =
      typeof contentBlock === "string"
        ? CardSectionsList[contentBlock]
        : contentBlock;
    if (Comp) {
      return <Comp key={i} {...props} />;
    }
    return null;
  });
}

export function renderCardSectionGroup(
  className: string,
  structure: CardStructureType = []
) {
  const CardSectionGroup = (props: CardSectionProps) => (
    <div className={className}>{renderCardSections(structure, props)}</div>
  );
  return CardSectionGroup;
}
