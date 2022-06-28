import { merge, get } from "lodash";
import React, { useMemo, useCallback } from "react";
import { JsonFormsDispatch, withJsonFormsContext } from "@jsonforms/react";
import { composePaths, findUISchema, moveDown, moveUp, Resolve, update, getFirstPrimitiveProp } from "@jsonforms/core";
import Accordion from "../../utilities/Accordion";
import IconButton from "../../utilities/IconButton";

const ExpandPanelRendererComponent = (props) => {
  const {
    childLabel,
    childPath,
    index,
    expanded,
    moveDown,
    moveUp,
    enableMoveDown,
    enableMoveUp,
    handleExpansion,
    removeItems,
    path,
    rootSchema,
    schema,
    uischema,
    uischemas,
    renderers,
    cells,
    config
  } = props;

  const foundUISchema = useMemo(
    () => findUISchema(uischemas, schema, uischema.scope, path, undefined, uischema, rootSchema),
    [uischemas, schema, path, uischema, rootSchema]
  );

  const appliedUiSchemaOptions = merge({}, config, schema.options, uischema.options);

  return (
    <div key={childPath} className="container my-2 p-1 flex flex-row justify-between items-center bg-white text-sm shadow">
      <Accordion
        title={`${appliedUiSchemaOptions.rowTitle || "Record"} #${index + 1} ${childLabel}`}
        defaultOpen={expanded}
        disableOnMouseHover={true}
        onDelete={removeItems(path, [index])}
        onChange={handleExpansion(childPath)}
      >
        <JsonFormsDispatch schema={schema} uischema={foundUISchema} path={childPath} key={childPath} renderers={renderers} cells={cells} />
      </Accordion>
      {appliedUiSchemaOptions.showSortButtons && (
        <div className="px-1 pt-0.5 text-sm flex flex-col items-center">
          {enableMoveUp && <IconButton icon="ArrowUpward" ariaLabel="Move up" onClick={moveUp(path, index)} />}
          {enableMoveDown && <IconButton icon="ArrowDownward" ariaLabel="Move down" onClick={moveDown(path, index)} />}
        </div>
      )}
    </div>
  );
};

const ExpandPanelRenderer = React.memo(ExpandPanelRendererComponent);

/**
 * Maps state to dispatch properties of an expand pandel control.
 *
 * @param dispatch the store"s dispatch method
 * @returns {DispatchPropsOfArrayControl} dispatch props of an expand panel control
 */
export const useDispatchToExpandPanelProps = (dispatch) => ({
  removeItems: useCallback(
    (path, toDelete) => (ev) => {
      ev.stopPropagation();
      dispatch(
        update(path, (array) => {
          toDelete
            .sort()
            .reverse()
            .forEach((s) => array.splice(s, 1));
          return array;
        })
      );
    },
    [dispatch]
  ),
  moveUp: useCallback(
    (path, toMove) => (ev) => {
      ev.stopPropagation();
      dispatch(
        update(path, (array) => {
          moveUp(array, toMove);
          return array;
        })
      );
    },
    [dispatch]
  ),
  moveDown: useCallback(
    (path, toMove) => (ev) => {
      ev.stopPropagation();
      dispatch(
        update(path, (array) => {
          moveDown(array, toMove);
          return array;
        })
      );
    },
    [dispatch]
  )
});

/**
 * Map state to control props.
 * @param state the JSON Forms state
 * @param ownProps any own props
 * @returns {StatePropsOfControl} state props for a control
 */
export const withContextToExpandPanelProps =
  (Component) =>
  ({ ctx, props }) => {
    const dispatchProps = useDispatchToExpandPanelProps(ctx.dispatch);
    const { childLabelProp, schema, path, index, uischemas } = props;
    const childPath = composePaths(path, `${index}`);
    const childData = Resolve.data(ctx.core.data, childPath);
    const childLabel = childLabelProp ? get(childData, childLabelProp, "") : get(childData, getFirstPrimitiveProp(schema), "");
    return <Component {...props} {...dispatchProps} childLabel={childLabel} childPath={childPath} uischemas={uischemas} />;
  };

export const withJsonFormsExpandPanelProps = (Component) => withJsonFormsContext(withContextToExpandPanelProps(Component));

export default withJsonFormsExpandPanelProps(ExpandPanelRenderer);
