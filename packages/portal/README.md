# @rendr-view/portal

A lightweight React portal component for rendering children outside the main DOM hierarchy, typically used for modals, tooltips, and overlays.

## 1. Metadata

- **Package Name:** `@rendr-view/portal`
- **Description:** A simple, reusable React portal container.
- **Category:** UI Primitive

## 2. API Design

### Exports

- `Portal` (Default): The portal component.

### Props

```ts
interface Props {
  children: React.ReactNode;
  className?: string; // Class applied to the portal container (Default: "root-portal")
  el?: string;        // HTML element type for the container (Default: "div")
  id?: string;        // Optional ID for the portal container
}
```

## 3. Implementation Details

- **Dependencies:** `react`, `react-dom`
- **Behavior:** Automatically manages the lifecycle of the portal container element in the `document.body`.

## 4. Usage Example

```tsx
import Portal from "@rendr-view/portal";

function MyModal() {
  return (
    <Portal className="my-modal-overlay">
      <div className="modal-content">
        <h2>I am rendered in a Portal!</h2>
      </div>
    </Portal>
  );
}
```
