export type ClxnObject<K = any> = Partial<Record<keyof K, string>>;
export type ClxnLoader<P = any, K = any> = ClxnObject<K> | ((props: P) => ClxnObject<K>);
