export interface State {
  steps: boolean[];
  started: boolean;
}

export interface Action {
  type: string;
  index?: number;
  ready?: boolean;
}

export const defaultState: State = {
  steps: [],
  started: false
};

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case "start": {
      return {
        ...state,
        started: true
      };
    }
    case "finish": {
      return {
        ...state,
        started: false
      };
    }
    case "step": {
      const newSteps = [...state.steps];
      if (typeof action.index !== "undefined") {
        newSteps[action.index] = action.ready;
      }
      return {
        ...state,
        steps: newSteps
      };
    }
    default:
      return state;
  }
}
