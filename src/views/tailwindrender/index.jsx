import { JsonForms } from "@jsonforms/react";
import { isEmpty } from "lodash";

import { tailwindBooleanCellTester, TailwindBooleanCell } from "./cells/TailwindBooleanCell";
import { tailwindDateCellTester, TailwindDateCell } from "./cells/TailwindDateCell";
import { tailwindEnumCellTester, TailwindEnumCell } from "./cells/TailwindEnumCell";
import { tailwindIntegerCellTester, TailwindIntegerCell } from "./cells/TailwindIntegerCell";
import { tailwindNumberCellTester, TailwindNumberCell } from "./cells/TailwindNumberCell";
import { tailwindNumberFormatCellTester, TailwindNumberFormatCell } from "./cells/TailwindNumberFormatCell";
import { tailwindOneOfEnumCellTester, TailwindOneOfEnumCell } from "./cells/TailwindOneOfEnumCell";
import { tailwindTextCellTester, TailwindTextCell } from "./cells/TailwindTextCell";
import { tailwindTimeCellTester, TailwindTimeCell } from "./cells/TailwindTimeCell";

import { tailwindTextControlTester, TailwindTextControl } from "./controls/TailwindTextControl";
import { tailwindNumberControlTester, TailwindNumberControl } from "./controls/TailwindNumberControl";
import { tailwindIntegerControlTester, TailwindIntegerControl } from "./controls/TailwindIntegerControl";
import { tailwindEnumTester, TailwindEnumControl } from "./controls/TailwindEnumControl";
import { tailwindBooleanControlTester, TailwindBooleanControl } from "./controls/TailwindBooleanControl";
import { tailwindBooleanToggleControlTester, TailwindBooleanToggleControl } from "./controls/TailwindBooleanToggleControl";
import { tailwindArrayControlTester, TailwindArrayControl } from "./controls/TailwindArrayControl";
import { tailwindAllOfControlTester, TailwindAllOfControl } from "./controls/TailwindAllOfControl";
import { tailwindAnyOfControlTester, TailwindAnyOfControl } from "./controls/TailwindAnyOfControl";
import { tailwindOneOfControlTester, TailwindOneOfControl } from "./controls/TailwindOneOfControl";
import { tailwindRadioGroupControlTester, TailwindRadioGroupControl } from "./controls/TailwindRadioGroupControl";
import { tailwindOneOfRadioGroupControlTester, TailwindOneOfRadioGroupControl } from "./controls/TailwindOneOfRadioGroupControl";
import { tailwindObjectControlTester, TailwindObjectControl } from "./controls/TailwindObjectControl";
import { tailwindDateTimeControlTester, TailwindDateTimeControl } from "./controls/TailwindDateTimeControl";
import { tailwindDateControlTester, TailwindDateControl } from "./controls/TailwindDateControl";
import { tailwindTimeControlTester, TailwindTimeControl } from "./controls/TailwindTimeControl";
import { tailwindSliderControlTester, TailwindSliderControl } from "./controls/TailwindSliderControl";
import { tailwindNativeControlTester, TailwindNativeControl } from "./controls/TailwindNativeControl";

import { tailwindGroupLayoutControlTester, TailwindGroupLayoutControl } from "./layouts/TailwindGroupLayoutControl";
import { tailwindHorizontalLayoutTester, TailwindHorizontalLayoutControl } from "./layouts/TailwindHorizontalLayoutControl";
import { tailwindVerticalLayoutTester, TailwindVerticalLayoutControl } from "./layouts/TailwindVerticalLayoutControl";
import { tailwindCategorizationControlTester, TailwindCategorizationControl } from "./layouts/TailwindCategorizationLayout";
import { tailwindCategorizationStepperControlTester, TailwindCategorizationStepperControl } from "./layouts/TailwindCategorizationStepperLayout";
import { tailwindArrayLayoutControlTester, TailwindArrayLayoutControl } from "./layouts/TailwindArrayLayoutRenderer";

import { tailwindLabelTester, TailwindLabel } from "./additional/TailwindLabelRenderer";
import { tailwindListWithDetailTester, TailwindListWithDetail } from "./additional/TailwindListWithDetailRenderer";
import { tailwindAnyOfStringOrEnumControlTester, TailwindAnyOfStringOrEnumControl } from "./controls/TailwindAnyOfStringOrEnumControl";
import { tailwindEnumArrayControlTester, TailwindEnumArrayControl } from "./renderers/TailwindEnumArrayRenderer";

const Cells = [
  { tester: tailwindBooleanCellTester, cell: TailwindBooleanCell },
  { tester: tailwindDateCellTester, cell: TailwindDateCell },
  { tester: tailwindEnumCellTester, cell: TailwindEnumCell },
  { tester: tailwindIntegerCellTester, cell: TailwindIntegerCell },
  { tester: tailwindNumberCellTester, cell: TailwindNumberCell },
  { tester: tailwindNumberFormatCellTester, cell: TailwindNumberFormatCell },
  { tester: tailwindOneOfEnumCellTester, cell: TailwindOneOfEnumCell },
  { tester: tailwindTextCellTester, cell: TailwindTextCell },
  { tester: tailwindTimeCellTester, cell: TailwindTimeCell }
];

const Renderers = [
  // controls
  { tester: tailwindArrayControlTester, renderer: TailwindArrayControl },
  { tester: tailwindBooleanControlTester, renderer: TailwindBooleanControl },
  { tester: tailwindBooleanToggleControlTester, renderer: TailwindBooleanToggleControl },
  { tester: tailwindNativeControlTester, renderer: TailwindNativeControl },
  { tester: tailwindEnumTester, renderer: TailwindEnumControl },
  { tester: tailwindIntegerControlTester, renderer: TailwindIntegerControl },
  { tester: tailwindNumberControlTester, renderer: TailwindNumberControl },
  { tester: tailwindTextControlTester, renderer: TailwindTextControl },
  { tester: tailwindDateTimeControlTester, renderer: TailwindDateTimeControl },
  { tester: tailwindDateControlTester, renderer: TailwindDateControl },
  { tester: tailwindTimeControlTester, renderer: TailwindTimeControl },
  { tester: tailwindSliderControlTester, renderer: TailwindSliderControl },
  { tester: tailwindObjectControlTester, renderer: TailwindObjectControl },
  { tester: tailwindAllOfControlTester, renderer: TailwindAllOfControl },
  { tester: tailwindAnyOfControlTester, renderer: TailwindAnyOfControl },
  { tester: tailwindOneOfControlTester, renderer: TailwindOneOfControl },
  { tester: tailwindRadioGroupControlTester, renderer: TailwindRadioGroupControl },
  { tester: tailwindOneOfRadioGroupControlTester, renderer: TailwindOneOfRadioGroupControl },

  // layouts
  { tester: tailwindGroupLayoutControlTester, renderer: TailwindGroupLayoutControl },
  { tester: tailwindHorizontalLayoutTester, renderer: TailwindHorizontalLayoutControl },
  { tester: tailwindVerticalLayoutTester, renderer: TailwindVerticalLayoutControl },
  { tester: tailwindCategorizationControlTester, renderer: TailwindCategorizationControl },
  { tester: tailwindCategorizationStepperControlTester, renderer: TailwindCategorizationStepperControl },
  { tester: tailwindArrayLayoutControlTester, renderer: TailwindArrayLayoutControl },

  // additional
  { tester: tailwindLabelTester, renderer: TailwindLabel },
  { tester: tailwindListWithDetailTester, renderer: TailwindListWithDetail },
  { tester: tailwindAnyOfStringOrEnumControlTester, renderer: TailwindAnyOfStringOrEnumControl },
  { tester: tailwindEnumArrayControlTester, renderer: TailwindEnumArrayControl }
];

export default function TailwindRenderer(props) {
  return <div className="container">{!isEmpty(props.schema) && <JsonForms cells={Cells} renderers={Renderers} {...props} />}</div>;
}
