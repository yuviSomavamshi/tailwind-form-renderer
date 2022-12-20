import { rankWith, isPrimitiveArrayControl, resolveData } from "@jsonforms/core";
import { withJsonFormsArrayLayoutProps, withJsonFormsContext } from "@jsonforms/react";
import TagsInput from "../renderers/TagsInput";
import LabelRenderer from "../renderers/common/LabelRenderer";

export const TailwindPrimitiveArrayControlRenderer = (props) => {
  const { visible, ctx, path, schema, label, addItem, removeItems, description, handleChange } = props;
  return (
    <>
      {visible && (
        <div className="grow mb-1.5 mx-1">
          {label?.length > 0 && <LabelRenderer {...props} />}
          <TagsInput
            path={path}
            value={resolveData(ctx?.core?.data, path) || []}
            addItem={addItem}
            removeItems={removeItems}
            type={schema?.type}
            placeholder={description || "Add Item"}
            onChange={(tag) => {
              if (tag) {
                handleChange(path, tag);
              }
            }}
          />
        </div>
      )}
    </>
  );
};

export const tailwindPrimitiveArrayControlTester = rankWith(1004, isPrimitiveArrayControl);

const withContextToArrayProps =
  (Component) =>
  ({ ctx, props }) => {
    return <Component {...props} ctx={ctx} />;
  };

const withJsonFormsArrayProps = (Component) => withJsonFormsArrayLayoutProps(withJsonFormsContext(withContextToArrayProps(Component)));

export const TailwindPrimitiveArrayControl = withJsonFormsArrayProps(TailwindPrimitiveArrayControlRenderer);
