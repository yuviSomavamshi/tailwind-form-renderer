import { TailwindLayoutRenderer } from "../util/layout";
import { rankWith, uiTypeIs, withIncreasedRank } from "@jsonforms/core";
import { withJsonFormsLayoutProps } from "@jsonforms/react";
import Accordion from "../../utilities/Accordion";

const GroupComponent = (props) => {
  const groupLayout = props.uischema;
  return (
    <>
      {props.visible && (
        <div className="container flex mb-0.5">
          <Accordion title={groupLayout.label} defaultOpen={true}>
            <div className="container py-1 pl-2 overflow-scroll scrollbar-thin scrollbar-thumb-color-0800 scrollbar-track-slate-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
              <TailwindLayoutRenderer
                schema={props.schema}
                path={props.path}
                elements={groupLayout.elements}
                direction={props.direction}
                renderers={props.renderers}
                cells={props.cells}
                visible={props.visible}
                enabled={props.enabled}
              />
            </div>
          </Accordion>
        </div>
      )}
    </>
  );
};

const TailwindGroupLayout = ({ uischema, schema, path, visible, enabled, renderers, cells, direction }) => {
  return (
    <GroupComponent
      elements={uischema.elements}
      schema={schema}
      path={path}
      direction={direction}
      visible={visible}
      enabled={enabled}
      uischema={uischema}
      renderers={renderers}
      cells={cells}
    />
  );
};

export const TailwindGroupLayoutControl = withJsonFormsLayoutProps(TailwindGroupLayout);

export const tailwindGroupLayoutControlTester = withIncreasedRank(1, rankWith(1001, uiTypeIs("Group")));
