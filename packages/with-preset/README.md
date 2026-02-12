# @rendr-view/with-preset

A React higher-order-component (HOC) that allows applying pre-defined prop configurations ("presets") to a component via a single string prop.

## 1. Metadata

- **Package Name:** `@rendr-view/with-preset`
- **Description:** A HOC for managing component variants via mnemonic string presets.
- **Category:** Logic / HOC

## 2. API Design

### Exports

- `withPreset` (Default): The Higher-Order Component.

### HOC API

```ts
const EnhancedComponent = withPreset(BaseComponent, presetLoader, options?);
```

#### presetLoader
A function `(preset: string, props: object) => object` that returns modified props based on the active preset.

## 3. Implementation Details

- **Dependencies:** `react`
- **Mult-preset Support:** Supports multiple space-separated presets (e.g., `preset="minimal bold border"`).

## 4. Usage Example

```tsx
import withPreset from "@rendr-view/with-preset";

const cardLoader = (preset, props) => {
  if (preset === "red") return { ...props, className: "text-red-500" };
  return props;
};

const PresetCard = withPreset(Card, cardLoader);

return <PresetCard preset="red" title="Hello" />;
```
