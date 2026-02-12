// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ClxnObject<K = any> = Partial<Record<K extends string ? K : string, string>>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ClxnLoader<P = any, K = any> =
  | ClxnObject<K>
  | ((props?: P) => ClxnObject<K>);
