import React from "react";
import { defaultState, reducer } from "./reducer";
import { StepId, StepObject, StepProp } from "./types";
import { normaliseStepProp } from "./utils";

export interface Props {
  start?: boolean;
  step?: StepProp;
  children(state: {
    started: boolean;
    ready: (id: StepId) => boolean;
    unready: (id: StepId) => boolean;
  }): JSX.Element;
}

function Stagger({ step = 0, start = false, ...props }: Props) {
  const ref = React.useRef(0);
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  const steps = state.steps;
  const started = state.started;

  const sequence = React.useMemo(() => {
    const obj: Record<string | number, StepObject & { i: number }> = {};

    normaliseStepProp(step).forEach((stepObj, i) => {
      const id = stepObj?.id || i;
      obj[id] = { i, ...stepObj };
    });

    return obj;
  }, [step]);

  React.useEffect(() => {
    let tm: NodeJS.Timeout | undefined;
    const storeKeys = Object.keys(sequence);
    const stepList = storeKeys.map(k => sequence[k]);
    const lastIndex = stepList.length - 1;

    function ct(i: number, key: "in" | "out", cb?: () => void) {
      if (i < 0 || i > lastIndex) {
        return cb?.();
      }

      const step = stepList.filter(s => s.i === i)?.[0];
      const nextIndex = key === "in" ? i + 1 : i - 1;

      if (!step) {
        ct(nextIndex, key, cb);
        return;
      }

      const action = {
        type: "step",
        index: i,
        ready: key === "in"
      };

      const duration = step[key] || 0;

      if (action.ready) {
        tm = setTimeout(() => {
          ref.current = i;
          dispatch(action);
          ct(nextIndex, key, cb);
        }, duration);
        return;
      }

      dispatch(action);
      ref.current = i;
      tm = setTimeout(() => {
        ct(nextIndex, key, cb);
      }, duration);
    }

    if (start) {
      dispatch({ type: "start" });
      ct(ref.current, "in", () => {
        ref.current = lastIndex;
      });
    } else if (started) {
      ct(ref.current, "out", () => {
        dispatch({ type: "finish" });
        ref.current = 0;
      });
    }

    return () => {
      if (tm) {
        clearTimeout(tm);
      }
    };
  }, [start, started, sequence]);

  function isReady(id: number | string) {
    let i = id;
    if (typeof id === "string") {
      i = sequence[id].i;
    }
    return !!steps[i as number];
  }

  return props.children({
    started,
    ready: isReady,
    unready: id => !isReady(id)
  });
}

export default Stagger;
