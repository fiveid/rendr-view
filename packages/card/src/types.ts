import React from "react";
import { PropsWithClxnObject } from "@rendr-view/with-clxn";

export interface CardCategory {
  className?: string;
  link?: string;
  label?: string;
}

export type ClassNamesList = {
  buttons?: string;
  button?: string;
  card?: string;
  content?: string;
  categories?: string;
  category?: string;
  figure?: string;
  image?: string;
  imageWrapper?: string;
  paragraph?: string;
  subtitle?: string;
  title?: string;
};

export type HTMLImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export type HTMLButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type HTMLLinkProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export type CardButtonProps = HTMLButtonProps & HTMLLinkProps;

export type CardStructureType = Array<
  string | React.ComponentType<CardSectionProps>
>;

export type CardSectionsDirectory = {
  [key: string]: React.ComponentType<CardSectionProps>;
};

export interface Props<P = any> {
  className?: string;
  title?: string;
  text?: string;
  image?: HTMLImageProps;
  structure?: CardStructureType;
  categories?: CardCategory[];
  subtitle?: string;
  buttons?: CardButtonProps[];
  custom?: P;
}

export type CardSectionProps<T = any> = PropsWithClxnObject<
  Props & {
    CustomComp?: React.ComponentType<T> | string;
  },
  ClassNamesList
>;
