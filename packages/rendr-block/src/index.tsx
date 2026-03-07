import React from "react";
import clsx from "clsx";
import withClxn from "@rendr-view/with-clxn";
import type { PropsWithClxnObject } from "@rendr-view/with-clxn";
import type { BlockRenderer } from "@ekino/rendr-template-react";
import type { BlockDefinition } from "@ekino/rendr-core";

export interface ClassNamesList {
  block?: string;
  inner?: string;
}

export interface Props extends PropsWithClxnObject<
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// eslint-disable-next-line react-refresh/only-export-components
export default withClxn<Omit<Props, "clx">, ClassNamesList>(RendrBlock, {});
