import GTMContext from "./gtm-context";
import GTMHandler from "./GTMHandler";
import type { GTMContextProps } from "./gtm-context";
import type { Props } from "./GTMHandler"
import type { gtmPush } from "./gtm-push";
import type { GTMEventDataset, GTMPushFn } from "./types";

export type { GTMContextProps, Props, GTMEventDataset, GTMPushFn };
export { GTMHandler, gtmPush };
export default GTMContext;
