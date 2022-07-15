import { Page } from "@ekino/rendr-core";
import {
  ContainerRenderer,
  TemplateRegistry
} from "@ekino/rendr-template-react";
import React, { Suspense } from "react";

export interface Props {
  page?: Page | null;
  containerRenderer: ContainerRenderer;
  templateRegistry: TemplateRegistry;
  loadingContent?: React.ReactNode;
}

function RendrPage({
  page,
  loadingContent,
  containerRenderer,
  templateRegistry
}: Props) {
  if (!page) {
    return null;
  }

  const Template = templateRegistry(page.template);

  return (
    <Suspense fallback={loadingContent || <div>Please wait...</div>}>
      <Template
        containerRenderer={containerRenderer}
        blocks={page.blocks}
        page={page}
      />
    </Suspense>
  );
}

export default RendrPage;
