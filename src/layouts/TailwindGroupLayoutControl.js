import { TailwindLayoutRenderer } from "../util/layout";
import { rankWith, uiTypeIs, withIncreasedRank } from "@jsonforms/core";
import { withJsonFormsLayoutProps } from "@jsonforms/react";

const GroupComponent = (props) => {
  const groupLayout = props.uischema;
  return (
    <>
      {props.visible && (
        <div className="w-full flex mb-0.5">
          <div className="w-full flex flex-col rounded border my-1">
            <span className="bg-color-0100 hover:bg-color-0200 text-left text-sm text-color-primary select-none px-2 py-1 rounded-t-sm">
              {groupLayout.label}
            </span>
            <div className="px-2 pb-1">
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
          </div>
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
