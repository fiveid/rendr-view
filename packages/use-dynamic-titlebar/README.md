# @rendr-view/use-dynamic-titlebar

A specialized React hook that updates a title bar component based on the current scroll position within a container, typically used for mobile-style headers.

## 1. Metadata

- **Package Name:** `@rendr-view/use-dynamic-titlebar`
- **Description:** A hook for creating mobile-style dynamic headers that update as you scroll.
- **Category:** Hook

## 2. API Design

### Exports

- `useDynamicTitleBar`: The primary hook.
- `dynamicTitleBar`: Imperative API.

### Hook API

```ts
const { containerRef, titleRef } = useDynamicTitleBar({
  titleBarActiveClassList?: string[]; // Classes to apply when title bar is active
  dataAttribute?: string;            // Attribute used to track titles (Default: "data-title")
});
```

## 3. Implementation Details

- **Dependencies:** `@rendr-view/use-scroll-markers`, `react`
- **Requirement:** Expects a title bar element containing a `[data-title-output]` child to receive the updated text.

## 4. Usage Example

```tsx
import { useDynamicTitleBar } from "@rendr-view/use-dynamic-titlebar";

function Page() {
  const { containerRef, titleRef } = useDynamicTitleBar({
    titleBarActiveClassList: ["is-scrolled"]
  });

  return (
    <div>
      <header ref={titleRef} className="fixed top-0 w-full h-12 bg-white">
        <span data-title-output>Default Title</span>
      </header>
      
      <main ref={containerRef} className="h-screen overflow-y-auto">
        <section data-title="Section 1" className="h-screen">Content 1</section>
        <section data-title="Section 2" className="h-screen">Content 2</section>
      </main>
    </div>
  );
}
```
