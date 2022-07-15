import React from "react";

const components = {
  headernav: React.lazy(() => import("../blocks/HeaderNav")),
  hero: React.lazy(() => import("../blocks/Hero")),
  text: React.lazy(() => import("../blocks/TextBlock")),
  cards: React.lazy(() => import("../blocks/Cards"))
};

export default components;
