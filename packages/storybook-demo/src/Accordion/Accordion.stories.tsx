import React from "react";
import Accordion from "@rendr-view/accordion";
import { Button, Typography } from "../shared/components";

export default {
  title: "Accordion",
  component: Accordion
};

export const Default = () => {
  const [isOpened, setIsOpened] = React.useState(false);
  const [showMore, setShowMore] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpened(!isOpened)}>Toggle accordion</Button>
      <Accordion opened={isOpened}>
        <div className="p-6">
          <Typography.Subheading>Subheading</Typography.Subheading>
          <Typography.Paragraph>
            Aute nisi nostrud esse proident nulla minim laborum. Proident culpa
            culpa occaecat exercitation duis enim consectetur nostrud aute
            magna. Quis in qui occaecat consectetur ad velit tempor. Aute velit
            aliquip elit anim quis proident amet ex consectetur velit veniam
            nostrud consectetur. Est culpa Lorem incididunt do reprehenderit et
            est. Est eiusmod fugiat proident dolor anim minim eu esse officia
            enim minim exercitation ea exercitation. Dolor consectetur esse
            proident occaecat aliquip.
          </Typography.Paragraph>
          {showMore ? (
            <Typography.Paragraph>
              Nostrud quis sint Lorem qui. Id amet exercitation Lorem proident.
              Aute exercitation in nostrud excepteur pariatur qui id anim Lorem
              consectetur elit ex. Ullamco laboris labore eiusmod elit magna
              ullamco ut sunt magna irure. Magna sint eu esse commodo dolore
              consectetur anim deserunt.
            </Typography.Paragraph>
          ) : null}
          <Button onClick={() => setShowMore(!showMore)}>
            Toggle show more
          </Button>
        </div>
      </Accordion>
      <div className="w-full border-t border-slate-300 mt-4" />
    </div>
  );
};
