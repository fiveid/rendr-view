import withClxn from "@rendr-view/with-clxn";
import { CardCategory, ClassNamesList, HTMLImageProps, HTMLButtonProps, HTMLLinkProps, CardButtonProps, CardStructureType, Props, CardSectionProps, CardSectionsDirectory } from "./types";
import { CardImage, CardCategories, CardTitle, CardSubtitle, CardParagraph, CardButtons } from "./card-sections";
import { defaultStructure, CardSections, renderCardSections, renderCardSectionGroup } from "./card-renderer";
import Card from "./card";

export default withClxn<Props, ClassNamesList>(Card, {});

export { defaultStructure, renderCardSections, renderCardSectionGroup, Card, CardImage, CardCategories, CardTitle, CardSubtitle, CardParagraph, CardButtons}

export type { CardCategory, ClassNamesList, HTMLImageProps, HTMLButtonProps, HTMLLinkProps, CardButtonProps, CardStructureType, Props, CardSectionProps, CardSectionsDirectory, CardSections };
