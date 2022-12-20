import { rankWith, uiTypeIs } from "@jsonforms/core";
import { withJsonFormsLayoutProps } from "@jsonforms/react";
import { TailwindLayoutRenderer } from "../util/layout";

const TailwindHorizontalLayoutRenderer = ({ uischema, renderers, cells, schema, path, enabled, visible }) => {
  const layout = uischema;
  const childProps = {
    elements: layout.elements,
    schema,
    path,
    enabled,
    direction: "row",
    visible
  };
  return <TailwindLayoutRenderer {...childProps} renderers={renderers} cells={cells} />;
};

export const tailwindHorizontalLayoutTester = rankWith(1002, uiTypeIs("HorizontalLayout"));

export const TailwindHorizontalLayoutControl = withJsonFormsLayoutProps(TailwindHorizontalLayoutRenderer);
