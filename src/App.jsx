import React from "react";
import TailwindRenderer from "./views/tailwindrender";

class App extends React.Component {
  state = {
    data: {
      anyOf: "hello",
      boolean: true
    }
  };

  componentDidMount() {
    document.title = "Tester";
  }

  render() {
    const { data } = this.state;

    return (
      <div className="p-2 w-full">
        <TailwindRenderer
          schema={schema}
          uischema={uischema}
          data={data}
          onChange={(d) =>
            this.setState({
              data: d.data
            })
          }
        />
      </div>
    );
  }
}

export default App;

export const schema = {
  type: "object",
  properties: {
    allOf: {
      allOf: [
        {
          title: "String",
          type: "string"
        },
        {
          title: "Number",
          type: "number"
        }
      ]
    },
    anyOf: {
      anyOf: [
        {
          title: "String",
          type: "string"
        },
        {
          title: "Int",
          type: "integer"
        },
        {
          title: "Number",
          type: "number"
        },
        {
          title: "Bool",
          type: "boolean"
        }
      ]
    },
    anyOfStringOrEnum: {
      anyOf: [{ type: "string" }, { enum: ["foo", "bar"] }]
    },
    array: {
      type: "array",
      items: {
        type: "object",
        properties: {
          message: {
            type: "string",
            maxLength: 3
          },
          done: {
            type: "boolean"
          }
        }
      }
    },
    arrayLayout: {
      type: "array",
      items: {
        type: "object",
        properties: {
          information: {
            type: "object",
            properties: {
              choices: {
                type: "array",
                items: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    password: {
      type: "string",
      format: "password"
    },
    boolean: {
      type: "boolean"
    },
    booleanToggle: {
      type: "boolean"
    },
    integer: {
      type: "integer",
      minimum: 5
    },
    number: {
      type: "number",
      minimum: 5.1
    },
    date: {
      type: "string",
      format: "date"
    },
    dateTime: {
      type: "string",
      format: "date-time"
    },
    time: {
      type: "string",
      format: "time"
    },
    oneof: {
      type: "array",
      items: {
        oneOf: [
          {
            const: "item1",
            title: "Item 1"
          },
          {
            const: "item2",
            title: "Item 2"
          },
          {
            const: "item3",
            title: "Item 3"
          }
        ]
      },
      uniqueItems: true
    },
    enum: {
      type: "string",
      enum: ["DE", "IT", "JP", "US", "RU", "Other"]
    },
    group: {
      type: "object",
      properties: {
        name: {
          type: "string",
          minLength: 3,
          description: "Please enter your name"
        },
        birthDate: {
          type: "string",
          format: "date",
          description: "Please enter your birth date."
        }
      }
    },
    listWithDetails: {
      type: "array",
      items: {
        type: "object",
        properties: {
          objectarrayofstrings: {
            type: "object",
            properties: {
              choices: {
                type: "array",
                items: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    oneOfRadio: {
      type: "string",
      oneOf: [{ const: "A", title: "Option A" }, { const: "B" }, { const: "C", title: "Option C" }],
      default: "A"
    },
    slider: {
      type: "number",
      maximum: 10,
      minimum: 2,
      default: 6
    },
    textarea: {
      type: "string"
    }
  }
};

export const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/password",
          label: "Password"
        },
        {
          type: "Control",
          scope: "#/properties/boolean",
          label: "Boolean"
        },
        {
          type: "Control",
          scope: "#/properties/booleanToggle",
          label: "Boolean Toggle",
          options: {
            toggle: true
          }
        },
        {
          type: "Control",
          scope: "#/properties/integer",
          label: "Integer"
        },
        {
          type: "Control",
          scope: "#/properties/number",
          label: "Number"
        },
        {
          type: "Control",
          scope: "#/properties/enum",
          label: "Enumeration"
        },
        {
          type: "Control",
          scope: "#/properties/date",
          label: "Date"
        },
        {
          type: "Control",
          scope: "#/properties/dateTime",
          label: "Date Time"
        },
        {
          type: "Control",
          scope: "#/properties/time",
          label: "Time"
        },
        {
          type: "Control",
          scope: "#/properties/textarea",
          label: "Text Area",
          options: {
            multi: true
          }
        }
      ]
    },
    {
      type: "Control",
      label: "Any Of",
      scope: "#/properties/anyOf"
    },
    {
      type: "Control",
      label: "Any Of String Or Enum",
      scope: "#/properties/anyOfStringOrEnum"
    },
    {
      type: "Control",
      scope: "#/properties/oneOfRadio",
      options: {
        format: "radio"
      }
    },
    {
      type: "Control",
      label: "All Of",
      scope: "#/properties/allOf"
    },
    {
      type: "Control",
      label: "Array",
      scope: "#/properties/array",
      options: {
        showSortButtons: true
      }
    },
    /*
    {
      type: "Control",
      scope: "#",
      label: "Array Layout",
      options: {
        showSortButtons: true
      }
    },*/
    {
      type: "Control",
      scope: "#/properties/oneof",
      label: "My One OF"
    },
    {
      type: "Group",
      label: "My Group",
      elements: [
        {
          type: "Control",
          label: "Name",
          scope: "#/properties/group/properties/name"
        },
        {
          type: "Control",
          label: "Birth Date",
          scope: "#/properties/group/properties/birthDate"
        }
      ]
    },
    {
      type: "ListWithDetail",
      scope: "#/properties/listWithDetails"
    },
    {
      type: "Control",
      scope: "#/properties/slider",
      options: {
        slider: true
      }
    }
  ]
};
