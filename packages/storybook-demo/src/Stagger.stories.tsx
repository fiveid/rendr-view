import React from "react";
import Stagger from "@rendr-view/stagger";
import clsx from "clsx";

export default {
  title: "Stagger",
  component: Stagger
};

const Button = ({
  onClick,
  label = "Toggle"
}: {
  onClick: () => void;
  label?: string;
}) => (
  <button
    className="font-bold px-6 py-2 bg-orange-300 rounded-sm border border-orange-400"
    onClick={onClick}
  >
    {label}
  </button>
);

export const Test = () => {
  const [isActive, setIsActive] = React.useState(false);
  return (
    <div className="overflow-hidden">
      <div className="mb-6 overflow-hidden">
        <Stagger
          start={isActive}
          step={[
            { id: "title", in: 700, out: 700 },
            { id: "text", in: 700 },
            { id: "world", in: 2000 }
          ]}
        >
          {steps => (
            <div
              className={clsx(
                "bg-slate-900 text-white max-w-screen-md px-6 py-12 transform transition duration-700 overflow-hidden",
                {
                  ["-translate-x-full"]: !steps.started
                }
              )}
            >
              <div
                className={clsx("transition duration-700", {
                  "translate-y-32 opacity-0": steps.unready("title")
                })}
              >
                <h2 className="text-4xl font-bold mb-6">
                  Hello...{" "}
                  <span
                    className={clsx("transition duration-1000", {
                      "opacity-0": steps.unready("world")
                    })}
                  >
                    world!
                  </span>
                </h2>
                <p
                  className={clsx("max-w-screen-sm transition duration-700", {
                    "opacity-0": steps.unready("text")
                  })}
                >
                  Incididunt nulla incididunt qui occaecat mollit ut proident.
                  Ad consectetur ad qui ad culpa consequat. Pariatur veniam
                  consequat et amet duis quis exercitation officia eu sint
                  Lorem.
                </p>
              </div>
            </div>
          )}
        </Stagger>
      </div>
      <Button onClick={() => setIsActive(!isActive)} />
    </div>
  );
};

export const Transition = () => {
  const [isActive, setIsActive] = React.useState(false);
  return (
    <div className="overflow-hidden w-screen h-screen bg-slate-900">
      <Stagger start={isActive} step={{ in: 0, out: 1000 }}>
        {stagger => (
          <div
            className={clsx(
              "w-screen h-screen flex items-center justify-center bg-orange-300 text-black font-heading text-lg uppercase fixed top-0 left-0 transform transition duration-500 ease-in-out",
              {
                "translate-y-full pointer-events-none opacity-0":
                  !stagger.started
              }
            )}
          />
        )}
      </Stagger>
      <div className="fixed top-0 left-0 z-10">
        <Button onClick={() => setIsActive(!isActive)} />
      </div>
    </div>
  );
};
