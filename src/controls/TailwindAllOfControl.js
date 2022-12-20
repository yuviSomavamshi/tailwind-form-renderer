import React from "react";
import { createCombinatorRenderInfos, findMatchingUISchema, isAllOfControl, rankWith } from "@jsonforms/core";
import { JsonFormsDispatch, withJsonFormsAllOfProps } from "@jsonforms/react";
import ErrorMessage from "../renderers/common/ErrorMessage";

const TailwindAllOfRenderer = React.memo(({ schema, rootSchema, visible, renderers, cells, path, uischemas, uischema, errors }) => {
  const delegateUISchema = findMatchingUISchema(uischemas)(schema, uischema.scope, path);
  if (delegateUISchema) {
    return <>{visible && <JsonFormsDispatch schema={schema} uischema={delegateUISchema} path={path} renderers={renderers} cells={cells} />}</>;
  }
  const allOfRenderInfos = createCombinatorRenderInfos(schema.allOf, rootSchema, "allOf", uischema, path, uischemas);
  return (
    <>
      {visible && (
        <div className="grow w-full mb-1.5">
          <div className="group block rounded shadow group-hover:shadow-lg w-full bg-slate-50">
            {uischema.label?.length > 0 && (
              <div className="px-2 py-1 bg-color-0100 hover:bg-color-0200 focus:outline-none focus-visible:ring focus-visible:ring-color-0500 focus-visible:ring-opacity-75 rounded-t">
                <label className="text-color-primary text-sm tracking-wide select-none">{uischema.label}</label>
              </div>
            )}
            <div className="grid gap-x-1 gap-y-0 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full p-2">
              {Array.isArray(allOfRenderInfos) &&
                allOfRenderInfos.map((allOfRenderInfo, allOfIndex) => (
                  <JsonFormsDispatch
                    key={allOfIndex}
                    schema={allOfRenderInfo.schema}
                    uischema={allOfRenderInfo.uischema}
                    path={path}
                    renderers={renderers}
                    cells={cells}
                  />
                ))}
            </div>
            <ErrorMessage path={path} errors={errors} />
          </div>
        </div>
      )}
    </>
  );
});

export const tailwindAllOfControlTester = rankWith(1003, isAllOfControl);

export const TailwindAllOfControl = withJsonFormsAllOfProps(TailwindAllOfRenderer);
