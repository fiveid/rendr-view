import { NotFoundError, Page } from "@ekino/rendr-core";
// @ts-ignore - definition does not exist...
import createMatcher from "path-match";

type Loader = any;
type InMemorySettings = any;
type RouteConfiguration = any;

const route = createMatcher({
  // path-to-regexp options
  sensitive: false,
  strict: true,
  end: true,
  start: true,
});

export function createInMemoryLoader(paths: InMemorySettings): Loader {
  const routes: RouteConfiguration[] = [];

  // compute the route expression
  for (const path in paths) {
    if (!paths[path]) {
      continue;
    }

    routes.push({
      path,
      matcher: route(path),
      pageBuilder: paths[path],
    });
  }

  return async (ctx: any, page: any, next = (page: any) => page) => {
    const result = routes.find((conf) => {
      const { matcher } = conf;

      // @ts-ignore - definition does not exist...
      const params = matcher(ctx.req.pathname);

      if (!params) {
        return false;
      }

      ctx.req.params = params;

      return true;
    });

    if (!result) {
      throw new NotFoundError();
    }

    if (page instanceof Page) {
      page.statusCode = 200; // found a page

      return next(await result.pageBuilder(ctx, page));
    } else {
      return next(page);
    }
  };
}
