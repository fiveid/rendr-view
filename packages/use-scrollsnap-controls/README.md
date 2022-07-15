# @rendr-view/use-scrollsnap-controls

A React hook that provides methods to control `scroll-snap` carousels.  

## Installation

```sh
yarn add @rendr-view/use-scrollsnap-controls
```

## Example usage

```tsx
function Example(props: { itemClassName?: string | string[]; options?: any }) {
  const ref = React.useRef(null);
  const controls = useScrollSnapControls(ref, props.options);

  return (
    <div>
      <div className="flex justify-between py-2">
        <div className="flex">
          <span className="block pr-4 font-bold">Slides</span>
          <span className="block pr-4">
            Visible: {controls.slides.visible.join(", ")}
          </span>
          <span className="block pr-4">
            Wholly visible: {controls.slides.whollyVisible.join(", ")}
          </span>
          <span className="block">Count: {controls.slides.count}</span>
        </div>
        <div>
          <button onClick={controls.slides.prev}>Prev</button>
          <button className="ml-2" onClick={controls.slides.next}>
            Next
          </button>
        </div>
      </div>
      <div className="flex justify-between py-2">
        <div className="flex">
          <span className="block pr-4 font-bold">Views</span>
          <span className="block pr-4">
            Visible: {controls.views.visible.join(", ")}
          </span>
          <span className="block pr-4">
            Wholly visible: {controls.views.whollyVisible.join(", ")}
          </span>
          <span className="block">Count: {controls.views.count}</span>
        </div>
        <div>
          <button onClick={controls.views.prev}>Prev</button>
          <button className="ml-2" onClick={controls.views.next}>
            Next
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className="carousel relative flex flex-nowrap snap-x snap-mandatory overflow-x-scroll"
      >
        {items.map(i => (
          <div
            key={i}
            className={clsx(
              "slide aspect-video bg-gray-100 border flex justify-center items-center font-bold transition duration-1000 flex-shrink-0",
              {
                "snap-center": true,
                "border-green-200": controls.slides.visible.includes(i),
                "border-green-500": controls.slides.whollyVisible.includes(i)
              },
              className
            )}
          >
            Index {i}
          </div>
        ))}
      </div>
    </div>
  );
}
```
