# @rendr-view/rendr-block

A simple block React compononent. Implements the Rendr `blockRenderer` to render Rendr blocks represented in JSON format.

## Installation

```sh
yarn add @rendr-view/rendr-block
```

## Props

The `RendrBlock` extends `React.HTMLAttributes<HTMLDivElement>` with these props:

```ts
export interface Props {
  clx?: {
    block?: string;
    inner?: string;
  }
  className?: string;
  blockRenderer?: BlockRenderer;
  blocks?: BlockDefinition[];
}
```

### clx

An optional object of utility classes to be applied to the block elements.

### className

An optional className to be applied to the RendrBlock root div.

### blockRenderer

The Rendr `blockRenderer`. This is a function that renders `blocks` as React components. If you are using Rendr, the `blockRenderer` is passed to all root components.

### blocks

A list of Rendr blocks.
