import React from "react";
import Btn, { Props as ButtonProps } from "@rendr-view/btn";
import { action } from "@storybook/addon-actions";
import { generateTypography } from "@rendr-view/text";
import { clxn } from "@rendr-view/with-clxn";

export const Button = (props: ButtonProps) => (
  <Btn
    onClick={action("on-click")}
    {...props}
    clx={clxn<ButtonProps["clx"]>(
      {
        button:
          "rounded bg-orange-500 hover:bg-orange-600 border-orange-600 text-white inline-flex items-center justify-center py-2 px-6 gap-2",
        label: "font-bold"
      },
      props.clx
    )}
  />
);

export const Typography = generateTypography({
  Paragraph: {
    tagName: "p",
    className: "text-gray-500 mb-4"
  },
  Subheading: {
    tagName: "h3",
    className: "text-xl mb-6"
  },
  Display: {
    tagName: "p",
    className: "text-5xl font-bold tracking-wide uppercase"
  }
});
