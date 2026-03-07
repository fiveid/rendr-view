import React from "react";
import type { Preview } from "@storybook/react-vite";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    a11y: {
      test: "todo"
    }
  },
  decorators: [
    (Story, context) => {
      const isFullscreen = context.parameters.layout === "fullscreen";
      if (isFullscreen) {
        return (
          <div className="font-sans antialiased text-slate-900">
            <Story />
          </div>
        );
      }
      return (
        <div className="min-h-screen bg-slate-50 p-2 md:p-8 font-sans antialiased text-slate-900">
          <Story />
        </div>
      );
    }
  ]
};

export default preview;
