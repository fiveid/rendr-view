import React from "react";
import clxn from "./clxn";
import type { ClxnObject, ClxnLoader } from "./types";

type PropsWithClxnObject<P = {}, K = {}> = P & { clx: ClxnObject<K> };
type PropsWithClxnLoader<P = {}, K = {}> = P & { clx?: ClxnLoader<P, K> };

function withClxn<P = {}, K = {}>(
  Component: React.FunctionComponent<PropsWithClxnObject<P, K>>,
  defaults: ClxnLoader
): React.FunctionComponent<PropsWithClxnLoader<P, K>> {
  return ({ clx = {}, ...props }) => {
    const Comp = Component as any;
    return <Comp {...props} clx={clxn(clx, defaults, props)} />;
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
