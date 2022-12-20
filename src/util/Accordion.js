import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import IconRenderer from "./IconRenderer";
import IconButton from "./IconButton";

const Accordion = ({ visible = true, title, defaultOpen = false, disableOnMouseHover = false, onDelete, onChange, children }) => {
  const [defaultOpened, setDefaultOpened] = useState(defaultOpen);
  const [open, setOpen] = useState(defaultOpened);

  useEffect(() => {
    setDefaultOpened(defaultOpen);
  }, [defaultOpen]);

  const show = open || defaultOpened;

  return (
    <>
      {visible && (
        <div className="w-full flex flex-col mt-0.5">
          <div
            onMouseEnter={() => disableOnMouseHover === false && setOpen(true)}
            onMouseLeave={() => {
              if (defaultOpen === false) setOpen(false);
            }}
            onClick={(e) => {
              if (typeof onChange === "function") onChange(e);
              setDefaultOpened(!defaultOpened);
              setOpen(!open);
            }}
            className={`w-full flex px-1.5 py-0.5 items-center justify-between rounded border-b-2 border-slate-300 bg-color-0100 hover:bg-color-0200 ${
              show && "bg-color-0100"
            } text-left text-xs font-medium text-color-primary focus:outline-none focus-visible:ring focus-visible:ring-color-0500 focus-visible:ring-opacity-75 select-none`}
          >
            <span>{title}</span>
            <div className="flex flex-row">
              {onDelete && (
                <IconButton
                  id={`delete-accor-${title}`}
                  icon="Delete"
                  ariaLabel="Delete"
                  onClick={onDelete}
                  className="text-color-0500 hover:text-cds-red-0800"
                  showShadow={false}
                />
              )}
              <IconRenderer icon="ChevronRight" className={`${show ? "-rotate-90 transform" : "rotate-90"} h-5 w-5 text-color-primary`} />
            </div>
          </div>
          <Transition
            show={show}
            enter="transition duration-[300ms] ease-in-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-105 ease-in-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <div className="w-full items-center p-1 rounded bg-slate-50 border mb-0.5">{children}</div>
          </Transition>
        </div>
      )}
    </>
  );
};

export default Accordion;
