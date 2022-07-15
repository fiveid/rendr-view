# @rendr-view/use-outside-alerter

A React hook that can trigger a callback function when the user interacts with any content _outside_ the target element.

## Installation

```sh
yarn add @rendr-view/use-outside-alerter
```

## Example usage

```tsx
function Comp() {
  const ref = React.useRef();

  useOutsideAlerter(
    ref,
    () => {
      // the user has clicked outside the modal, you may want to close it
    },
  );

  return <div ref={ref} className="Modal">{...content}</div>
} 
```
