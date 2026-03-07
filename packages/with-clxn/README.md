# @rendr-view/with-clxn

A React higher-order-component (HOC) that manages mapping and merging an object of utility classes (clxn) to child elements, specifically designed for Tailwind CSS workflows.

## 1. Metadata

- **Package Name:** `@rendr-view/with-clxn`
- **Description:** A utility for managing multi-element class objects in React components.
- **Category:** Logic / HOC

## 2. API Design

### Exports

- `withClxn` (Default): The Higher-Order Component.
- `clxn`: The underlying utility for merging class objects.

### HOC API

```ts
const EnhancedComponent = withClxn(BaseComponent, defaultClasses);
```

The enhanced component receives a `clx` prop which can be a static object or a function returning an object.

## 3. Implementation Details

- **Dependencies:** `react`
- **Flexibility:** Supports conditional class merging and overrides at the instance level.

## 4. Usage Example

```tsx
import withClxn from "@rendr-view/with-clxn";

const BaseBox = ({ clx }) => (
  <div className={clx.container}>
    <h1 className={clx.title}>Hello</h1>
  </div>
);

const Box = withClxn(BaseBox, {
  container: "p-4 bg-gray-100",
  title: "text-xl font-bold"
});

// Override classes for specific instances:
<Box clx={{ container: "bg-blue-100" }} />;
```
