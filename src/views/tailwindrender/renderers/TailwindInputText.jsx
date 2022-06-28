import React from "react";
import LabelRenderer from "./common/LabelRenderer";
import { useState } from "react";
import IconRenderer from "../../IconRenderer";
import ErrorMessage from "./common/ErrorMessage";
import { isEmpty, merge } from "lodash";

/**
 * Default renderer for a string.
 */
const TailwindInputText = React.memo(
  ({ id, visible, enabled, uischema, path, errors, schema, label, description, handleChange, data, trim = false, required, config }) => {
    const [passwordShow, setPasswordShow] = useState(schema?.format !== "password");
    const isError = !isEmpty(errors);
    const appliedUiSchemaOptions = merge({}, config, uischema.options);

    return (
      <>
        {visible && (
          <div className="grow mb-1.5 mx-1">
            {label?.length > 0 && <LabelRenderer path={path} label={label} required={required} config={config} />}
            <div className="relative">
              {schema?.format === "password" && (
                <div className="absolute inset-y-0 right-0 flex items-center px-2">
                  <input className="hidden js-password-toggle" id={`${path}-toggle`} type="checkbox" />
                  <span
                    htmlFor={`${path}-toggle`}
                    className="absolute inset-y-0 right-0 flex items-center w-5 mr-2"
                    onClick={() => setPasswordShow(!passwordShow)}
                  >
                    <IconRenderer
                      icon={passwordShow ? "VisibilityOff" : "Visibility"}
                      className={passwordShow ? "text-cds-yellow-0500" : "text-color-0500"}
                      fontSize="small"
                    />
                  </span>
                </div>
              )}
              <>
                <form>
                  {appliedUiSchemaOptions?.multi ? (
                    <textarea
                      disabled={!enabled}
                      name={path}
                      id={id}
                      autoComplete="off"
                      className={`block caret-slate-300 ${appliedUiSchemaOptions?.isLarge ? "h-28" : "h-10"} ${
                        trim ? "text-xs" : "text-md px-1.5 py-0.5"
                      } rounded border placeholder-slate-500 shadow focus:shadow-md ${
                        isError ? "focus:border-red-500 border-red-600" : "focus:border-color-0600 border-slate-200"
                      } focus:outline-none w-full text-slate-700`}
                      placeholder={description}
                      value={data || ""}
                      onChange={(ev) => {
                        ev.preventDefault();
                        handleChange(path, ev.target.value);
                      }}
                    />
                  ) : (
                    <input
                      disabled={!enabled}
                      type={passwordShow ? "text" : "password"}
                      name={path}
                      id={id}
                      className={`block caret-slate-300 ${
                        trim ? "text-xs py-[1px] px-1" : "text-md px-1.5 py-0.5"
                      } rounded border text-slate-700 placeholder-slate-500 shadow focus:shadow-md ${
                        isError
                          ? "focus:border-red-500 border-red-600 focus:ring-red-600"
                          : "focus:border-color-0600 border-slate-200 focus:ring-color-0500"
                      } focus:outline-none w-full`}
                      placeholder={description}
                      value={data || ""}
                      onChange={(ev) => {
                        ev.preventDefault();
                        handleChange(path, ev.target.value);
                      }}
                    />
                  )}
                </form>
              </>
            </div>
            <ErrorMessage path={path} errors={errors} />
          </div>
        )}
      </>
    );
  }
);

export default TailwindInputText;
