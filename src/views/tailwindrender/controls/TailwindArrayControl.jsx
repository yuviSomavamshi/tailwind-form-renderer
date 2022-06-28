import { useCallback, useState } from "react";
import { rankWith, or, isObjectArrayControl, isPrimitiveArrayControl, deriveTypes } from "@jsonforms/core";
import { withJsonFormsArrayLayoutProps, withJsonFormsContext } from "@jsonforms/react";
import TailwindTableControl from "../renderers/Table/TailwindTableControl";
import DeleteItemDialog from "../../utilities/DeleteItemDialog";
import TailwindTagsRenderer from "../renderers/TailwindTagsRenderer";

const primitives = ["integer", "number", "string"];
export const TailwindArrayControlRenderer = (props) => {
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

  const keys = props.schema?.properties ? Object.keys(props.schema.properties) : [];
  const primitiveType = props.schema?.properties === undefined ? props.schema?.type : deriveTypes(props.schema.properties[keys[0]])[0];
  const isPrimitive = keys.length === 1 && primitives.includes(primitiveType);
  return (
    <>
      {props.visible && (
        <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-color-0800 scrollbar-track-slate-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
          {isPrimitive ? (
            <TailwindTagsRenderer
              {...props}
              value={props.ctx?.core?.data !== undefined ? props.ctx?.core?.data[props.path] : []}
              primitive={primitiveType}
            />
          ) : (
            <TailwindTableControl {...props} openDeleteDialog={openDeleteDialog} />
          )}
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

export const tailwindArrayControlTester = rankWith(1003, or(isObjectArrayControl, isPrimitiveArrayControl));

export const withContextToArrayProps =
  (Component) =>
  ({ ctx, props }) => {
    return <Component {...props} ctx={ctx} />;
  };

export const withJsonFormsArrayProps = (Component) => withJsonFormsArrayLayoutProps(withJsonFormsContext(withContextToArrayProps(Component)));

export const TailwindArrayControl = withJsonFormsArrayProps(TailwindArrayControlRenderer);
