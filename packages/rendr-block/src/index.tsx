import React from "react";
import clsx from "clsx";
import withClxn, { PropsWithClxnObject } from "@rendr-view/with-clxn";
import { BlockRenderer } from "@ekino/rendr-template-react";
import { BlockDefinition } from "@ekino/rendr-core";

export interface ClassNamesList {
  block?: string;
  inner?: string;
}

export interface Props
  extends PropsWithClxnObject<
    React.HTMLAttributes<HTMLDivElement>,
    ClassNamesList
  > {
  blockRenderer?: BlockRenderer;
  blocks?: BlockDefinition[];
}

function render(
  children: React.ReactNode,
  blockRenderer?: BlockRenderer,
  blocks?: BlockDefinition[]
) {
  if (blockRenderer && blocks && blocks.length) {
    return (
      <>
        {blocks
          .filter(block => block && block.type) // filter blocks to ensure they have a valid type
          .sort((a, b) => a.order - b.order)
          .map((block: any, i: number) =>
            blockRenderer(block, `${block.type}_${i}`)
          )}
      </>
    );
  }
  return children;
}

export function RendrBlock({
  className,
  children,
  blockRenderer,
  blocks,
  clx = {},
  ...props
}: Props) {
  return (
    <section className={clsx("RendrBlock", className, clx.block)} {...props}>
      <div className={clsx("RendrBlock__inner", clx.inner)}>
        {render(children, blockRenderer, blocks)}
      </div>
    </section>
  );
}

export default withClxn<Omit<Props, "clx">, ClassNamesList>(RendrBlock, {});
