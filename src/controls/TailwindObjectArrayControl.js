import { useCallback, useState } from "react";
import { rankWith, isObjectArrayControl } from "@jsonforms/core";
import { withJsonFormsArrayLayoutProps } from "@jsonforms/react";
import TailwindTableControl from "../renderers/Table/TailwindTableControl";
import DeleteItemDialog from "../util/DeleteItemDialog";

export const TailwindObjectArrayControlRenderer = (props) => {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState(undefined);
  const [rowData, setRowData] = useState(undefined);

  const openDeleteDialog = useCallback(
    (p, rowIndex) => {
      setOpen(true);
      setPath(p);
      setRowData(rowIndex);
    },
    [setOpen, setPath, setRowData]
  );
  const deleteCancel = useCallback(() => setOpen(false), [setOpen]);
  const deleteConfirm = useCallback(() => {
    const p = path.substring(0, path.lastIndexOf("."));
    props.removeItems(p, [rowData])();
    setOpen(false);
  }, [setOpen, path, rowData, props]);

  return (
    <>
      {props.visible && (
        <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-color-0800 scrollbar-track-slate-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
          <TailwindTableControl {...props} openDeleteDialog={openDeleteDialog} />
          <DeleteItemDialog
            title="Delete Entry"
            question="Are you sure you want to delete the selected entry?"
            showDialog={open}
            onClose={deleteCancel}
            onDelete={deleteConfirm}
          />
        </div>
      )}
    </>
  );
};

export const tailwindObjectArrayControlTester = rankWith(1003, isObjectArrayControl);

export const TailwindObjectArrayControl = withJsonFormsArrayLayoutProps(TailwindObjectArrayControlRenderer);
