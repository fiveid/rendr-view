import React from "react";
import clsx from "clsx";
import { PropsWithClxnObject } from "@rendr-view/with-clxn";
import { ClassNamesList, Props } from "./types";
import { defaultStructure, renderCardSectionGroup } from "./card-renderer";

export function Card(props: PropsWithClxnObject<Props, ClassNamesList>) {
  const structure = props.structure || defaultStructure;

  const CardContent = renderCardSectionGroup(
    clsx("Card__content", props.clx?.content),
    structure
  );

  return (
    <div className={clsx("Card", props.clx?.card, props.className)}>
      <CardContent {...props} />
    </div>
  );
}

export default Card;
