# @rendr-view/text

A base React component for generating text components and typography sets.

## Installation

```sh
yarn add @rendr-view/text
```

## Text

The basic `Text` component simply renders children inside a html tag. It extends all the standard attributes of text-based html elements. It may have standalone usage, but is mainly intended to be used by `generateTypography` function, described below.

Example:

```tsx
<Text>Some text</Text>
// <span>Some text</span>

<Text id="my-title" className="bold" tagName="h3">Some text</Text>
// <h3 id="my-title" class="bold">Some text</h3>
```

## generateTypography

Use `generateTypography` to quickly create custom typography sets.

```ts
function generateTypography<K = any>(
  tags: Record<keyof K, TypographyDefinition>,
  baseClassName?: string
): TypographySet<K> 
```

### tags

The first argument is how you define the typography styles you want. It's an object containing a set of `TypographyDefinition`. The property keys will become the names of the generated components.

```ts
tagName: SupportedHTMLTags;
className: string;
```

Supported HTML tags are: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `p`, `span`, `li`.

### baseClassName

The second argument is an optional className that will be applied to all the generated components.

### Example

```tsx
const TypeSet = generateTypography(
  {
    Paragraph: { tagName: "p", className: "text-sm leading-relaxed mb-4" },
    Title: { tagName: "h1", className: "text-6xl font-bold mb-12" },
    Heading: { tagName: "h2", className: "text-3xl font-bold mb-6" },
    Subheading: { tagName: "h3", className: "text-lg font-bold mb-4" },
    Intro: { tagName: "p", className: "text-lg mb-4" }
  },
  "font-serif"
);

const ExampleSet = () => (
  <div>
    <TypeSet.Title>This is my title</TypeSet.Title>
    <TypeSet.Heading>This is a subheading</TypeSet.Heading>
    <TypeSet.Intro>
      Commodo exercitation eiusmod incididunt ipsum do. Magna ex anim veniam
      duis pariatur do consectetur ipsum nisi magna Lorem aute. Sint voluptate
      anim duis nostrud ullamco aliquip enim.
    </TypeSet.Intro>
    <TypeSet.Paragraph>
      Proident do quis voluptate id quis non. Irure aliqua Lorem amet tempor do
      ullamco consequat proident consequat tempor. Et ipsum mollit officia est
      dolore. Ea veniam irure irure nisi pariatur ipsum consequat est aliqua
      dolore Lorem. Nulla voluptate proident exercitation Lorem voluptate. Ex
      laboris est non eiusmod est minim veniam est. Consectetur minim anim
      fugiat exercitation. Cillum duis proident sit deserunt Lorem dolor non
      labore veniam culpa incididunt culpa sunt fugiat.
    </TypeSet.Paragraph>
  </div>
);
```
