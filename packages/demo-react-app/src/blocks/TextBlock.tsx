import Container from "../components/Container";

export interface Props {
  text?: string;
}

function TextBlock(props: Props) {
  if (!props.text) {
    return null;
  }

  return (
    <Container.TextBlock className="pt-32">
      <div dangerouslySetInnerHTML={{ __html: props.text }} />
    </Container.TextBlock>
  );
}

export default TextBlock;
