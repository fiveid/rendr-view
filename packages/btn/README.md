# @rendr-view/btn

A base button component that works as either a HTML button or a link depending on the given props.

## 1. Metadata

- **Package Name:** `@rendr-view/btn`
- **Description:** A flexible, accessible button/link component with icon support.
- **Category:** UI Primitive

## 2. API Design

### Exports

- `Btn` (Default): The primary button component.

### Props

The custom `Btn` props extend the HTML button attributes and HTML anchor link attributes.

```ts
interface Props extends ButtonProps {
  clx?: ClxnObject<ClassNamesList>;
  icon?: React.ComponentType<IconBaseProps>;
  buttonComponent?: React.ComponentType<HTMLButtonType> | "button";
  linkComponent?: React.ComponentType<HTMLLinkType> | "a";
  iconProps?: IconBaseProps;
}
```

#### clx
A record of classNames to style Btn elements: `button`, `enabled`, `disabled`, `label`, `icon`.

## 3. Implementation Details

- **Dependencies:** `@rendr-view/with-clxn`, `clsx`
- **Side Effects:** `false`

## 4. Usage Example

```tsx
import { Btn } from "@rendr-view/btn";
import { AiOutlineArrowRight } from "react-icons/ai";

function App() {
  return (
    <Btn 
      href="/contact" 
      icon={AiOutlineArrowRight}
      clx={{ button: "p-4 bg-primary text-white" }}
    >
      Contact Us
    </Btn>
  );
}
```
