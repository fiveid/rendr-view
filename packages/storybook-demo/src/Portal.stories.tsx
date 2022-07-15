import React from "react";
import Portal from "@rendr-view/portal";
import { Button, Typography } from "./shared/components";

export default {
  title: "Portal",
  component: Portal
};

const ModalContent = ({
  isVisible,
  onClose
}: {
  isVisible: boolean;
  onClose: () => void;
}) =>
  isVisible ? (
    <div
      onClick={onClose}
      className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80"
    >
      <span className="text-6xl text-orange-100 leading-wider font-bold uppercase">
        Click to close
      </span>
    </div>
  ) : (
    <></>
  );

export const Example = () => {
  const [show, setShow] = React.useState(false);

  return (
    <div>
      <Typography.Paragraph>
        Click button to open modal in Portal
      </Typography.Paragraph>
      <Button onClick={() => setShow(true)} />
      <Portal>
        <ModalContent isVisible={show} onClose={() => setShow(false)} />
      </Portal>
    </div>
  );
};
