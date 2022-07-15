# @rendr-view/with-clxn

A React higher-order-component that adds and manages props to control an object of utility classes.

## Installation

```sh
yarn add @rendr-view/with-clxn
```

## What an I trying to make easier?

Composing structural components where multiple elements can be customised by Tailwind utilities. I want to make it even easier to create variants of these components, and then to be able to apply additional utility classes to those variants when used in specific instances.

## Examples

```tsx
type BasicProps = {
  type?: string;
  clx?: any;
};

const BasicDiv = (props: BasicProps) => (
  <div className={props?.clx?.container}>
    <div className={props?.clx?.inner}>
      <h2 className={props?.clx?.title}>My title</h2>
      <p className={props?.clx?.text}>
        Id irure qui minim qui quis. Sunt amet deserunt officia esse ex enim id
        ex aute. Adipisicing do ex aute cupidatat minim nulla qui excepteur
        labore officia. Amet anim nulla laborum proident sunt nostrud laborum
        consectetur aliqua veniam excepteur dolore. Sint officia culpa voluptate
        occaecat sit tempor. Eu quis fugiat do non eu sit esse excepteur magna
        ullamco in. Minim laboris nisi tempor duis nisi amet pariatur laborum.
      </p>
    </div>
  </div>
);

const DefaultClxnDiv = withClxn(BasicDiv, {
  container: "container",
  inner: "py-12",
  title: "text-2xl font-bold uppercase",
  text: "mt-3"
});

const AltClxnDiv = withClxn(BasicDiv, {
  container: "container my-6 shadow-lg border border-gray-50",
  inner: "p-16",
  title: "text-4xl font-bold uppercase",
  text: "text-lg mt-3"
});

const TypeClxnDiv = withClxn<BasicProps>(BasicDiv, (props: BasicProps) => ({
  container: clsx(
    "container",
    props.type === "light"
      ? "bg-gray-100 text-gray-900"
      : "bg-gray-900 text-gray-200"
  ),
  inner: "p-6",
  title: "text-2xl font-bold tracking-wide",
  text: "text-sm leading-relaxed"
}));

export const Defaults = () => (
  <>
    <DefaultClxnDiv />
    <AltClxnDiv />
    <TypeClxnDiv />

    <DefaultClxnDiv clx={{ title: "text-blue-800", text: "text-gray-500" }} />
    <AltClxnDiv clx={{ container: "bg-yellow-100" }} />
    <TypeClxnDiv
      type="light"
      clx={(props: BasicProps) => ({
        container: clsx(
          "border-4",
          props.type === "light" ? "border-yellow-300" : "border-blue-800"
        )
      })}
    />
  </>
);
```
