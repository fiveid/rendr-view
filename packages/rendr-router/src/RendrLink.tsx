import React from "react";
import { history, useRouter } from "./rendr-router";

function isMetaKey(e: React.MouseEvent<HTMLAnchorElement>) {
  return e.ctrlKey || e.metaKey;
}

function opensInNewWindow(
  e: React.MouseEvent<HTMLAnchorElement>,
  target?: string
) {
  return target === "_blank" || isMetaKey(e);
}

function isRelativeHref(href?: string) {
  return href && typeof href === "string" && href.startsWith("/");
}

function RendrLink({
  children,
  href,
  ...props
}: React.HTMLProps<HTMLAnchorElement>) {
  const { push } = useRouter();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const href = e.currentTarget.getAttribute("href");
    if (!opensInNewWindow(e, props.target) && isRelativeHref(href)) {
      e.preventDefault();

      // do not push to history if href is current pathname
      push(href);
    }
  }

  return (
    <a onClick={handleClick} href={href} {...props}>
      {children}
    </a>
  );
}

export default RendrLink;
