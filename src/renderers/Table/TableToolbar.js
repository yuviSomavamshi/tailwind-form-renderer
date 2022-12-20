import React from "react";
import { createDefaultValue } from "@jsonforms/core";
import IconButton from "../../util/IconButton";
import Tooltip from "../../util/Tooltip";
//import ValidationIcon from "./ValidationIcon";

const TableToolbar = React.memo(({ /*errors,*/ label, path, addItem, schema, enabled, createDefault }) => (
  <div className="w-full flex flex-row justify-between items-center px-2 border-b border-slate-300 bg-color-0100 hover:bg-color-0200 text-color-primary rounded-t mt-1">
    <div className="flex flex-row items-center">
      <label className="text-sm tracking-wide select-none">{label}</label>
      {/**{errors.length > 0 && <ValidationIcon id="tooltip-validation" errorMessages={errors} />}**/}
    </div>
    {enabled && (
      <div className="mt-2">
        <Tooltip id="tooltip-add" title={`Add to ${label}`} placement="left">
          <IconButton
            id={`add-first-item-${path}`}
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
