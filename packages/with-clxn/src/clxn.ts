import { ClxnLoader, ClxnObject } from "./types";

function resolveClxnLoader<P = any>(loader: ClxnLoader, props?: P) {
  return typeof loader === "function" ? loader(props) : loader;
}

function concatClxnProperty(a: ClxnObject, b: ClxnObject, key: string) {
  const aValue = a[key];
  const bValue = b[key];
  return [aValue, bValue].filter(v => !!v).join(" ");
}

function clxn<P = any, K extends string = any>(
  input: ClxnLoader<K>,
  defaults: ClxnLoader<K> = {},
  props?: P
): ClxnObject<K> {
  const inp = resolveClxnLoader(input, props);
  const def = resolveClxnLoader(defaults, props);

  const allKeys = [...Object.keys(inp), ...Object.keys(def)].reduce(
    (arr, key) => {
      if (arr.includes(key)) {
        return arr;
      }

      return [...arr, key];
    },
    []
  );

  const clxnObj = allKeys.reduce((obj, currentKey) => {
    obj[currentKey] = concatClxnProperty(def, inp, currentKey);
    return obj;
  }, {}) as ClxnObject;

  return clxnObj as ClxnObject<K>;
}

export default clxn;
