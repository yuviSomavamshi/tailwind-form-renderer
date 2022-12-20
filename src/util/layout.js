import React from "react";
import { JsonFormsDispatch, useJsonForms } from "@jsonforms/react";
import { getAjv } from "@jsonforms/core";

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

export const TailwindLayoutRenderer = React.memo(({ id, visible, elements, schema, path, enabled, direction, renderers, cells }) => {
  return (
    <>
      {visible && (
        <div
          id={id}
          className={`w-full ${
            direction === "column"
              ? "flex flex-col"
              : elements.length >= 4
              ? "grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              : elements.length >= 2
              ? "grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2"
              : "flex flex-col"
          }`}
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
