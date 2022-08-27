import React from "react";
import { action } from "@storybook/addon-actions";
import { MdOpenInNew } from "react-icons/md";
import Btn, { HTMLLinkType } from "@rendr-view/btn";
import { Button } from "../shared/components";

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
  <Btn
    onClick={action("on-click")}
    clx={{
      button:
        "rounded bg-orange-500 hover:bg-orange-600 border-orange-600 text-white inline-flex items-center justify-center py-2 px-6",
      label: "font-bold",
      icon: "ml-2"
    }}
  >
    Button
  </Btn>
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
        "rounded bg-blue-500 hover:bg-blue-600 border-blue-600 text-white text-lg inline-flex items-center justify-between py-4 px-10 transition duration-1000 group",
      label:
        "font-bold uppercase transition duration-700 transform group-hover:-translate-x-4",
      icon: "ml-6 transition duration-700 transform group-hover:translate-x-4"
    }}
  >
    Button
  </Btn>
);

export const Icon = () => (
  <Button icon={MdOpenInNew} iconProps={{ size: "1.1em" }}>
    Click me
  </Button>
);

export const LinkComponent = () => (
  <Button linkComponent={CustomLink} href="#page-1">
    Click me
  </Button>
);
