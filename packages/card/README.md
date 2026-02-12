# @rendr-view/card

A base "card" component that displays simple content in a simple structure, intended to be highly customisable to generate a lot of varieties.

## 1. Metadata

- **Package Name:** `@rendr-view/card`
- **Description:** A highly customizable card component with a flexible, modular structure.
- **Category:** UI Primitive

## 2. API Design

### Exports

- `Card` (Default): The main card component.
- `CardImage`, `CardCategories`, `CardTitle`, `CardSubtitle`, `CardParagraph`, `CardButtons`: Individual section components.

### Props

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

## 3. Implementation Details

- **Dependencies:** `@rendr-view/with-clxn`, `clsx`
- **Customizable Structure:** The card's layout is controlled via the `structure` prop, which accepts an array of strings (built-in sections) or React components (custom sections).

## 4. Usage Example

```tsx
import { Card } from "@rendr-view/card";

function App() {
  return (
    <Card
      title="Standard Card"
      text="This is a simple card with an image and a button."
      image={{ src: "https://via.placeholder.com/150", alt: "Placeholder" }}
      buttons={[{ label: "Learn More", href: "#" }]}
      clx={{ card: "border p-4 shadow-sm" }}
    />
  );
}
```

### Advanced: Custom Structure

```tsx
const myStructure = ["title", "image", "buttons"]; // Paragraph and categories removed

return <Card structure={myStructure} title="Custom Layout" />;
```
