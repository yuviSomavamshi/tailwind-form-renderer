import { useState } from "react";
import { usePopperTooltip } from "./usePopperTooltip.ts";
import "./tooltip.css";

const Tooltip = ({ placement = "bottom", title, content, children, backgroundColor }) => {
  const [controlledVisible, setControlledVisible] = useState(false);
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } = usePopperTooltip({
    placement,
    trigger: "hover",
    closeOnOutsideClick: false,
    visible: controlledVisible,
    onVisibleChange: setControlledVisible
  });

  if (title === undefined && content === undefined) {
    return <>{children}</>;
  }

  const toolProps = { className: "tooltip-container px-2" };
  if (backgroundColor) {
    toolProps.style = { color: "#262640", backgroundColor };
  }

  return (
    <>
      <div ref={setTriggerRef}>{children}</div>
      {visible && (
        <div ref={setTooltipRef} {...getTooltipProps(toolProps)}>
          {title && <div className={`${content === undefined ? "text-xs leading-4" : "text-sm font-semibold pb-1"} break-words`}>{title}</div>}
          {content && <div className="text-xs leading-4 break-words">{content}</div>}
          <div {...getArrowProps({ className: "tooltip-arrow" })} />
        </div>
      )}
    </>
  );
};

export default Tooltip;
