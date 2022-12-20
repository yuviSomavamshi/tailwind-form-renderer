import { useState } from "react";
import { AppBar, Tab, Tabs } from "@mui/material";
import { and, isVisible, rankWith, uiTypeIs } from "@jsonforms/core";
import { withJsonFormsLayoutProps } from "@jsonforms/react";
import { TailwindLayoutRenderer, withAjvProps } from "../util/layout";

export const isSingleLevelCategorization = and(uiTypeIs("Categorization"), (uischema) => {
  const categorization = uischema;

  return categorization.elements && categorization.elements.reduce((acc, e) => acc && e.type === "Category", true);
});

const TailwindCategorizationLayoutRenderer = (props) => {
  const { data, path, renderers, cells, schema, uischema, visible, enabled, selected, onChange, ajv } = props;
  const categorization = uischema;
  const [activeCategory, setActiveCategory] = useState(selected ?? 0);
  const categories = categorization.elements.filter((category) => isVisible(category, data, undefined, ajv));
  const childProps = {
    elements: categories[activeCategory].elements,
    schema,
    path,
    direction: "column",
    enabled,
    visible,
    renderers,
    cells
  };
  const onTabChange = (_event, value) => {
    if (onChange) {
      onChange(value, activeCategory);
    }
    setActiveCategory(value);
  };
  return (
    <>
      {visible && (
        <>
          <AppBar position="static">
            <Tabs value={activeCategory} onChange={onTabChange} textColor="inherit" indicatorColor="secondary" variant="scrollable">
              {Array.isArray(categories) && categories.map((e, idx) => <Tab key={idx} label={e.label} />)}
            </Tabs>
          </AppBar>
          <div style={{ marginTop: "0.5em" }}>
            <TailwindLayoutRenderer {...childProps} />
          </div>
        </>
      )}
    </>
  );
};

export const tailwindCategorizationControlTester = rankWith(1001, isSingleLevelCategorization);

export const TailwindCategorizationControl = withJsonFormsLayoutProps(withAjvProps(TailwindCategorizationLayoutRenderer));
