import withClxn from "@rendr-view/with-clxn";
import type { Meta, StoryObj } from "@storybook/react-vite";
import clsx from "clsx";
import { StoryStage, themeClx } from "./theme";

/**
 * `withClxn` is a Higher-Order Component (HOC) that provides a standard way to
 * manage and override multiple class names within a component using a `clx` prop.
 */
const meta = {
  title: "Experimental/HOCs/withClxn"
} satisfies Meta;

export default meta;
type Story = StoryObj;

interface MyComponentProps {
  title: string;
  description: string;
  type?: "primary" | "secondary";
  clx?: {
    container?: string;
    header?: string;
    body?: string;
    title?: string;
    text?: string;
  };
}

const MyComponentBase = ({ title, description, clx }: MyComponentProps) => (
  <div className={clx?.container}>
    <div className={clx?.header}>
      <h4 className={clx?.title}>{title}</h4>
    </div>
    <div className={clx?.body}>
      <p className={clx?.text}>{description}</p>
    </div>
  </div>
);

// Define a styled version with brand defaults
const StyledComponent = withClxn(MyComponentBase, {
  container: themeClx.well + " max-w-md shadow-xl",
  header: "bg-indigo-600 px-8 py-6",
  title: "text-2xl font-black text-white uppercase tracking-tight",
  body: "p-8",
  text: themeClx.typography.body
});

// Define a version that changes based on props
const DynamicComponent = withClxn<MyComponentProps>(MyComponentBase, props => ({
  container: clsx(
    "max-w-md rounded-2xl p-8 border-2 transition-all duration-300",
    props?.type === "secondary"
      ? "bg-slate-900 border-indigo-500 text-white"
      : "bg-white border-slate-200 text-slate-900 shadow-sm"
  ),
  title: "text-xl font-bold mb-2",
  text: clsx(
    "text-sm",
    props?.type === "secondary" ? "text-slate-400" : "text-slate-500"
  )
}));

export const Default: Story = {
  render: () => (
    <div className="space-y-12 max-w-4xl mx-auto">
      <StoryStage
        title="Default Styled HOC"
        description="This component is wrapped with default brand styles using the withClxn HOC."
      >
        <StyledComponent
          title="Component Feature"
          description="The withClxn HOC injects these brand-consistent classes automatically, providing a premium look out of the box."
        />
      </StoryStage>

      <StoryStage
        title="Dynamic Prop Logic"
        description="The HOC can also handle complex conditional styling based on component props."
      >
        <div className="flex flex-wrap gap-8">
          <DynamicComponent
            type="primary"
            title="Light Mode"
            description="The HOC uses a function to determine classes based on the 'type' prop."
          />
          <DynamicComponent
            type="secondary"
            title="Dark Mode"
            description="Switching to 'secondary' toggles all nested classes automatically via the HOC logic."
          />
        </div>
      </StoryStage>

      <StoryStage
        title="Instance Level Overrides"
        description="Components created via withClxn still accept a 'clx' prop for granular instance-level customization."
      >
        <StyledComponent
          title="Customized Instance"
          description="Even with defaults, individual instances can override specific parts of the style object while keeping the rest."
          clx={{
            header: "bg-rose-500",
            container: "border-rose-200"
          }}
        />
      </StoryStage>
    </div>
  )
};
