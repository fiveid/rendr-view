import React from "react";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export function useRouter() {
  const [location, setLocation] = React.useState(history.location);

  React.useEffect(() => {
    const unlisten = history.listen(({ location }: any) => {
      setLocation(location);
    });

    return () => {
      unlisten();
    };
  }, []);

  function push(href: string) {
    if (location.pathname !== href) {
      history.push(href);
    }
  }

  return {
    location,
    push
  };
}
