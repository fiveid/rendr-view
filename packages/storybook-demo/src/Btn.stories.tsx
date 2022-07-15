import React from "react";
import { action } from "@storybook/addon-actions";
import { MdOpenInNew } from "react-icons/md";
import Btn, { HTMLLinkType } from "@rendr-view/btn";
import { Button } from "./shared/components";

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

export const DualPurpose = () => (
  <>
    <Btn onClick={action("on-click")}>Button</Btn>
    <br />
    <Btn href="#on-click">Link</Btn>
  </>
);

export const ClassNames = () => (
  <Btn
    onClick={action("on-click")}
    clx={{
      button:
        "rounded bg-orange-500 hover:bg-orange-600 border-orange-600 text-white inline-flex items-center justify-center py-2 px-6",
      label: "font-bold"
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
