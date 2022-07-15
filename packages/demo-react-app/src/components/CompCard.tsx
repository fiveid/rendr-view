import Card, {
  CardParagraph,
  CardSectionProps,
  CardTitle
} from "@rendr-view/card";
import { MdOpenInNew } from "react-icons/md";

export interface Props {
  title: string;
  text: string;
  link?: string;
}

const StoryLink = (props: CardSectionProps) =>
  props.buttons?.[0]?.href ? (
    <div className="border-t border-zinc-500 mt-6 pt-3 text-sm">
      <a
        className="text-orange-800 hover:text-orange-700 transition duration-700 font-bold flex justify-between items-center"
        href={props.buttons?.[0]?.href}
        target="_blank"
        rel="noreferrer"
      >
        <span>Open in Storybook</span>
        <MdOpenInNew size="1.25em" />
      </a>
    </div>
  ) : null;

const classNames = {
  card: "border-2 border-zinc-900",
  content: "p-4 h-full flex flex-col",
  paragraph: "h-full",
  title: "text-xl font-bold mb-4 block",
  buttons: "border-t border-zinc-500 mt-6 pt-3 text-sm",
  button: "text-orange-800 font-bold"
};

const structure = [CardTitle, CardParagraph, StoryLink];

const CompCard = (props: Props) => (
  <Card
    clx={classNames}
    title={props.title}
    text={props.text}
    buttons={[{ href: props.link }]}
    structure={structure}
  />
);

export default CompCard;
