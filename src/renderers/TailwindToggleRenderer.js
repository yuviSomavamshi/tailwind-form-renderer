import React from "react";
import merge from "lodash/merge";
import classNames from "classnames";

/**
 * Default renderer for a boolean toggle.
 */
const TailwindToggleRenderer = React.memo((props) => {
  const { data, uischema, path, handleChange, config, visible, enabled } = props;
  const appliedUiSchemaOptions = merge({}, config, uischema?.options);
  const inputProps = { autoFocus: !!appliedUiSchemaOptions.focus };
  const checked = data !== undefined ? data : false;

  return (
    <>
      {visible && (
        <div className="relative inline-block w-8 mx-2 align-middle select-none transition duration-[300ms] ease-in">
          <input
            disabled={!props.enabled}
            autoFocus={inputProps.autoFocus}
            type="checkbox"
            name={path}
            id={`${path}-toggle`}
            className={`toggle-checkbox absolute block w-4 h-4 -mt-0.5 rounded-full ${
              enabled ? "bg-white" : "bg-slate-100"
            } text-color-0500 ring-color-0500 border appearance-none cursor-pointer`}
            checked={Boolean(checked)}
            onChange={(ev) => handleChange(path, ev.target.checked)}
          />
          <label
            htmlFor={`${path}-toggle`}
            className={classNames("toggle-label block overflow-hidden h-3 rounded-full bg-gray-300 cursor-pointer select-all", {
              "bg-color-0300": checked
            })}
          />
        </div>
      )}
    </>
  );
});

export default TailwindToggleRenderer;
