# @rendr-view/use-scroll-markers

A powerful React hook for tracking scroll position relative to specific DOM elements, useful for scroll-spies, sticky headers, and reading progress indicators.

## 1. Metadata

- **Package Name:** `@rendr-view/use-scroll-markers`
- **Description:** A scroll-spy and scroll-marker tracking hook.
- **Category:** Hook

## 2. API Design

### Exports

- `useScrollMarkers`: The primary hook.
- `scrollMarkers`: Imperative API for scroll tracking.
- `getScrollPoints`: Utility for calculating element offsets.

### Hook API

```ts
const { currentScrollPoint } = useScrollMarkers({
  selectors: string[];              // CSS selectors to track
  containerRef?: React.RefObject;    // Optional scroll container (Default: window)
  scrollMarkerTransformer?: (el) => any; // Custom data extractor
  onScroll?: (container) => void;    // Scroll callback
});
```

## 3. Implementation Details

- **Dependencies:** `lodash.debounce`, `react`
- **Mechanism:** Uses `MutationObserver` to automatically recalculate scroll points if the DOM changes, ensuring accuracy for dynamic content.

## 4. Usage Example

```tsx
import { useScrollMarkers } from "@rendr-view/use-scroll-markers";

function ReadingProgress() {
  const { currentScrollPoint } = useScrollMarkers({
    selectors: ["h1", "h2", "h3"],
    scrollMarkerTransformer: (el) => ({ title: el.textContent })
  });

  return (
    <div className="fixed top-0 left-0">
      Currently reading: {currentScrollPoint?.title || "Beginning"}
    </div>
  );
}
```
