import React from "react";
import ErrorMessage from "./common/ErrorMessage";
import isEmpty from "lodash/isEmpty";

const TailwindRadioGroupRenderer = React.memo((props) => {
  const onChange = (value) => {
    if (!props.enabled) return;
    let ev = value;
    if (props.uischema?.options?.returnIndex) {
      const index = props.options.findIndex((item) => item?.value === value);
      ev = !isEmpty(props.schema?.values) ? props.schema?.values[index] : index;
    }
    props.handleChange(props.path, ev);
  };

  let data = props.data;
  if (props.uischema?.options?.returnIndex) {
    if (!isEmpty(props.schema?.values)) {
      const index = props.schema?.values?.findIndex((item) => item === props.data);
      if (index !== -1) data = props.options[index]?.value;
    } else {
      data = props.options[props.data]?.value;
    }
  }

  if (data === undefined && props.schema?.default !== undefined) {
    onChange(props.schema?.default);
  }

  return (
    <>
      {props.visible && (
        <div className="grow my-1.5 bg-white">
          <div className="group block rounded shadow w-full">
            {props.label?.length > 0 && (
              <div className="px-2 py-1 bg-color-0100 hover:bg-color-0200 focus:outline-none focus-visible:ring focus-visible:ring-color-0500 focus-visible:ring-opacity-75 rounded-t">
                <label className="text-color-primary text-sm tracking-wide select-none">{props.label}</label>
              </div>
            )}
            <div className={`grid p-1 ${props.options?.length < 4 ? "grid-cols-2" : "grid-cols-4"}`}>
              {props.options?.map((plan, index) => (
                <div
                  key={index}
                  className={`${plan.value === data && "bg-slate-200"} inline-flex items-center p-1 rounded text-xs select-none`}
                  onClick={() => onChange(plan.value)}
                >
                  <input
                    disabled={!props.enabled}
                    checked={plan.value === data}
                    type="radio"
                    className={`form-radio h-5 w-5 ${
                      plan.value === data ? "text-color-0800" : "text-slate-400"
                    } focus:outline-none relative flex cursor-pointer rounded-full p-0.5 shadow hover:shadow-lg m-1 ring-transparent`}
                    onChange={() => onChange(plan.value)}
                  />
                  <span className="mx-2 text-gray-700">{plan.label}</span>
                </div>
              ))}
            </div>
          </div>
          {!props.uischema?.options?.returnIndex && <ErrorMessage {...props} />}
        </div>
      )}
    </>
  );
});

export default TailwindRadioGroupRenderer;
