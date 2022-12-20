import React from "react";
import LabelRenderer from "./common/LabelRenderer";

/**
 * Default renderer for a checkbox/boolean.
 */
const TailwindCheckboxRenderer = React.memo((props) => {
  const checked = props.data !== undefined ? props.data : false;
  return (
    <>
      {props.visible && (
        <div
          className={`flex flex-row ${props.removeMt === undefined && "mt-4"} min-h-[30px] items-center border border-slate-200 rounded mb-1.5 ${
            props.enabled ? "bg-white" : "bg-slate-100"
          } shadow grow mx-1`}
        >
          <input
            disabled={!props.enabled}
            type="checkbox"
            name={props.path}
            id={props.id}
            className="text-color-0500 ring-blue-500 rounded mx-2"
            placeholder={props.description}
            checked={Boolean(checked)}
            onChange={(ev) => props.handleChange(props.path, ev.target.checked)}
          />
          {props.label?.length > 0 && <LabelRenderer {...props} fontSize="12px" />}
        </div>
      )}
    </>
  );
});

export default TailwindCheckboxRenderer;
