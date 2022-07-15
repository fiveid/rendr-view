import GTMContext, { GTMContextProps } from "./gtm-context";
import GTMHandler, { Props } from "./GTMHandler";
import { gtmPush } from "./gtm-push";
import { GTMEventDataset, GTMPushFn } from "./types";

export type { GTMContextProps, Props, GTMEventDataset, GTMPushFn };
export { GTMHandler, gtmPush };
export default GTMContext;
