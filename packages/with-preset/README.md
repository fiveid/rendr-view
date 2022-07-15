# @rendr-view/with-preset

A React higher-order-component to apply props "preset".

## Installation

```sh
yarn add @rendr-view/with-preset
```

## Example usage

```tsx
function cardPresetLoader(preset, props) {
  case "minimal":
    return {
      className: clsx(props.className, "text-sm p-4 bg-blue-600 text-white"),
      title: props.title
    }
  case "feature":
    return {
      ...props,
      titleClassName: clsx(props.titleClassName, "text-xl font-heading uppercase"),
      showImage: true,
      fullWidth: true,
      buttonIcon: "arrow"
    }
  case "bordered":
    return {
      ...props,
      className: clsx(props.className, "border border-blue-900")
    }
  default:
    return props;
}

const PresetCard = withPreset(Card, cardPresetLoader);

<PresetCard preset="minimal" />
<PresetCard preset="feature" />
<PresetCard preset="feature bordered" />
```
