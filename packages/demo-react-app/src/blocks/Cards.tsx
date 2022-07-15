import CompCard from "../components/CompCard";
import Container from "../components/Container";

export interface ItemProps {
  title: string;
  text: string;
  link?: string;
}

export interface Props {
  items?: ItemProps[];
}

function Cards(props: Props) {
  if (!props.items?.length) {
    return null;
  }
  return (
    <Container.WideBlock>
      <div className="grid grid-cols-3 gap-6">
        {props.items.map((item, i) => (
          <CompCard key={i} {...item} />
        ))}
      </div>
    </Container.WideBlock>
  );
}

export default Cards;
