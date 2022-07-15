# @rendr-view/portal

A wrapper around React.createPortal.

## Installation

```sh
yarn add @rendr-view/portal
```

## Props

```ts
export interface Props {
  children: React.ReactNode;
  className?: string;
  el?: string;
  id?: string;
}
```

### children

The content to render inside the portal.

### className

Optional className to be given to the portal container element. By default this is `root-portal`.

### el

The HTML element of the portal container. By default this is `div`.

### id

An ID to be given to the portal container. If a portal has an ID, any existing instance of a portal container with the same id will be replaced.
