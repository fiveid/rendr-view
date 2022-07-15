# @rendr-view/btn

A base button component that works as either a HTML button or a link depending on the given props.

## Installation

```sh
yarn add @rendr-view/btn
```

## Props

The custom `Btn` props extend the HTML button attributes and HTML anchor link attributes, as well as data and aria attributes.

```ts
interface Props extends ButtonProps {
  clx?: ClxnObject<ClassNamesList>;
  icon?: React.ComponentType<IconBaseProps>;
  buttonComponent?: React.ComponentType<HTMLButtonType> | "button";
  linkComponent?: React.ComponentType<HTMLLinkType> | "a";
  iconProps?: IconBaseProps;
}

```

### clx

A record of classNames to style Btn elements. The following properties are all optional:

```text
button?: string;
enabled?: string;
disabled?: string;
label?: string;
icon?: string;
```

### icon

An icon component to render as part of the Btn. This expects a components matching the props for the `react-icon` library.

### buttonComponent

A React component to render when displaying as a button. By default, this will be the HTML `button` element.

### linkComponent

A React component to render when displaying as a link. By default, this will be the HTML `a` element.

### iconProps

Props to pass to the icon component, if used.
