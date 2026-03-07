# @rendr-view/use-scrollsnap-controls

A specialized React hook for controlling native CSS `scroll-snap` carousels with precise slide and view-based navigation.

## 1. Metadata

- **Package Name:** `@rendr-view/use-scrollsnap-controls`
- **Description:** A hook for programmatic control of scroll-snap containers.
- **Category:** Hook

## 2. API Design

### Exports

- `useScrollSnapControls`: The primary hook.

### Hook API

```ts
const controls = useScrollSnapControls(ref, options);
```

#### Controls Object

- `slides`: `{ visible, whollyVisible, count, next(), prev(), goTo(i) }`
- `views`: `{ visible, whollyVisible, count, next(), prev(), goTo(i) }`

## 3. Implementation Details

- **Dependencies:** `lodash.debounce`, `react`
- **Features:** Supports both slide-based (individual items) and view-based (paginated groups of items) navigation.

## 4. Usage Example

```tsx
import { useScrollSnapControls } from "@rendr-view/use-scrollsnap-controls";
import { useRef } from "react";

function Carousel() {
  const scrollRef = useRef(null);
  const { slides } = useScrollSnapControls(scrollRef, {
    slideSelector: ".item"
  });

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={slides.prev} disabled={slides.visible.includes(0)}>
          Prev
        </button>
        <button
          onClick={slides.next}
          disabled={slides.visible.includes(slides.count - 1)}
        >
          Next
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory"
      >
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="item flex-shrink-0 w-full snap-start">
            Slide {i}
          </div>
        ))}
      </div>
    </div>
  );
}
```
