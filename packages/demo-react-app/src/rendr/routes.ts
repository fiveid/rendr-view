import { RendrCtx, Page } from "@ekino/rendr-core";

const mockPromise = (value: Page, delay: number): Promise<Page> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value);
    }, delay);
  });
};

const routes = {
  "(/|)": async (ctx: RendrCtx, page: Page) => {
    page.blocks.push(
      {
        container: "header",
        id: "0",
        order: 0,
        type: "headernav",
        meta: {},
        settings: {
          items: [
            { label: "Home", link: "/" },
            { label: "Test", link: "/test" }
          ]
        }
      },
      {
        container: "body",
        id: "1",
        order: 0,
        type: "hero",
        meta: {},
        settings: {
          title: "Rendr View"
        }
      },
      {
        container: "body",
        id: "2",
        order: 0,
        type: "text",
        meta: {},
        settings: {
          text: "<p>Culpa labore consectetur mollit aliqua do nisi fugiat quis. Cillum non minim in ipsum non quis excepteur sit exercitation incididunt. Id ad nulla sint aliqua aliquip excepteur do ut nulla voluptate voluptate. Ullamco cupidatat ea elit reprehenderit. Pariatur deserunt nisi pariatur amet ea non quis incididunt commodo id exercitation. Anim qui anim exercitation ad fugiat mollit tempor. Ut labore ex minim culpa ad nulla ad enim laborum esse.</p><p>Id consequat amet sunt do reprehenderit est. Ad magna aute aute ut. Consectetur ullamco ipsum sit esse id sunt fugiat esse ullamco commodo. Quis dolor officia nulla est tempor et est cillum. In cillum consectetur labore eu.</p><p>Laborum laboris velit velit culpa. Deserunt cillum consequat id excepteur ea aliqua commodo. Reprehenderit ut pariatur est nulla mollit aliqua labore laboris elit deserunt. Excepteur cillum occaecat culpa aliqua dolore adipisicing eu. Eiusmod consequat pariatur ea reprehenderit deserunt anim mollit consequat ad ea ut.</p>"
        }
      },
      {
        container: "body",
        id: "3",
        order: 0,
        type: "cards",
        meta: {},
        settings: {
          items: [
            {
              title: "Rendr Router",
              text: "Nostrud dolore magna aute eu labore culpa velit quis. Minim ipsum aliquip ad cillum deserunt sit.",
              link: "#"
            },
            {
              title: "Card",
              text: "Nostrud dolore magna aute eu labore culpa velit quis. Minim ipsum aliquip ad cillum deserunt sit.",
              link: "#"
            },
            {
              title: "Btn",
              text: "Nostrud dolore magna aute eu labore culpa velit quis. Minim ipsum aliquip ad cillum deserunt sit.",
              link: "#"
            },
            {
              title: "GTM Context",
              text: "Nostrud dolore magna aute eu labore culpa velit quis. Minim ipsum aliquip ad cillum deserunt sit. Dolor deserunt in proident tempor duis non enim ullamco ullamco.",
              link: "#"
            },
            {
              title: "Portal",
              text: "Nostrud dolore magna aute eu labore culpa velit quis. Minim ipsum aliquip ad cillum deserunt sit.",
              link: "#"
            },
            {
              title: "Rendr Block",
              text: "Nostrud dolore magna aute eu labore culpa velit quis. Minim ipsum aliquip ad cillum deserunt sit.",
              link: "#"
            },
            {
              title: "Text",
              text: "Nostrud dolore magna aute eu labore culpa velit quis. Minim ipsum aliquip ad cillum deserunt sit.",
              link: "#"
            },
            {
              title: "Stagger",
              text: "Nostrud dolore magna aute eu labore culpa velit quis. Minim ipsum aliquip ad cillum deserunt sit.",
              link: "#"
            },
            {
              title: "Use Fill Available",
              text: "Nostrud dolore magna aute eu labore culpa velit quis. Minim ipsum aliquip ad cillum deserunt sit.",
              link: "#"
            },
            {
              title: "Use Outside Alerter",
              text: "Nostrud dolore magna aute eu labore culpa velit quis. Minim ipsum aliquip ad cillum deserunt sit.",
              link: "#"
            },
            {
              title: "Use Scrollsnap Controls",
              text: "Nostrud dolore magna aute eu labore culpa velit quis. Minim ipsum aliquip ad cillum deserunt sit.",
              link: "#"
            },
            {
              title: "With Clxn",
              text: "Nostrud dolore magna aute eu labore culpa velit quis. Minim ipsum aliquip ad cillum deserunt sit.",
              link: "#"
            },
            {
              title: "With Preset",
              text: "Nostrud dolore magna aute eu labore culpa velit quis. Minim ipsum aliquip ad cillum deserunt sit.",
              link: "#"
            }
          ]
        }
      },
      {
        container: "body",
        id: "4",
        order: 0,
        type: "text",
        meta: {},
        settings: {
          text: "<p>Culpa labore consectetur mollit aliqua do nisi fugiat quis. Cillum non minim in ipsum non quis excepteur sit exercitation incididunt. Id ad nulla sint aliqua aliquip excepteur do ut nulla voluptate voluptate. Ullamco cupidatat ea elit reprehenderit. Pariatur deserunt nisi pariatur amet ea non quis incididunt commodo id exercitation. Anim qui anim exercitation ad fugiat mollit tempor. Ut labore ex minim culpa ad nulla ad enim laborum esse.</p><p>Id consequat amet sunt do reprehenderit est. Ad magna aute aute ut. Consectetur ullamco ipsum sit esse id sunt fugiat esse ullamco commodo. Quis dolor officia nulla est tempor et est cillum. In cillum consectetur labore eu.</p><p>Laborum laboris velit velit culpa. Deserunt cillum consequat id excepteur ea aliqua commodo. Reprehenderit ut pariatur est nulla mollit aliqua labore laboris elit deserunt. Excepteur cillum occaecat culpa aliqua dolore adipisicing eu. Eiusmod consequat pariatur ea reprehenderit deserunt anim mollit consequat ad ea ut.</p><p>Culpa labore consectetur mollit aliqua do nisi fugiat quis. Cillum non minim in ipsum non quis excepteur sit exercitation incididunt. Id ad nulla sint aliqua aliquip excepteur do ut nulla voluptate voluptate. Ullamco cupidatat ea elit reprehenderit. Pariatur deserunt nisi pariatur amet ea non quis incididunt commodo id exercitation. Anim qui anim exercitation ad fugiat mollit tempor. Ut labore ex minim culpa ad nulla ad enim laborum esse.</p><p>Id consequat amet sunt do reprehenderit est. Ad magna aute aute ut. Consectetur ullamco ipsum sit esse id sunt fugiat esse ullamco commodo. Quis dolor officia nulla est tempor et est cillum. In cillum consectetur labore eu.</p><p>Laborum laboris velit velit culpa. Deserunt cillum consequat id excepteur ea aliqua commodo. Reprehenderit ut pariatur est nulla mollit aliqua labore laboris elit deserunt. Excepteur cillum occaecat culpa aliqua dolore adipisicing eu. Eiusmod consequat pariatur ea reprehenderit deserunt anim mollit consequat ad ea ut.</p>"
        }
      }
    );

    return mockPromise(page, 700);
  },
  "/test": (ctx: RendrCtx, page: Page) => {
    page.blocks.push(
      {
        container: "header",
        id: "0",
        order: 0,
        type: "headernav",
        meta: {},
        settings: {
          items: [
            { label: "Home", link: "/" },
            { label: "Test", link: "/test" }
          ]
        }
      },
      {
        container: "body",
        id: "1",
        order: 0,
        type: "hero",
        meta: {},
        settings: {
          title: "Test page"
        }
      }
    );

    return mockPromise(page, 700);
  }
};

export default routes;
