function RendrTemplate({ containerRenderer, blocks, ...props }: any) {
  return (
    <div className="app">
      <header role="banner">{containerRenderer("header", blocks)}</header>
      <main>{containerRenderer("body", blocks)}</main>
      <footer role="contentinfo" className="pt-16">
        {containerRenderer("footer", blocks)}
      </footer>
    </div>
  );
}

export default RendrTemplate;
