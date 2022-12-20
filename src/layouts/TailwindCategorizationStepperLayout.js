import React, { useState } from "react";
import merge from "lodash/merge";
import { Button, Step, StepButton, Stepper } from "@mui/material";
import { and, categorizationHasCategory, isVisible, optionIs, rankWith, uiTypeIs } from "@jsonforms/core";
import { withJsonFormsLayoutProps } from "@jsonforms/react";
import { TailwindLayoutRenderer, withAjvProps } from "../util/layout";

const TailwindCategorizationStepperLayoutRenderer = (props) => {
  const [activeCategory, setActiveCategory] = useState(0);

  const handleStep = (step) => {
    setActiveCategory(step);
  };

  const { data, path, renderers, schema, uischema, visible, cells, config, ajv } = props;
  const categorization = uischema;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const buttonWrapperStyle = {
    textAlign: "right",
    width: "100%",
    margin: "1em auto"
  };
  const buttonNextStyle = {
    float: "right"
  };
  const buttonStyle = {
    marginRight: "1em"
  };
  const categories = categorization.elements.filter((category) => isVisible(category, data, undefined, ajv));
  const childProps = {
    elements: categories[activeCategory].elements,
    schema,
    path,
    direction: "column",
    visible,
    renderers,
    cells
  };
  return (
    <>
      {visible && (
        <>
          <Stepper activeStep={activeCategory} nonLinear>
            {Array.isArray(categories) &&
              categories.map((e, idx) => (
                <Step key={e.label}>
                  <StepButton onClick={() => handleStep(idx)}>{e.label}</StepButton>
                </Step>
              ))}
          </Stepper>
          <div>
            <TailwindLayoutRenderer {...childProps} />
          </div>
          {!!appliedUiSchemaOptions.showNavButtons ? (
            <div style={buttonWrapperStyle}>
              <Button
                style={buttonNextStyle}
                variant="contained"
                color="primary"
                disabled={activeCategory >= categories.length - 1}
                onClick={() => handleStep(activeCategory + 1)}
              >
                Next
              </Button>
              <Button
                style={buttonStyle}
                color="secondary"
                variant="contained"
                disabled={activeCategory <= 0}
                onClick={() => handleStep(activeCategory - 1)}
              >
                Previous
              </Button>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export const tailwindCategorizationStepperControlTester = rankWith(
  2,
  and(uiTypeIs("Categorization"), categorizationHasCategory, optionIs("variant", "stepper"))
);

export const TailwindCategorizationStepperControl = withJsonFormsLayoutProps(withAjvProps(TailwindCategorizationStepperLayoutRenderer));
