import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import IconRenderer from "../IconRenderer";
import IconButton from "./IconButton";
import classNames from "classnames";

function CustomDialog({ open, largeScreen, title, onClose, onSave, saveTitle, saveIcon, children }) {
  return (
    <>
      <Transition appear={true} show={open === true} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto bg-slate-400 bg-opacity-60 transition-opacity" onClose={() => null}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-[500ms]"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transform transition ease-in-out duration-[700ms]"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-[500ms]"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transform transition ease-in-out duration-[700ms]"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={classNames(
                  "container inline-block px-4 py-2 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded",
                  {
                    "h-[38rem]": largeScreen,
                    "h-fit": !largeScreen,
                    "max-w-4xl": largeScreen,
                    "max-w-sm": !largeScreen
                  }
                )}
              >
                {title != null && (
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-slate-800">
                    <div className="group flex items-start justify-between pb-1.5 border-b border-solid border-slate-200 rounded-t">
                      <label className="text-color-0700 group-hover:text-color-0300 font-medium text-xl tracking-wide px-4 select-none">
                        {title}
                      </label>
                      <button type="button" onClick={onClose} className="text-cds-red-0700 group-hover:text-cds-red-0300 focus:outline-none pr-4">
                        <IconRenderer icon="Close" className="h-5 w-5" />
                      </button>
                    </div>
                  </Dialog.Title>
                )}
                <div className="flex flex-col items-center w-full p-1 h-[87%]">{children}</div>
                {onSave && (
                  <div className="flex border-t border-solid border-slate-200 justify-end text-white w-full mt-1 p-1 pb-0">
                    <button
                      type="button"
                      className="px-5 py-1 rounded focus:outline-none shadow-sm bg-slate-200 hover:bg-slate-100 uppercase text-slate-700"
                      onClick={onClose}
                    >
                      CLOSE
                    </button>
                    <IconButton id="form-submit-btn" title={saveTitle || "Save"} icon={saveIcon || "Save"} onClick={onSave} />
                  </div>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default CustomDialog;
