import React from "react";
import { TemplateProps } from "@ekino/rendr-template-react";

export default function RendrTemplate({
  containerRenderer,
  blocks
}: TemplateProps) {
  return (
    <>
      <header role="banner">{containerRenderer("header", blocks)}</header>
      <main>{containerRenderer("body", blocks)}</main>
      <footer role="contentinfo">{containerRenderer("footer", blocks)}</footer>
    </>
  );
}
