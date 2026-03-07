# @rendr-view/use-fill-available

A React hook that fixes the "100vh" issue on mobile browsers by creating a `--vh` CSS variable that represents 1% of the truly available viewport height.

## 1. Metadata

- **Package Name:** `@rendr-view/use-fill-available`
- **Description:** A hook to ensure accurate full-height layouts on mobile.
- **Category:** Hook

## 2. API Design

### Exports

- `useFillAvailable`: The primary hook.

### Hook API

```ts
useFillAvailable({
  debounce?: number; // Milliseconds to debounce the resize listener (Default: 200)
});
```

## 3. Implementation Details

- **Dependencies:** `lodash.debounce`, `react`
- **Behavior:** Sets a custom CSS property `--vh` on the `document.documentElement`.

## 4. Usage Example

### Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      height: {
        "fill-available": "calc(var(--vh, 1vh) * 100)"
      }
    }
  }
};
```

### Component Usage

```tsx
import { useFillAvailable } from "@rendr-view/use-fill-available";

function App() {
  useFillAvailable();

  return (
    <div className="h-fill-available bg-primary">
      This container always fills the available viewport height!
    </div>
  );
}
```
