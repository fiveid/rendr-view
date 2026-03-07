import clsx from "clsx";
import type { PropsWithClxnObject } from "@rendr-view/with-clxn";
import type { ClassNamesList, Props } from "./types";
import { defaultStructure, renderCardSections } from "./card-renderer";

export function Card(props: PropsWithClxnObject<Props, ClassNamesList>) {
  const structure = props.structure || defaultStructure;

  return (
    <div className={clsx("Card", props.clx?.card, props.className)}>
      <div className={clsx("Card__content", props.clx?.content)}>
        {renderCardSections(structure, props)}
      </div>
    </div>
  );
}

export default Card;
