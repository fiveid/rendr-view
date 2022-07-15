import { createPage } from "@ekino/rendr-core";
import { Loader } from "@ekino/rendr-loader";
import { FetchService } from "../types";

const defaultFetch: FetchService = (url: string) =>
  fetch(url).then(r => r.json());

export function createSimpleApiLoader({
  url,
  fetchService = defaultFetch
}: {
  url: string;
  fetchService: FetchService;
}): Loader {
  return async (ctx, page, next) => {
    const data = await fetchService(url + ctx.req.pathname);
    return next(createPage(data));
  };
}
