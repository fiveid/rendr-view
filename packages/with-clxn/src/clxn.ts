import type { ClxnLoader, ClxnObject } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveClxnLoader<P = any>(loader: ClxnLoader<P, any>, props?: P) {
  return typeof loader === "function" ? loader(props) : loader;
}

function concatClxnProperty(
  a: ClxnObject<PropertyKey>,
  b: ClxnObject<PropertyKey>,
  key: string
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const aValue = (a as any)[key];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bValue = (b as any)[key];
  return [aValue, bValue].filter(v => !!v).join(" ");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function clxn<P = any, K extends string = string>(
  input: ClxnLoader<P, K>,
  defaults: ClxnLoader<P, K> = {},
  props?: P
): ClxnObject<K> {
  const inp = resolveClxnLoader(input, props);
  const def = resolveClxnLoader(defaults, props);

  const allKeys = [...Object.keys(inp), ...Object.keys(def)].reduce<string[]>(
    (arr, key) => {
      if (arr.includes(key)) {
        return arr;
      }

      return [...arr, key];
    },
    []
  );

  const clxnObj = allKeys.reduce<Record<string, string>>((obj, currentKey) => {
    obj[currentKey] = concatClxnProperty(def, inp, currentKey);
    return obj;
  }, {});

  return clxnObj as ClxnObject<K>;
}

export default clxn;
