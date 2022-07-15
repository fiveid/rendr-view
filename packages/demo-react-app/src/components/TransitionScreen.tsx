import clsx from "clsx";
import Stagger from "@rendr-view/stagger";

export interface Props {
  isLoading: boolean;
}

function TransitionScreen({ isLoading }: Props) {
  return (
    <Stagger start={isLoading} step={{ in: 10, out: 1000 }}>
      {stagger =>
        stagger.started ? (
          <div
            className={clsx(
              "w-screen h-screen flex items-center justify-center bg-orange-300 text-black font-heading text-lg uppercase fixed top-0 left-0 z-10 transform transition duration-500 ease-in-out",
              {
                "translate-y-full pointer-events-none opacity-0":
                  stagger.unready(0)
              }
            )}
          />
        ) : (
          <></>
        )
      }
    </Stagger>
  );
}

export default TransitionScreen;
