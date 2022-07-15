# @rendr-view/stagger

A React component intended to be used to execute sequential animations using Tailwind utility classes.

## Installation

```sh
yarn add @rendr-view/stagger
```

## Example

```tsx
<div className="overflow-hidden">
  <div className="mb-6 overflow-hidden">
    <Stagger
      start={isActive}
      step={[
        { id: "title", in: 700, out: 700 },
        { id: "text", in: 700 },
        { id: "world", in: 2000 }
      ]}
    >
      {steps => (
        <div
          className={clsx(
            "bg-slate-900 text-white max-w-screen-md px-6 py-12 transform transition duration-700 overflow-hidden",
            {
              ["-translate-x-full"]: !steps.started
            }
          )}
        >
          <div
            className={clsx("transition duration-700", {
              "translate-y-32 opacity-0": steps.unready("title")
            })}
          >
            <h2 className="text-4xl font-bold mb-6">
              Hello...{" "}
              <span
                className={clsx("transition duration-1000", {
                  "opacity-0": steps.unready("world")
                })}
              >
                world!
              </span>
            </h2>
            <p
              className={clsx("max-w-screen-sm transition duration-700", {
                "opacity-0": steps.unready("text")
              })}
            >
              Incididunt nulla incididunt qui occaecat mollit ut proident.
              Ad consectetur ad qui ad culpa consequat. Pariatur veniam
              consequat et amet duis quis exercitation officia eu sint
              Lorem.
            </p>
          </div>
        </div>
      )}
    </Stagger>
  </div>
  <Button onClick={() => setIsActive(!isActive)} />
</div>
```
