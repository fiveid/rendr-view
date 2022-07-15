import React from "react";
import Text, { generateTypography } from "@rendr-view/text";

export default {
  title: "Text",
  component: Text
};

const TypeSet = generateTypography(
  {
    Paragraph: { tagName: "p", className: "text-sm leading-relaxed mb-4" },
    Title: { tagName: "h1", className: "text-6xl font-bold mb-12" },
    Heading: { tagName: "h2", className: "text-3xl font-bold mb-6" },
    Subheading: { tagName: "h3", className: "text-lg font-bold mb-4" },
    Intro: { tagName: "p", className: "text-lg mb-4" }
  },
  "font-serif"
);

export const BasicText = () => <Text>This is some text</Text>;

export const ExampleSet = () => (
  <div>
    <TypeSet.Title>This is my title</TypeSet.Title>
    <TypeSet.Heading>This is a subheading</TypeSet.Heading>
    <TypeSet.Intro>
      Commodo exercitation eiusmod incididunt ipsum do. Magna ex anim veniam
      duis pariatur do consectetur ipsum nisi magna Lorem aute. Sint voluptate
      anim duis nostrud ullamco aliquip enim.
    </TypeSet.Intro>
    <TypeSet.Paragraph>
      Proident do quis voluptate id quis non. Irure aliqua Lorem amet tempor do
      ullamco consequat proident consequat tempor. Et ipsum mollit officia est
      dolore. Ea veniam irure irure nisi pariatur ipsum consequat est aliqua
      dolore Lorem. Nulla voluptate proident exercitation Lorem voluptate. Ex
      laboris est non eiusmod est minim veniam est. Consectetur minim anim
      fugiat exercitation. Cillum duis proident sit deserunt Lorem dolor non
      labore veniam culpa incididunt culpa sunt fugiat.
    </TypeSet.Paragraph>
    <TypeSet.Subheading>
      Irure fugiat irure irure ipsum dolor et ipsum dolor enim amet commodo
      cupidatat nostrud.
    </TypeSet.Subheading>
    <TypeSet.Paragraph>
      Incididunt qui adipisicing officia officia consectetur fugiat occaecat non
      in id amet dolore. Aliquip magna consequat dolor consectetur adipisicing
      nulla laborum dolore adipisicing fugiat. Esse culpa esse ipsum laboris
      voluptate. Tempor voluptate in officia est consequat deserunt anim commodo
      ut amet ex amet. Dolor excepteur ullamco deserunt ut esse proident
      pariatur enim. Non excepteur laborum incididunt dolor magna cillum quis
      proident qui non.
    </TypeSet.Paragraph>
  </div>
);
