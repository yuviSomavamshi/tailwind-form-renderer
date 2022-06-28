import React, { useCallback, useState } from "react";
import { isEmpty } from "lodash";
import { createCombinatorRenderInfos, createDefaultValue, resolveSubSchemas, isOneOfControl, rankWith } from "@jsonforms/core";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tab, Tabs } from "@mui/material";
import { JsonFormsDispatch, withJsonFormsOneOfProps } from "@jsonforms/react";
import CombinatorProperties from "../util/CombinatorProperties";

const TailwindOneOfRenderer = React.memo(
  ({ handleChange, schema, path, renderers, cells, rootSchema, id, visible, indexOfFittingSchema, uischema, uischemas, data }) => {
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(indexOfFittingSchema || 0);
    const [newSelectedIndex, setNewSelectedIndex] = useState(0);
    const handleClose = useCallback(() => setOpen(false), [setOpen]);
    const cancel = useCallback(() => {
      setOpen(false);
    }, [setOpen]);
    const _schema = resolveSubSchemas(schema, rootSchema, "oneOf");
    const oneOfRenderInfos = createCombinatorRenderInfos(_schema.oneOf, rootSchema, "oneOf", uischema, path, uischemas);

    const openNewTab = (newIndex) => {
      handleChange(path, createDefaultValue(schema.oneOf[newIndex]));
      setSelectedIndex(newIndex);
    };

    const confirm = useCallback(() => {
      openNewTab(newSelectedIndex);
      setOpen(false);
    }, [handleChange, createDefaultValue, newSelectedIndex]);
    const handleTabChange = useCallback(
      (_event, newOneOfIndex) => {
        setNewSelectedIndex(newOneOfIndex);
        if (isEmpty(data)) {
          openNewTab(newOneOfIndex);
        } else {
          setOpen(true);
        }
      },
      [setOpen, setSelectedIndex, data]
    );

    return (
      <>
        {visible && (
          <>
            <CombinatorProperties schema={_schema} combinatorKeyword={"oneOf"} path={path} />
            <Tabs value={selectedIndex} onChange={handleTabChange}>
              {Array.isArray(oneOfRenderInfos) &&
                oneOfRenderInfos.map((oneOfRenderInfo) => <Tab key={oneOfRenderInfo.label} label={oneOfRenderInfo.label} />)}
            </Tabs>
            {Array.isArray(oneOfRenderInfos) &&
              oneOfRenderInfos.map(
                (oneOfRenderInfo, oneOfIndex) =>
                  selectedIndex === oneOfIndex && (
                    <JsonFormsDispatch
                      key={oneOfIndex}
                      schema={oneOfRenderInfo.schema}
                      uischema={oneOfRenderInfo.uischema}
                      path={path}
                      renderers={renderers}
                      cells={cells}
                    />
                  )
              )}
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">{"Clear form?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Your data will be cleared if you navigate away from this tab. Do you want to proceed?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={cancel} color="primary">
                  No
                </Button>
                <Button onClick={confirm} color="primary" autoFocus id={`oneOf-${id}-confirm-yes`}>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </>
    );
  }
);

export const tailwindOneOfControlTester = rankWith(1003, isOneOfControl);

export const TailwindOneOfControl = withJsonFormsOneOfProps(TailwindOneOfRenderer);
