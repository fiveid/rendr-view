import React from "react";
import { Loader, InMemorySettings } from "@ekino/rendr-loader";
import { createInMemoryLoader } from "./utils/in-memory-loader";
import RendrLoader from "./RendrLoader";
import {
  ComponentList,
  createBlockRegistry,
  createBlockRenderer,
  createContainerRenderer,
  createTemplateRegistry
} from "@ekino/rendr-template-react";
import RendrPage, { Props as RendrPageProps } from "./RendrPage";
import { FetchService } from "./types";
import { createSimpleApiLoader } from "./utils/api-loader";

export interface Props {
  templates: ComponentList;
  blocks: ComponentList;
  url?: string;
  routes?: InMemorySettings;
  loaders?: Loader[];
  fetchService?: FetchService;
  loadingContent?: React.ReactNode;
  children?: (
    props: Omit<RendrPageProps, "loadingContent"> & { isLoading: boolean }
  ) => void;
}

export function RendrRouter({
  url,
  children,
  routes,
  fetchService,
  loaders = [],
  templates,
  loadingContent,
  blocks
}: Props) {
  const templateRegistry = createTemplateRegistry(templates);
  const blockRegistry = createBlockRegistry(blocks);
  const blockRenderer = createBlockRenderer(blockRegistry);
  const containerRenderer = createContainerRenderer(blockRenderer);

  const allLoaders = [];

  if (url) {
    allLoaders.push(createSimpleApiLoader({ url, fetchService }));
  }

  if (routes) {
    allLoaders.push(createInMemoryLoader(routes));
  }

  allLoaders.push(...loaders);

  if (children) {
    return (
      <RendrLoader loaders={allLoaders}>
        {({ page, isLoading }) =>
          children({ page, templateRegistry, containerRenderer, isLoading })
        }
      </RendrLoader>
    );
  }

  return (
    <RendrLoader loaders={allLoaders}>
      {({ page }) => (
        <RendrPage
          page={page}
          templateRegistry={templateRegistry}
          containerRenderer={containerRenderer}
          loadingContent={loadingContent}
        />
      )}
    </RendrLoader>
  );
}
