export const gtmPush = (gtmEvent: Record<string, any>) => {
  // eslint-disable-next-line no-console
  let dataLayerLogger = {
    push: (args: Record<string, any>) => console.log(args)
  };

  if (typeof window !== undefined && window.dataLayer) {
    dataLayerLogger = window.dataLayer;
  }

  dataLayerLogger.push(gtmEvent);
};
