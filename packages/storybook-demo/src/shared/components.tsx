import React from "react";
import Btn, { Props as ButtonProps } from "@rendr-view/btn";
import { action } from "@storybook/addon-actions";
import { generateTypography } from "@rendr-view/text";

export const Button = (props: ButtonProps) => (
  <Btn
    onClick={action("on-click")}
    clx={{
      button:
        "rounded bg-orange-500 hover:bg-orange-600 border-orange-600 text-white inline-flex items-center justify-center py-2 px-6",
      label: "font-bold",
      icon: "ml-2"
    }}
    {...props}
  />
);

export const Typography = generateTypography({
  Paragraph: {
    tagName: "p",
    className: "text-gray-500 mb-4"
  },
  Subheading: {
    tagName: "h3",
    className: "text-xl"
  }
});
