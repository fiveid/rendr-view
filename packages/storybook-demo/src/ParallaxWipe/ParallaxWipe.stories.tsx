import React from "react";
import ParallaxWipe from "@rendr-view/parallaxwipe";
import { Typography } from "../shared/components";

export const Example = () => (
  <div className="w-full">
    <div className="h-screen bg-red-600 flex items-center justify-center text-white">
      <Typography.Display>Scroll</Typography.Display>
    </div>
    <ParallaxWipe width="w-full" parallaxMode="always">
      <div
        className="bg-white w-full h-full flex items-center justify-center"
        style={{
          backgroundSize: "100%",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1458668383970-8ddd3927deed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2934&q=80)"
        }}
      >
        <div className="bg-white border-2 border-black p-8 lg:w-2/3">
          <Typography.Subheading>Parallax Mode: Always</Typography.Subheading>
          <Typography.Paragraph>
            Veniam dolor amet voluptate minim. Nisi consequat velit fugiat
            laborum dolor consequat dolor sunt laborum nulla in velit. Qui enim
            et sint esse. Ut aute ea cillum laboris esse et ut nulla nostrud. Ad
            aliqua magna reprehenderit ea et sunt cupidatat labore. Duis eu
            Lorem nisi veniam fugiat qui ut incididunt aliquip. Nisi aliqua
            pariatur consequat elit nisi consectetur officia commodo voluptate
            Lorem cupidatat irure ut. Elit est ut ullamco veniam aute ad anim
            magna aliqua laboris aute ut. Incididunt est pariatur dolor tempor
            est occaecat id aliqua ea officia et commodo. Consectetur ad veniam
            pariatur est ullamco.
          </Typography.Paragraph>
        </div>
      </div>
    </ParallaxWipe>
    <div className="h-screen bg-red-900" />
    <ParallaxWipe width="w-full" parallaxMode="in">
      <div
        className="bg-white w-full h-full flex items-center justify-center"
        style={{
          backgroundSize: "100%",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1472791108553-c9405341e398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2737&q=80)"
        }}
      >
        <div className="bg-white border-2 border-black p-8 lg:w-2/3">
          <Typography.Subheading>Parallax Mode: In</Typography.Subheading>
          <Typography.Paragraph>
            Veniam dolor amet voluptate minim. Nisi consequat velit fugiat
            laborum dolor consequat dolor sunt laborum nulla in velit. Qui enim
            et sint esse. Ut aute ea cillum laboris esse et ut nulla nostrud. Ad
            aliqua magna reprehenderit ea et sunt cupidatat labore. Duis eu
            Lorem nisi veniam fugiat qui ut incididunt aliquip. Nisi aliqua
            pariatur consequat elit nisi consectetur officia commodo voluptate
            Lorem cupidatat irure ut. Elit est ut ullamco veniam aute ad anim
            magna aliqua laboris aute ut. Incididunt est pariatur dolor tempor
            est occaecat id aliqua ea officia et commodo. Consectetur ad veniam
            pariatur est ullamco.
          </Typography.Paragraph>
        </div>
      </div>
    </ParallaxWipe>
    <div className="h-screen bg-red-200" />
    <ParallaxWipe width="w-full" parallaxMode="out">
      <div
        className="bg-white w-full h-full flex items-center justify-center"
        style={{
          backgroundSize: "100%",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1489493512598-d08130f49bea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2934&q=80)"
        }}
      >
        <div className="bg-white border-2 border-black p-8 lg:w-2/3">
          <Typography.Subheading>Parallax Mode: Out</Typography.Subheading>
          <Typography.Paragraph>
            Veniam dolor amet voluptate minim. Nisi consequat velit fugiat
            laborum dolor consequat dolor sunt laborum nulla in velit. Qui enim
            et sint esse. Ut aute ea cillum laboris esse et ut nulla nostrud. Ad
            aliqua magna reprehenderit ea et sunt cupidatat labore. Duis eu
            Lorem nisi veniam fugiat qui ut incididunt aliquip. Nisi aliqua
            pariatur consequat elit nisi consectetur officia commodo voluptate
            Lorem cupidatat irure ut. Elit est ut ullamco veniam aute ad anim
            magna aliqua laboris aute ut. Incididunt est pariatur dolor tempor
            est occaecat id aliqua ea officia et commodo. Consectetur ad veniam
            pariatur est ullamco.
          </Typography.Paragraph>
        </div>
      </div>
    </ParallaxWipe>
    <div className="h-screen bg-red-800" />
    <div className="h-screen bg-red-500" />
  </div>
);
