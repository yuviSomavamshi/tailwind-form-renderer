import React from "react";
import { RadioGroup } from "@headlessui/react";
import ErrorMessage from "./common/ErrorMessage";
import IconRenderer from "../../IconRenderer";
import { isEmpty } from "lodash";

const TailwindRadioGroupRenderer = React.memo((props) => {
  const onChange = (value) => {
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
        <div className="grow mb-1.5 mx-1">
          <div className="group block rounded shadow group-hover:shadow-lg w-full bg-white">
            {props.label?.length > 0 && (
              <div className="px-2 py-1 bg-color-0100 hover:bg-color-0200 focus:outline-none focus-visible:ring focus-visible:ring-color-0500 focus-visible:ring-opacity-75 rounded-t">
                <label className="text-gray-700 text-base tracking-wide select-none">{props.label}</label>
              </div>
            )}
            <div className="p-2">
              <RadioGroup value={data} onChange={onChange}>
                <RadioGroup.Label className="sr-only">{props.label}</RadioGroup.Label>
                <div className="space-x-2 flex flex-row ">
                  {props.options?.map((plan) => (
                    <RadioGroup.Option
                      key={plan.label}
                      value={plan.value}
                      className={({ active, checked }) =>
                        `${
                          checked ? "bg-color-0800 text-white" : "bg-white"
                        } focus:outline-none relative flex cursor-pointer rounded px-5 py-0.5 shadow hover:shadow-lg`
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <div className="flex w-full items-center justify-between select-none">
                            <RadioGroup.Label as="p" className={`font-medium text-sm  ${checked ? "text-white" : "text-color-0800"}`}>
                              {plan.label}
                            </RadioGroup.Label>
                            {checked && (
                              <div className="text-white ml-2">
                                <IconRenderer icon="Check" fontSize="small" />
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
          {!props.uischema?.options?.returnIndex && <ErrorMessage {...props} />}
        </div>
      )}
    </>
  );
});

export default TailwindRadioGroupRenderer;
