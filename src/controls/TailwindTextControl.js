import { isStringControl, rankWith } from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";
import TailwindInputText from "../renderers/TailwindInputText";

export const tailwindTextControlTester = rankWith(1001, isStringControl);

export const TailwindTextControl = withJsonFormsControlProps(TailwindInputText);
