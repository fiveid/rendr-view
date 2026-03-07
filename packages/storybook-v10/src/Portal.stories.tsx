import { useState } from "react";
import Portal from "@rendr-view/portal";
import Btn from "@rendr-view/btn";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "@storybook/addon-actions";
import { StoryStage } from "./theme";

/**
 * `Portal` provides a way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.
 * This is commonly used for modals, tooltips, and floating menus.
 */
const meta = {
  title: "Components/Portal",
  component: Portal,
  argTypes: {
    className: {
      control: "text",
      description: "Class name applied to the portal container element",
      defaultValue: "root-portal"
    },
    el: {
      control: "text",
      description: "The type of DOM element to create for the portal container",
      defaultValue: "div"
    },
    id: {
      control: "text",
      description: "Optional ID for the portal container"
    }
  }
} satisfies Meta<typeof Portal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Modal: Story = {
  args: {
    children: null
  },
  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
      setIsOpen(false);
      action("portal-closed")();
    };

    return (
      <StoryStage
        title="Portal Demo"
        description="The modal below is rendered using a Portal. It breaks out of the dashed container and attaches itself directly to the document body."
      >
        <div className="p-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-center">
          <Btn onClick={handleOpen}>Open Portal Modal</Btn>

          {isOpen && (
            <Portal {...args}>
              <div
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={handleClose}
              >
                <div
                  className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full transform animate-in zoom-in-95 duration-300"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">
                      Portal Success
                    </h4>
                    <p className="text-slate-500 mb-6 font-medium">
                      This content is being rendered outside of the main
                      application tree!
                    </p>
                    <Btn
                      onClick={handleClose}
                      clx={{ button: "w-full justify-center" }}
                    >
                      Close Modal
                    </Btn>
                  </div>
                </div>
              </div>
            </Portal>
          )}
        </div>
      </StoryStage>
    );
  }
};
