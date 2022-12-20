import { isBooleanControl, rankWith, optionIs, and } from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";
import LabelRenderer from "../renderers/common/LabelRenderer";
import TailwindToggleRenderer from "../renderers/TailwindToggleRenderer";

const TailwindBooleanToggle = (props) => {
  return (
    <>
      {props.visible && (
        <div className="flex flex-row mt-4 h-[30px] items-center border border-slate-200 rounded mb-2 bg-white shadow focus:shadow-md grow mx-1">
          <TailwindToggleRenderer {...props} />
          {props.label?.length > 0 && <LabelRenderer {...props} fontSize="12px" />}
        </div>
      )}
    </>
  );
};

export const tailwindBooleanToggleControlTester = rankWith(1003, and(isBooleanControl, optionIs("toggle", true)));

export const TailwindBooleanToggleControl = withJsonFormsControlProps(TailwindBooleanToggle);
