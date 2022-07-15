import clsx from "clsx";
import React from "react";

export type SupportedHTMLTags =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "li";

export type Props<T = HTMLElement> = React.DetailedHTMLProps<
  React.HTMLAttributes<T>,
  T
>;

export interface TextProps<T = HTMLElement> extends Props<T> {
  tagName?: SupportedHTMLTags;
}

export const Text = ({ tagName = "span", ...props }: TextProps) => {
  const HTMLTag: string = `${tagName}`;
  return <HTMLTag {...props}>{props.children}</HTMLTag>;
};

export type TypographyDefinition = {
  tagName: SupportedHTMLTags;
  className: string;
};
export type TypographySet<K = any> = Record<
  keyof K,
  React.ComponentType<Props>
>;

export function generateTypography<K = any>(
  tags: Record<keyof K, TypographyDefinition>,
  baseClassName?: string
): TypographySet<K> {
  const output: Partial<TypographySet<K>> = {};
  const keys = Object.keys(tags) as Array<keyof K>;

  keys.forEach(tag => {
    const { tagName, className: tagClassName } = tags[tag];
    output[tag] = ({ className, ...props }: Props) => (
      <Text
        tagName={tagName}
        className={clsx(className, tagClassName, baseClassName)}
        {...props}
      />
    );
  });

  return output as TypographySet<K>;
}

export default Text;
