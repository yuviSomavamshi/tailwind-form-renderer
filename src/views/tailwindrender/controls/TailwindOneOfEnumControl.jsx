import { isOneOfEnumControl, rankWith } from "@jsonforms/core";
import { withJsonFormsOneOfEnumProps } from "@jsonforms/react";
import TailwindAutocompleteRenderer from "../renderers/TailwindAutocompleteRenderer";
import TailwindSelectRenderer from "../renderers/TailwindSelectRenderer";
import { TailwindInputControl } from "./TailwindInputControl";
import { merge } from "lodash";

export const TailwindOneOfEnum = (props) => {
  const { config, uischema } = props;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  return (
    <TailwindInputControl {...props} input={appliedUiSchemaOptions.autocomplete === false ? TailwindSelectRenderer : TailwindAutocompleteRenderer} />
  );
};

export const tailwindOneOfEnumControlTester = rankWith(1005, isOneOfEnumControl);

export const TailwindOneOfEnumControl = withJsonFormsOneOfEnumProps(TailwindOneOfEnum);
