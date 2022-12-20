import React from "react";
import LabelRenderer from "./common/LabelRenderer";
import isEmpty from "lodash/isEmpty";
import merge from "lodash/merge";
import Select from "react-select";
import ErrorMessage from "./common/ErrorMessage";

const customStyles = {
  control: (styles) => ({
    ...styles,
    boxShadow: "none",
    padding: 0,
    minHeight: 28,
    minWidth: 100,
    borderStyle: "none"
  }),
  menuList: (base) => ({
    ...base,

    "::-webkit-scrollbar": {
      width: "8px",
      height: "0px"
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1"
    },
    "::-webkit-scrollbar-thumb": {
      background: "#154374"
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555"
    }
  }),
  valueContainer: (styles) => ({
    ...styles,
    fontSize: 14,
    paddingTop: 0,
    paddingBottom: 0
  }),
  option: (base, { isSelected }) => ({
    ...base,
    backgroundColor: isSelected ? "#154374" : "",
    color: isSelected ? "white" : "",
    ":active": {
      backgroundColor: "#154374"
    },
    ":hover": {
      backgroundColor: "#316eaf",
      color: "#fff"
    }
  }),
  placeholder: (base) => ({
    ...base,
    color: "rgb(100 116 139)",
    fontSize: 14
  }),
  input: (base) => ({
    ...base,
    fontSize: 14,
    borderStyle: "none",
    paddingTop: 0,
    paddingBottom: 0
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: 5,
    paddingTop: 0,
    paddingBottom: 0
  })
};

const TailwindSelectRenderer = React.memo(
  ({ id, path, visible = true, errors, enabled = true, label, data, handleChange, enableFilter = true, description, disabled = false, ...props }) => {
    const appliedUiSchemaOptions = merge({}, props.config, props.uischema?.options, props.schema?.options);
    const options = !isEmpty(props.schema?.values) ? props.schema?.values : props.options;
    const onChange = (selected) => {
      let ev;
      if (appliedUiSchemaOptions.returnIndex) {
        ev = options?.findIndex((item) => item?.value === selected.value);
      } else {
        ev = selected?.value;
      }
      handleChange(path, ev);
    };

    let selectedOption;
    if (appliedUiSchemaOptions.returnIndex) {
      selectedOption = options[data];
    } else {
      selectedOption = options?.find((item) => item.value === data);
    }

    return (
      <>
        {visible && (
          <div id={id} className="grow mb-1.5 mx-1 z-2">
            {label?.length > 0 && <LabelRenderer path={path} label={label} {...props} />}
            <Select
              classNamePrefix="react-select"
              className="rounded border text-slate-700 placeholder-slate-500 shadow focus:shadow-md"
              placeholder={description}
              styles={customStyles}
              isSearchable={enableFilter}
              value={selectedOption}
              onChange={disabled ? null : onChange}
              options={options}
              isDisabled={disabled}
            />
            {appliedUiSchemaOptions.returnIndex != null && <ErrorMessage path={path} errors={errors} />}
          </div>
        )}
      </>
    );
  }
);

export default TailwindSelectRenderer;
