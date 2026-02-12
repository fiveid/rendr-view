# @rendr-view/text

A base React component for generating semantic text elements and pre-defined typography sets.

## 1. Metadata

- **Package Name:** `@rendr-view/text`
- **Description:** A polymorphic text component and typography generator.
- **Category:** UI Primitive

## 2. API Design

### Exports

- `Text` (Default): A polymorphic component for rendering semantic HTML text tags.
- `generateTypography`: A utility to create a set of styled typography components.

### Props

```ts
export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  tagName?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "li";
}
```

## 3. Implementation Details

- **Dependencies:** `clsx`, `react`
- **Side Effects:** `false`

## 4. Usage Example

### Polymorphic Text Component

```tsx
import { Text } from "@rendr-view/text";

return <Text tagName="h1">This is a Heading</Text>;
```

### Typography Generator

```tsx
import { generateTypography } from "@rendr-view/text";

const Typography = generateTypography({
  Title: { tagName: "h1", className: "text-4xl font-bold" },
  Body: { tagName: "p", className: "text-base leading-normal" }
});

return (
  <>
    <Typography.Title>Main Title</Typography.Title>
    <Typography.Body>Some body text.</Typography.Body>
  </>
);
```
