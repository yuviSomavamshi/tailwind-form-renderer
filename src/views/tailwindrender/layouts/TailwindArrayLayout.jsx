import React, { useState, useCallback } from "react";
import { composePaths, computeLabel, createDefaultValue } from "@jsonforms/core";
import TableToolbar from "../renderers/Table/TableToolbar";
import ExpandPanelRenderer from "./ExpandPanelRenderer";
import { merge, map, range } from "lodash";
import EmptyIconRenderer from "../../utilities/EmptyIconRenderer";
import IconButton from "../../utilities/IconButton";
import Tooltip from "../../utilities/Tooltip";

export const TailwindArrayLayout = React.memo((props) => {
  const [expanded, setExpanded] = useState(false);
  const innerCreateDefaultValue = useCallback(() => createDefaultValue(props.schema), [props.schema]);
  const handleChange = useCallback(
    (panel) => (_event, expandedPanel) => {
      setExpanded(expandedPanel ? panel : false);
    },
    []
  );
  const isExpanded = (index) => expanded === composePaths(props.path, `${index}`);

  const { data, path, schema, uischema, errors, addItem, renderers, cells, label, required, rootSchema, config, uischemas } = props;
  const appliedUiSchemaOptions = merge({}, config, props.uischema.options);

  return (
    <div>
      <TableToolbar
        label={computeLabel(label, required, appliedUiSchemaOptions.hideRequiredAsterisk)}
        errors={errors}
        path={path}
        addItem={addItem}
        createDefault={innerCreateDefaultValue}
        enabled={data === 0}
        schema={schema}
      />
      <div>
        {data > 0 ? (
          map(range(data), (index) => {
            return (
              <ExpandPanelRenderer
                index={index}
                expanded={isExpanded(index)}
                schema={schema}
                path={path}
                handleExpansion={handleChange}
                uischema={uischema}
                renderers={renderers}
                cells={cells}
                key={index}
                rootSchema={rootSchema}
                enableMoveUp={index !== 0}
                enableMoveDown={index < data - 1}
                config={config}
                childLabelProp={appliedUiSchemaOptions.elementLabelProp}
                uischemas={uischemas}
              />
            );
          })
        ) : (
          <EmptyIconRenderer title="No data found" fill="#90b6e8" showIcon={false} />
        )}
        <div className="container flex flex-row justify-end text-color-0500 select-none">
          <label>Add a {uischema?.options?.rowTitle || "Record"}</label>
          <Tooltip id="tooltip-add" title={`Add to ${label}`} placement="left">
            <IconButton
              icon="Add"
              ariaLabel={`Add to ${label}`}
              onClick={addItem(path, innerCreateDefaultValue())}
              iconSize="24"
              className="text-color-0800 hover:text-color-0700"
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
});
