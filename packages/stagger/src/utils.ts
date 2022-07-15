import { StepObject, StepProp, StepType } from "./types";

export function normaliseStepType(step?: StepType): StepObject {
  switch (typeof step) {
    case "undefined":
      return {};
    case "number":
      return {
        in: step,
        out: step
      };
    case "object": {
      if (Array.isArray(step)) {
        return {};
      }
    }
    default:
      return step;
  }
}

export function normaliseStepProp(step: StepProp): StepObject[] {
  if (Array.isArray(step)) {
    return step.map(normaliseStepType);
  }

  return [normaliseStepType(step)];
}
