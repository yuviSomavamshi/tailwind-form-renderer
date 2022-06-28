import React from "react";
import { JsonFormsDispatch, useJsonForms } from "@jsonforms/react";
import { getAjv } from "@jsonforms/core";
import classNames from "classnames";

export const renderLayoutElements = (elements, schema, path, enabled, renderers, cells) => {
  return (
    Array.isArray(elements) &&
    elements.map((child, index) => (
      <JsonFormsDispatch
        key={`${path}-${index}`}
        uischema={child}
        schema={schema}
        path={path}
        enabled={enabled}
        renderers={renderers}
        cells={cells}
      />
    ))
  );
};

export const TailwindLayoutRenderer = React.memo(({ visible, elements, schema, path, enabled, direction, renderers, cells }) => {
  return (
    <>
      {visible && (
        <div
          className={classNames("container flex", {
            "flex-row": direction === "row",
            "flex-col": direction !== "row"
          })}
        >
          {renderLayoutElements(elements, schema, path, enabled, renderers, cells)}
        </div>
      )}
    </>
  );
});

export const withAjvProps = (Component) => (props) => {
  const ctx = useJsonForms();
  const ajv = getAjv({ jsonforms: { ...ctx } });

  return <Component {...props} ajv={ajv} />;
};
