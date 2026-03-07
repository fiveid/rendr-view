# @rendr-view/rendr-block

A specialized container for rendering Rendr block definitions within the `rendr-view` ecosystem.

## 1. Metadata

- **Package Name:** `@rendr-view/rendr-block`
- **Description:** A bridge component for rendering Rendr-compatible content blocks.
- **Category:** UI Primitive

## 2. API Design

### Exports

- `RendrBlock` (Default): The primary block container component.

### Props

The `RendrBlock` props extend standard `section` attributes.

```ts
interface Props {
  blockRenderer?: BlockRenderer; // Function to render individual blocks
  blocks?: BlockDefinition[]; // Array of Rendr block definitions
  clx?: {
    // Style overrides
    block?: string;
    inner?: string;
  };
}
```

## 3. Implementation Details

- **Dependencies:** `@rendr-view/with-clxn`, `clsx`, `@ekino/rendr-template-react` (types), `@ekino/rendr-core` (types)
- **HOC:** Wrapped with `withClxn` for consistent styling support.

## 4. Usage Example

```tsx
import RendrBlock from "@rendr-view/rendr-block";

function Page({ pageBlocks, myRenderer }) {
  return (
    <RendrBlock
      blocks={pageBlocks}
      blockRenderer={myRenderer}
      clx={{ block: "my-custom-section" }}
    />
  );
}
```
