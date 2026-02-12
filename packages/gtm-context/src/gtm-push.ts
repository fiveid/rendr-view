// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const gtmPush = (gtmEvent: Record<string, any>) => {
  let dataLayerLogger = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-console
    push: (args: Record<string, any>) => console.log(args)
  };

  if (typeof window !== undefined && window.dataLayer) {
    dataLayerLogger = window.dataLayer;
  }

  dataLayerLogger.push(gtmEvent);
};
