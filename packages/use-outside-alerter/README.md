# @rendr-view/use-outside-alerter

A React hook that triggers a callback when a user interacts with content outside of a specified element.

## 1. Metadata

- **Package Name:** `@rendr-view/use-outside-alerter`
- **Description:** A hook for detecting clicks or focus changes outside a target element.
- **Category:** Hook

## 2. API Design

### Exports

- `useOutsideAlerter`: The primary hook.

### Hook API

```ts
useOutsideAlerter(
  ref: React.RefObject<HTMLElement>, // Target element ref
  callback: () => void,             // Triggered on outside interaction
  events?: string[]                  // Events to track (Default: ["mouseup"])
);
```

Supported events: `mouseup`, `focus`, `blur`.

## 3. Implementation Details

- **Dependencies:** `lodash.debounce`, `react`
- **Behavior:** Attaches event listeners to the `document` and uses `ref.contains()` to determine if the interaction occurred outside the target.

## 4. Usage Example

```tsx
import { useOutsideAlerter } from "@rendr-view/use-outside-alerter";
import { useRef } from "react";

function Modal({ onClose }) {
  const modalRef = useRef(null);

  useOutsideAlerter(modalRef, onClose);

  return (
    <div ref={modalRef} className="bg-white p-8">
      <h2>I am a Modal</h2>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
```
