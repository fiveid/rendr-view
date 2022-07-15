import { RendrLink } from "@rendr-view/rendr-router";

interface NavLink {
  label: string;
  link: string;
}

export interface Props {
  items: NavLink[];
}

function HeaderNav(props: Props) {
  return (
    <div className="absolute top-0 right-0 w-full flex justify-end gap-6 text-white p-6 z-10">
      {props.items?.map((link, i) => (
        <span className="" key={`${link.link}_${i}`}>
          <RendrLink href={link.link}>{link.label}</RendrLink>
        </span>
      ))}
    </div>
  );
}

export default HeaderNav;
