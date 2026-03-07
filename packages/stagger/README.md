# @rendr-view/stagger

A React component for managing sequential, staggered animations using Tailwind utility classes or custom state-based logic.

## 1. Metadata

- **Package Name:** `@rendr-view/stagger`
- **Description:** A control component for sequential animations.
- **Category:** Logic

## 2. API Design

### Exports

- `Stagger` (Default): The main control component.

### Props

```ts
interface Props {
  start?: boolean; // Trigger the animation sequence
  step?: StepProp; // Array of { id, in, out } duration objects
  children: (state: { started; ready; unready }) => React.JSX.Element;
}
```

## 3. Implementation Details

- **Dependencies:** `react`
- **Behavior:** Manages a sequential state machine where each "step" is marked as ready/unready based on the defined `in` and `out` durations.

## 4. Usage Example

```tsx
import Stagger from "@rendr-view/stagger";

return (
  <Stagger
    start={active}
    step={[
      { id: "header", in: 500 },
      { id: "list", in: 300 }
    ]}
  >
    {({ started, ready }) => (
      <div className={started ? "opacity-100" : "opacity-0"}>
        <h1 className={ready("header") ? "translate-x-0" : "-translate-x-full"}>
          Header
        </h1>
      </div>
    )}
  </Stagger>
);
```
