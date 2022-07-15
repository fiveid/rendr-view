import React from "react";
import { RendrCtx, createPage, createContext, Page } from "@ekino/rendr-core";
import { createChainedLoader, Loader } from "@ekino/rendr-loader";
import { useRouter } from "./rendr-router";

export interface Props {
  loaders: Loader[];
  children(pageProps: { page?: Page | null; isLoading: boolean }): void;
}

export async function handleLoaders(
  { ctx, loaders }: { ctx: RendrCtx; loaders: Loader[] },
  cb: (page: Page, err?: Error) => void
) {
  try {
    const loader = createChainedLoader(loaders);
    const maybePage = await loader(ctx, createPage({}) as Page, p => p);

    if (!maybePage) {
      cb(null, new Error("No page defined"));
      return;
    }

    const page = maybePage as Page;
    cb(page);
  } catch (err) {
    cb(null, err);
  }
}

export default function RendrLoader({ children, loaders }: Props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState<Page | null>(null);
  const { location } = useRouter();

  React.useEffect(() => {
    const ctx = createContext(location.pathname);
    setIsLoading(true);

    handleLoaders({ ctx, loaders }, (newPage: Page, err: Error) => {
      setIsLoading(false);
      if (!err) {
        setPage(newPage);
      }
    });
  }, [location.pathname, loaders]);

  return <>{children({ page, isLoading })}</>;
}
