import React from "react";

function showAsRequired(props) {
  return props?.required && !props?.config?.hideRequiredAsterisk;
}

const LabelRenderer = React.memo(({ path, label, fontSize, ...props }) => {
  return (
    <div htmlFor={path} className="flex items-center text-xs font-medium text-color-0500 w-full select-none">
      <label style={{ fontSize: fontSize !== undefined ? fontSize : "10px" }}>{label}</label>
      {showAsRequired(props) && <label className="text-red-500 items-center">*</label>}
    </div>
  );
});

export default LabelRenderer;
