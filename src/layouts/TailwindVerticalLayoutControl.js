import { rankWith, uiTypeIs } from "@jsonforms/core";
import { withJsonFormsLayoutProps } from "@jsonforms/react";
import { TailwindLayoutRenderer } from "../util/layout";

const TailwindVerticalLayoutRenderer = ({ uischema, renderers, cells, schema, path, enabled, visible }) => {
  const layout = uischema;
  const childProps = {
    elements: layout.elements,
    schema,
    path,
    enabled,
    direction: "column",
    visible
  };
  return <TailwindLayoutRenderer {...childProps} renderers={renderers} cells={cells} />;
};

export const tailwindVerticalLayoutTester = rankWith(1001, uiTypeIs("VerticalLayout"));

export const TailwindVerticalLayoutControl = withJsonFormsLayoutProps(TailwindVerticalLayoutRenderer);
