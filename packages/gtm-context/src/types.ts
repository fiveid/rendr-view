declare global {
  interface Window {
    dataLayer?: Record<string, any>[];
  }
}
export interface GTMEventDataset {
  event?: string;
  page?: string;
  category?: string;
  action?: string;
  label?: string;
  context?: string;
  data?: string;
}

export type GTMPushFn = (event: Record<string, any>) => void;
export type GTMEventTransformer = (
  event: GTMEventDataset
) => Record<string, any>;
