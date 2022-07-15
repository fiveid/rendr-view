import RendrBlock, { Props } from "@rendr-view/rendr-block";

const TextBlock = (props: Omit<Props, "clx">) => (
  <RendrBlock
    clx={{
      block: "py-12 bg-zinc-200",
      inner: "mx-auto max-w-screen-md text-zinc-900"
    }}
    {...props}
  />
);

const WideBlock = (props: Omit<Props, "clx">) => (
  <RendrBlock
    clx={{
      block: "py-12 bg-zinc-200",
      inner: "mx-auto max-w-screen-lg text-zinc-900"
    }}
    {...props}
  />
);

const Container = {
  TextBlock,
  WideBlock
};

export default Container;
