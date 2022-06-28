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
          className={`flex flex-row ${
            props.removeMt === undefined && "mt-4"
          } h-[30px] items-center border border-slate-200 rounded mb-1.5 mx-1 bg-white shadow`}
        >
          <input
            disabled={props.readonly}
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
