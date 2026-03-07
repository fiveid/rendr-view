import clsx from "clsx";
import GTMContext, { GTMHandler } from "@rendr-view/gtm-context";
import Btn from "@rendr-view/btn";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "@storybook/addon-actions";
import { StoryStage, themeClx } from "./theme";

/**
 * `GTMContext` and `GTMHandler` provide a way to manage Google Tag Manager events throughout your application.
 * You can push events manually via context or capture clicks automatically using data attributes.
 */
const meta = {
  title: "Utilities/GTMContext",
  component: GTMHandler,
  argTypes: {
    captureClicks: {
      control: "boolean",
      description:
        "Automatically capture clicks on elements with data-event attributes"
    },
    event: {
      control: "object",
      description: "Default event data to be merged with all pushed events"
    }
  }
} satisfies Meta<typeof GTMHandler>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    mockPushHandler: action("gtm-push"),
    event: { page: "storybook-v10" },
    children: null
  },
  render: args => (
    <GTMHandler {...args}>
      <StoryStage
        title="Manual Event Push"
        description="This example uses the GTMContext.Consumer to get the push function and trigger an event manually."
      >
        <div className="text-center py-4">
          <GTMContext.Consumer>
            {({ push }) => (
              <Btn
                clx={{ button: clsx(themeClx.button.primary, "mx-auto") }}
                onClick={() =>
                  push({
                    event: "interaction",
                    category: "button-click",
                    label: "Manual Push"
                  })
                }
              >
                Push GTM Event
              </Btn>
            )}
          </GTMContext.Consumer>

          <p className="mt-8 text-xs text-slate-400 font-mono italic text-center">
            Check the "Actions" tab to see the event payload
          </p>
        </div>
      </StoryStage>
    </GTMHandler>
  )
};

export const CaptureClicks: Story = {
  args: {
    captureClicks: true,
    mockPushHandler: action("gtm-click-capture"),
    event: { page: "autotrack-demo" },
    children: null
  },
  render: args => (
    <GTMHandler {...args}>
      <div className="p-8 grid md:grid-cols-2 gap-6 bg-white border border-slate-200 rounded-3xl">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Auto-tracking Buttons</h3>
          <p className="text-sm text-slate-500">
            These buttons don't have explicit `onClick` handlers for GTM. The
            `GTMHandler` captures clicks and extracts data from attributes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Btn
              clx={{ button: themeClx.button.primary }}
              data-event-type="click"
              data-event-category="navigation"
              data-event-label="Primary CTA"
            >
              Primary CTA
            </Btn>
            <Btn
              data-event-type="click"
              data-event-category="interaction"
              data-event-label="Secondary CTA"
              clx={{ button: themeClx.button.secondary }}
            >
              Secondary CTA
            </Btn>
          </div>
        </div>

        <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 space-y-4">
          <h4 className="font-bold text-amber-900 italic">
            data-event-disable
          </h4>
          <p className="text-sm text-amber-800">
            You can disable tracking for specific elements even when
            `captureClicks` is on.
          </p>
          <Btn
            data-event-type="click"
            data-event-category="oops"
            data-event-label="Hidden"
            data-event-disable
            clx={{
              button: clsx(
                themeClx.button.primary,
                "bg-amber-500 hover:bg-amber-600"
              )
            }}
          >
            I won't trigger GTM
          </Btn>
        </div>
      </div>
    </GTMHandler>
  )
};

export const NestedHandlers: Story = {
  args: {
    captureClicks: true,
    mockPushHandler: action("gtm-nested-push"),
    event: { page: "rendr-view-demo", context: "storybook" },
    children: null
  },
  render: args => (
    <GTMHandler {...args}>
      <div className="p-8 space-y-8 bg-slate-900 rounded-3xl text-white">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-black italic">NESTED CONTEXT</h3>
          <p className="text-slate-400">
            Default props: page="rendr-view-demo", context="storybook"
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Section A */}
          <GTMHandler captureClicks event={{ category: "Header" }}>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                Section A
              </span>
              <p className="text-sm text-slate-400">
                Events here inherit "Header" and "Dark" props.
              </p>
              <Btn
                data-event-type="click"
                data-event-category="ui"
                data-event-label="Header Button"
                clx={{
                  button: clsx(themeClx.button.primary, "w-full justify-center")
                }}
              >
                Track A
              </Btn>
            </div>
          </GTMHandler>

          {/* Section B */}
          <GTMHandler captureClicks event={{ category: "Footer" }}>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                Section B
              </span>
              <p className="text-sm text-slate-400">
                Events here inherit "Footer" and "Light" props.
              </p>
              <Btn
                data-event-type="click"
                data-event-category="ui"
                data-event-label="Footer Button"
                clx={{
                  button: clsx(
                    themeClx.button.primary,
                    "w-full justify-center bg-purple-600 hover:bg-purple-700"
                  )
                }}
              >
                Track B
              </Btn>
            </div>
          </GTMHandler>
        </div>
      </div>
    </GTMHandler>
  )
};

export const CustomParser: Story = {
  args: {
    captureClicks: true,
    mockPushHandler: action("gtm-custom-parser"),
    elementEventParser: el => ({
      timestamp: Date.now(),
      v: el.dataset.customValue,
      tagName: el.tagName
    }),
    children: null
  },
  render: args => (
    <GTMHandler {...args}>
      <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-3xl space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-emerald-900">
            Custom Attribute Parsing
          </h3>
          <p className="text-emerald-700">
            Use `elementEventParser` to extract non-standard data attributes or
            other metadata from the clicked element.
          </p>
        </div>

        <div className="flex gap-4">
          <Btn
            data-event-type="click"
            data-event-category="custom"
            data-custom-value="Alpha-123"
            clx={{
              button: clsx(
                themeClx.button.primary,
                "bg-emerald-600 hover:bg-emerald-700"
              )
            }}
          >
            Value: Alpha-123
          </Btn>
          <Btn
            data-event-type="click"
            data-event-category="custom"
            data-custom-value="Beta-456"
            clx={{ button: themeClx.button.secondary }}
          >
            Value: Beta-456
          </Btn>
        </div>
      </div>
    </GTMHandler>
  )
};
