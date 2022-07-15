export type StepObject = {
  id?: string;
  in?: number;
  out?: number;
};

export type StepType = number | StepObject;

export type StepProp = StepType | StepType[] | undefined;

export type StepId = number | string;
