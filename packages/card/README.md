# @rendr-view/card

A base "card" component that displays simple content in a simple structure, intended to be highly customisable to generate a lot of varieties.  

## Installation

```sh
yarn add @rendr-view/card
```

## Props

The custom `Btn` props extend the HTML button attributes and HTML anchor link attributes, as well as data and aria attributes.

```ts
export interface Props {
  clx?: object | ClxnLoader;
  className?: string;
  title?: string;
  subtitle?: string;
  text?: string;
  image?: HTMLImageProps;
  buttons?: CardButtonProps[];
  categories?: CardCategory[];
  structure?: CardStructureType;
}

```

### clx

A record of classNames to style Card elements. The following properties are all optional:

```text
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
```

### className

The `className` of the root Card div.

### title

A title to display.

### subtitle

A subtitle to display.

### text

Paragraph text to display.

### image

An image to display.

### buttons

An array of CTAs to display (by default will render as `a` links).

### categories

A list of categories / tags to display (by default will render as a list of `a` links).

### structure

By default, the card will render the content in a particular structure:

```ts
const defaultStructure = [
  "image",
  "categories",
  "title",
  "subtitle",
  "paragraph",
  "buttons"
];
```

This can be overriden by passing a list of card sections to the `structure` prop.

#### Reordering / removing existing sections

You can reorder or remove existing sections by simply passing an array of strings that resolve to a particular section. For example:

```ts
const slimStructure = [
  "title",
  "image",
  "buttons"
];
```

This will cause the card to render only the title, image and buttons sections in that order.

#### Adding custom components

You can add new sections by passing a React component instead of a string. For example:

```ts
const customComponentStructure = [
  "title",
  MarkdownTextComponent,
  "buttons"
]
```

Custom section components receive `CardSectionProps`, which contains all the props given to the card component plus a `CustomComp` component. This allows you to create custom sections by extending existing sections. Example:

```ts
const MyCustomButtons = (props: CardSectionProps) => <CardButtons {...props} CustomComp={Button.Primary} />
```

The library exports all the standard sections that can extended in this way:

- CardImage
- CardCategories
- CardTitle
- CardSubtitle
- CardParagraph
- CardButtons

Note, you don't need to extend the standard sections and can pass a completely unique component to render as part of the structure. One advantage of extending the standard sections is that some of the code will have already been written for you: the `clx` classNames will be applied to the elements, list elements will be mapped, and the section will not be rendered if the relevant content is undefined or empty.

#### Organising sections into groups

By default, sections will be rendered one after the other in the order given in the structure list. If you need finer control over the grouping of sections, you can use `renderCardSectionGroup` function.

This function expects two arguments: a className (intended for styling with utility classes), and a structure list:

```ts
const imageGroup = renderCardSectionGroup(
  "w-1/2 relative pr-4",
  ["image", PriceTagComponent, ImageCaption]
);

const textGroup = renderCardSectionGroup(
  "w-1/2 pl-4",
  ["title", AvailabilityComponent, "paragraph", "buttons"]
);

const myCustomStructure = [
  imageGroup,
  textGroup
];

const CustomCard = (props: Props) => <Card {...props} structure={myCustomStructure} />
```
