# @rendr-view/use-fill-available

A React hook that creates a `--vh` CSS variable that automatically represents 1%  of the _available_ height of the screen (to account for iOS Safari toolbars, for example).

## Installation

```sh
yarn add @rendr-view/use-fill-available
```

## Example usage

```tsx
// tailwind.config.js
module.exports = {
  ...config,
  theme: {
    extend: {
      spacing: {
        "fill-available": "calc(var(--vh, 1vh) * 100)"
      }
    }
  }
}

// _app.tsx
const App = () => {
  useFillAvailable();
  return <div>
    <div className="h-fill-available">This adapts to the available height of the screen</div>
  </div>
}
```
