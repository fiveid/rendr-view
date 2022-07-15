import React from "react";

type PresetLoader = (preset: string, props: any) => any;

export interface Props {
  preset: string;
}

export interface WithPresetOptions {
  delimiter?: string;
}

const DEFAULT_OPTIONS = {
  delimiter: " "
};

function splitPresetString(preset: string, delimiter = " "): string[] {
  return preset
    .split(delimiter)
    .map(str => str.trim())
    .filter(str => !!str);
}

function modifyPropsForPreset(
  presetLoader: PresetLoader,
  preset: string,
  props: any,
  options: WithPresetOptions
) {
  if (!preset || !presetLoader) {
    return props;
  }

  const presetArray = splitPresetString(preset, options.delimiter);

  return presetArray.reduce((prevProps, currentPreset) => {
    return presetLoader(currentPreset, prevProps);
  }, props);
}

function withPreset<T>(
  Component: any,
  presetLoader: PresetLoader,
  options: WithPresetOptions = DEFAULT_OPTIONS
): React.FunctionComponent<T & Props> {
  return ({ preset, ...props }: T & Props) => {
    return (
      <Component
        {...modifyPropsForPreset(presetLoader, preset, props, options)}
      ></Component>
    );
  };
}

export default withPreset;
