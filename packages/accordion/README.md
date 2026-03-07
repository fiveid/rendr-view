# @rendr-view/accordion

A flexible React accordion component that handles smooth height transitions and dynamic content resizing.

## 1. Metadata

- **Package Name:** `@rendr-view/accordion`
- **Description:** A smooth, accessible accordion container for React.
- **Category:** UI Primitive

## 2. API Design

### Exports

- `AccordionBox` (Default): The primary accordion container component.

### Props

The `AccordionBox` props extend standard `div` attributes.

```typescript
interface Props {
  opened?: boolean; // Control whether the accordion is open
  duration?: string; // CSS duration class (e.g., "duration-700")
  hideOnLoad?: boolean; // Immediately hide content on initial layout
  alwaysRenderChildren?: boolean; // Keep children in DOM when closed (default: true)
  disableMutationObserver?: boolean; // Disable automatic resizing on content changes
  getInnerContentHeight?: (div: HTMLDivElement) => number | void; // Custom height calculation
}
```

## 3. Implementation Details

- **Dependencies:** `clsx`, `lodash.debounce`
- **Side Effects:** `false`
- **Behavior:** Uses a `MutationObserver` by default to ensure the accordion height stays in sync with dynamic content changes.

## 4. Usage Example

```tsx
import AccordionBox from "@rendr-view/accordion";
import { useState } from "react";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Accordion</button>
      <AccordionBox opened={isOpen} duration="duration-300">
        <div className="p-4 bg-gray-100">
          <p>This is the accordion content.</p>
        </div>
      </AccordionBox>
    </div>
  );
}
```
