import React from "react";
import { createDefaultValue } from "@jsonforms/core";
import IconButton from "../../../utilities/IconButton";
import Tooltip from "../../../utilities/Tooltip";
import ValidationIcon from "./ValidationIcon";

const TableToolbar = React.memo(({ errors, label, path, addItem, schema, enabled, createDefault }) => (
  <div className="container flex flex-row justify-between items-center px-2 border-b-2 border-slate-300 bg-color-0100 hover:bg-color-0200 rounded-t">
    <div className="flex flex-row items-center">
      <label className="text-gray-700 text-base tracking-wide select-none">{label}</label>
      {errors.length > 0 && <ValidationIcon id="tooltip-validation" errorMessages={errors} />}
    </div>
    {enabled && (
      <div className="mt-2">
        <Tooltip id="tooltip-add" title={`Add to ${label}`} placement="left">
          <IconButton
            icon="Add"
            ariaLabel={`Add to ${label}`}
            onClick={addItem(path, createDefault !== undefined ? createDefault() : createDefaultValue(schema))}
            iconSize="24"
            className="text-color-0800 hover:text-color-0700"
          />
        </Tooltip>
      </div>
    )}
  </div>
));

export default TableToolbar;
