import React from "react";
import clxn from "./clxn";
import type { ClxnObject, ClxnLoader } from "./types";

type PropsWithClxnObject<P = object, K = object> = P & { clx: ClxnObject<K> };
type PropsWithClxnLoader<P = object, K = object> = P & {
  clx?: ClxnLoader<P, K>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withClxn<P = any, K = any>(
  Component: React.ComponentType<PropsWithClxnObject<P, K>>,
  defaults: ClxnLoader<P, K>
): React.FunctionComponent<PropsWithClxnLoader<P, K>> {
  return ({ clx = {}, ...props }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Comp = Component as any;
    return (
      <Comp
        {...(props as P)}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        clx={clxn(clx as ClxnLoader<P, K>, defaults, props as any)}
      />
    );
  };
}

export default withClxn;
export { clxn };
export type {
  ClxnObject,
  ClxnLoader,
  PropsWithClxnLoader,
  PropsWithClxnObject
};
