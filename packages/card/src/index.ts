import withClxn from "@rendr-view/with-clxn";
import type {
  CardCategory,
  ClassNamesList,
  HTMLImageProps,
  HTMLButtonProps,
  HTMLLinkProps,
  CardButtonProps,
  CardStructureType,
  Props,
  CardSectionProps,
  CardSectionsDirectory
} from "./types";
import cardSectionsList, {
  CardImage,
  CardCategories,
  CardTitle,
  CardSubtitle,
  CardParagraph,
  CardButtons
} from "./card-sections";
import {
  defaultStructure,
  renderCardSections,
  renderCardSectionGroup,
  CardSections
} from "./card-renderer";
import Card from "./card";

export default withClxn<Props, ClassNamesList>(Card, {});

export {
  defaultStructure,
  renderCardSections,
  renderCardSectionGroup,
  cardSectionsList,
  Card,
  CardSections,
  CardImage,
  CardCategories,
  CardTitle,
  CardSubtitle,
  CardParagraph,
  CardButtons
};

export type {
  CardCategory,
  ClassNamesList,
  HTMLImageProps,
  HTMLButtonProps,
  HTMLLinkProps,
  CardButtonProps,
  CardStructureType,
  Props,
  CardSectionProps,
  CardSectionsDirectory
};
