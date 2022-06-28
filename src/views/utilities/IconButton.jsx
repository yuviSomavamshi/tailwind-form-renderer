import { Fragment, useState } from "react";
import IconRenderer from "../IconRenderer";
import { Transition } from "@headlessui/react";

export default function IconButton({
  onClick,
  icon,
  title,
  disabled = false,
  ariaLabel,
  className = "text-color-0400 hover:text-color-0300 my-1",
  bg = "bg-color-0800 hover:bg-color-0700",
  iconSize = "16",
  showShadow = true,
  defaultShowTitle = true
}) {
  const [showTitle, setShowTitle] = useState(defaultShowTitle);
  const toggleShowTitle = () => {
    if (!defaultShowTitle) {
      setShowTitle(!showTitle);
    }
  };

  return (
    <button
      disabled={disabled}
      className={`${ariaLabel === undefined ? (disabled ? "bg-slate-300 hover:bg-slate-200" : bg) : ""} rounded text-white px-2 mx-2 ${
        showShadow ? "shadow hover:shadow-xl" : ""
      }`}
      onClick={onClick}
      onMouseEnter={() => toggleShowTitle()}
      onMouseLeave={() => toggleShowTitle()}
    >
      <div className="flex flex-row items-center justify-center">
        <IconRenderer icon={icon} className={className} style={{ fontSize: iconSize }} />
        <Transition appear={true} show={title !== undefined && showTitle === true} as={Fragment}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-[500ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-[700ms]"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <span className="px-2 py-0.5 text-base select-none">{title}</span>
          </Transition.Child>
        </Transition>
      </div>
    </button>
  );
}
