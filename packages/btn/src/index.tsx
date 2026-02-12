import React from "react";
import clsx from "clsx";
import { type IconBaseProps } from "react-icons";
import withClxn, {
  type PropsWithClxnObject,
  type ClxnObject
} from "@rendr-view/with-clxn";

export type HTMLButtonType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export type HTMLLinkType = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;
export type IconProps = IconBaseProps;
export type ButtonProps = HTMLButtonType &
  HTMLLinkType &
  React.DataHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>;

export type ClassNamesList = {
  button?: string;
  enabled?: string;
  disabled?: string;
  label?: string;
  icon?: string;
};

export interface Props extends ButtonProps, React.AriaAttributes {
  clx?: ClxnObject<ClassNamesList>;
  icon?: React.ComponentType<IconBaseProps>;
  buttonComponent?: React.ComponentType<HTMLButtonType> | "button";
  linkComponent?: React.ComponentType<HTMLLinkType> | "a";
  iconProps?: IconBaseProps;
}

export function Btn({
  className,
  clx,
  icon,
  iconProps,
  children,
  buttonComponent = "button",
  linkComponent = "a",
  ...props
}: PropsWithClxnObject<Props, ClassNamesList>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Wrapper: any = !!props.href ? linkComponent : buttonComponent;

  function renderIcon() {
    if (!icon) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = icon as any;
    return (
      <IconComponent {...iconProps} className={clsx("Btn__icon", clx?.icon)} />
    );
  }

  return (
    <Wrapper
      {...props}
      className={clsx(
        "Btn",
        className,
        clx?.button,
        props.disabled ? clx?.disabled : clx?.enabled
      )}
    >
      <span className={clsx("Btn__label", clx?.label)}>{children}</span>
      {renderIcon()}
    </Wrapper>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default withClxn<Omit<Props, "clx">, ClassNamesList>(Btn, {});
