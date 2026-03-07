# @rendr-view/parallaxwipe

A React component that creates a parallax "wipe" effect by toggling between fixed and relative positioning based on scroll position.

## 1. Metadata

- **Package Name:** `@rendr-view/parallaxwipe`
- **Description:** A parallax container that reveals or hides content with a "wipe" effect.
- **Category:** UI Primitive

## 2. API Design

### Exports

- `ParallaxWipe` (Default): The main parallax container component.

### Props

```ts
interface Props {
  parallaxMode?: "always" | "in" | "out"; // Scroll trigger mode
  className?: string; // Outer container class
  innerClassName?: string; // Inner overflow container class
  width?: string; // Default: "w-screen"
  height?: string; // Default: "h-screen"
}
```

## 3. Implementation Details

- **Dependencies:** `@rendr-view/use-scroll-markers`, `clsx`
- **Mechanism:** Uses a scroll event listener and `clipPath: inset(0)` on the outer container to manage the visibility of the inner fixed-positioned content.

## 4. Usage Example

```tsx
import ParallaxWipe from "@rendr-view/parallaxwipe";

function App() {
  return (
    <ParallaxWipe parallaxMode="in" height="h-screen" className="bg-blue-500">
      <div className="flex items-center justify-center h-full">
        <h1 className="text-white text-6xl">Revealed!</h1>
      </div>
    </ParallaxWipe>
  );
}
```
