import React from "react";
import { action } from "@storybook/addon-actions";
import { MdOpenInNew } from "react-icons/md";
import Btn, { HTMLLinkType } from "@rendr-view/btn";
import { Button } from "../shared/components";

export default {
  title: "Btn",
  component: Btn
};

const CustomLink = ({ onClick, ...props }: HTMLLinkType) => (
  <a
    onClick={e => {
      e.preventDefault();
      action("on-click-link")(e);
      onClick(e);
    }}
    {...props}
  />
);

export const ExampleButton = () => (
  <Btn onClick={action("on-click")}>Button</Btn>
);

export const DualPurpose = () => (
  <>
    <Button onClick={action("on-click")}>I am a Button</Button>
    <br />
    <br />
    <Button href="https://github.com/fiveid/rendr-view" target="_blank">
      I am a Link
    </Button>
  </>
);

export const ClassNames = () => (
  <Btn
    onClick={action("on-click")}
    icon={MdOpenInNew}
    clx={{
      button:
        "rounded bg-blue-500 hover:bg-blue-600 border-blue-600 text-white text-lg inline-flex items-center justify-between py-2 px-6 transition duration-1000 group",
      label:
        "font-bold uppercase transition duration-700 transform group-hover:-translate-x-2",
      icon: "ml-6 transition duration-700 transform group-hover:translate-x-2"
    }}
  >
    Button
  </Btn>
);

export const Icon = () => (
  <>
    <Button icon={MdOpenInNew} iconProps={{ size: "1.1em" }}>
      Click me
    </Button>
    <br />
    <br />
    <Button
      icon={MdOpenInNew}
      iconProps={{ size: "1.1em" }}
      clx={{
        button: "flex-row-reverse",
        icon: "!ml-0"
      }}
    >
      Click me (reversed)
    </Button>
  </>
);

export const LinkComponent = () => (
  <Button
    linkComponent={CustomLink}
    href="https://github.com/fiveid/rendr-view"
    target="_blank"
  >
    Click me
  </Button>
);
