import React from "react";
import { Generate } from "@jsonforms/core";
import { JsonFormsDispatch } from "@jsonforms/react";
import omit from "lodash/omit";

const isLayout = (uischema) => uischema.hasOwnProperty("elements");

class CombinatorProperties extends React.Component {
  render() {
    const { schema, combinatorKeyword, path } = this.props;

    const otherProps = omit(schema, combinatorKeyword);
    const foundUISchema = Generate.uiSchema(otherProps, "VerticalLayout");
    let isLayoutWithElements = false;
    if (foundUISchema !== null && isLayout(foundUISchema)) {
      isLayoutWithElements = foundUISchema.elements.length > 0;
    }

    if (isLayoutWithElements) {
      return <JsonFormsDispatch schema={otherProps} path={path} uischema={foundUISchema} />;
    }

    return null;
  }
}

export default CombinatorProperties;
