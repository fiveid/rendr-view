import React from "react";
import { action } from "@storybook/addon-actions";
import { MdOpenInNew } from "react-icons/md";
import Btn, { Props as ButtonProps, HTMLLinkType } from "@rendr-view/btn";
import { Button } from "../shared/components";
import { clxn } from "@rendr-view/with-clxn";

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

export const ClassNames = () => {
  const baseClassNames = {
    button:
      "rounded text-lg inline-flex items-center justify-between py-2 px-6 transition duration-1000 group gap-6 text-white",
    label:
      "font-bold uppercase transition duration-700 transform group-hover:-translate-x-2",
    icon: "transition duration-700 transform group-hover:translate-x-2"
  };
  return (
    <>
      <Btn
        onClick={action("on-click")}
        icon={MdOpenInNew}
        clx={clxn<ButtonProps["clx"]>(baseClassNames, {
          button: "bg-blue-500 hover:bg-blue-600 border-blue-600"
        })}
      >
        Primary Button
      </Btn>
      <br />
      <br />
      <Btn
        onClick={action("on-click")}
        icon={MdOpenInNew}
        clx={clxn<ButtonProps["clx"]>(baseClassNames, {
          button: "bg-green-600 hover:bg-green-700 border-green-700"
        })}
      >
        Secondary Button
      </Btn>
      <br />
      <br />
      <Btn
        onClick={action("on-click")}
        icon={MdOpenInNew}
        clx={clxn<ButtonProps["clx"]>(baseClassNames, {
          button: "bg-red-500 hover:bg-red-600 border-red-600"
        })}
      >
        Warning Button
      </Btn>
    </>
  );
};

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
