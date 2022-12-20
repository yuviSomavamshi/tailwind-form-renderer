import React from "react";
import Tooltip from "../../util/Tooltip";
import IconRenderer from "../../util/IconRenderer";

const LabelRenderer = React.memo(({ path, label, fontSize, description, ...props }) => {
  return (
    <div htmlFor={path} className="w-full flex items-center text-xs font-medium text-color-0500 select-none">
      <div className="flex">
        <label style={{ fontSize: fontSize !== undefined ? fontSize : "10px" }}>{label}</label>
        {showAsRequired(props) && <label className="text-red-500 items-center">*</label>}
      </div>
      {description && (
        <Tooltip title={description}>
          <IconRenderer icon="HelpOutlined" fontSize="8px" className="pb-0.5 ml-1" />
        </Tooltip>
      )}
    </div>
  );
});

export default LabelRenderer;

function showAsRequired(props) {
  return props?.required && !props?.config?.hideRequiredAsterisk;
}
