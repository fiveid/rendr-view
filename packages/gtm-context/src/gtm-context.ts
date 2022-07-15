import React from "react";
import { gtmPush } from "./gtm-push";
import { GTMEventDataset, GTMEventTransformer, GTMPushFn } from "./types";

export interface GTMContextProps {
  push: GTMPushFn;
  event?: GTMEventDataset;
  mockPushHandler?: GTMPushFn;
  initialised?: boolean;
  transformer?: GTMEventTransformer;
}

const GTMContext = React.createContext<GTMContextProps>({
  push: gtmPush,
  initialised: false
});

export default GTMContext;
