import React, { useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import LabelRenderer from "./common/LabelRenderer";
import IconRenderer from "../../IconRenderer";
import { isEmpty, merge } from "lodash";

const TailwindSelectRenderer = React.memo(
  ({ id, path, visible = true, enabled = true, label, options, data, handleChange, enableFilter = true, ...props }) => {
    const appliedUiSchemaOptions = merge({}, props.config, props.uischema?.options, props.schema?.options);

    const onChange = (event) => {
      const value = event?.value;
      setQuery(value);
      let ev;
      if (appliedUiSchemaOptions.returnValue) {
        const index = options?.findIndex((item) => item?.value === value);
        ev = !isEmpty(props.schema?.values) ? props.schema?.values[index] : index;
      } else if (appliedUiSchemaOptions.returnValue) {
        ev = options?.findIndex((item) => item?.value === value);
      } else {
        ev = value;
      }
      handleChange(path, ev);
    };

    let info;
    if (appliedUiSchemaOptions.returnValue) {
      const index = props.schema?.values?.findIndex((item) => item === data);
      if (index !== -1) info = options[index];
    } else if (appliedUiSchemaOptions.returnValue) {
      info = options[data];
    } else {
      info = options?.find((item) => item.value === data);
    }
    const [query, setQuery] = useState("");
    const filteredOptions = enableFilter
      ? query === ""
        ? options
        : options?.filter((option) => option.label?.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, "")))
      : options;
    return (
      <>
        {visible && (
          <div id={id} className="grow mb-1.5 mx-1">
            {label?.length > 0 && <LabelRenderer path={path} label={label} {...props} />}
            <Combobox as="div" value={info} onChange={onChange}>
              {({ open }) => (
                <div className={"relative mb-2"}>
                  <div className="flex items-center h-[30px] cursor-default relative rounded border focus:border-color-0600 border-slate-200 py-1 pl-1.5 pr-6 text-left transition ease-in-out duration-150 text-md placeholder-slate-600 focus:placeholder-slate-500 focus:outline-none shadow focus:shadow-md w-full bg-white">
                    <Combobox.Input
                      className="w-full caret-slate-300 border-none pl-0 py-0 pr-2 text-sm leading-5 text-gray-700 focus:ring-0"
                      displayValue={(opt) => opt?.label || ""}
                      onChange={(ev) => setQuery(ev.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2" onClick={() => setQuery("")}>
                      <Selector />
                    </Combobox.Button>
                  </div>
                  {enabled && (
                    <div className="absolute z-10 mb-10 bg-white rounded shadow focus:shadow-md w-full">
                      <Transition
                        show={open}
                        leave="transition duration-[100ms] ease-in"
                        leaveFrom="transform opacity-100"
                        leaveTo="transform opacity-0"
                      >
                        <Combobox.Options
                          static
                          className="py-0.5 overflow-auto text-base rounded max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm scrollbar-thin scrollbar-thumb-color-0800 scrollbar-track-slate-100 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
                        >
                          {filteredOptions?.length === 0 && query !== "" ? (
                            <div className="relative cursor-default select-none py-0.5 px-1.5 text-gray-700">Nothing found.</div>
                          ) : (
                            filteredOptions?.map((optionValue) => {
                              return (
                                <Combobox.Option as={React.Fragment} key={optionValue.value} value={optionValue}>
                                  {({ active, selected }) => {
                                    const textColor = optionValue.color || "text-color-0500";
                                    return (
                                      <li
                                        className={`${
                                          active ? "text-white bg-color-0800" : textColor
                                        } cursor-default select-none relative py-0.5 pl-1.5 pr-9`}
                                      >
                                        <div className="flex items-center">
                                          {optionValue.icon && (
                                            <IconRenderer icon={optionValue.icon} fontSize="small" className={`mr-2 ${textColor}`} />
                                          )}
                                          <span className={`${selected ? "font-semibold" : "font-normal"} flex items-center`}>
                                            {optionValue.label}
                                          </span>
                                          {selected && (
                                            <span className={`${active && "text-white"} absolute inset-y-0 right-0 flex items-center mr-3 pl-1.5`}>
                                              <Selected />
                                            </span>
                                          )}
                                        </div>
                                      </li>
                                    );
                                  }}
                                </Combobox.Option>
                              );
                            })
                          )}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  )}
                </div>
              )}
            </Combobox>
          </div>
        )}
      </>
    );
  }
);

export default TailwindSelectRenderer;

const Selector = () => (
  <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const Selected = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
    />
  </svg>
);
