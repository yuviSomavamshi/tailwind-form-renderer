# JSON Forms - More Forms. Less Code

*Complex forms in the blink of an eye*

JSON Forms eliminates the tedious task of writing fully-featured forms by hand by leveraging the capabilities of JSON, JSON Schema and Javascript.

## TailwindCSS Renderers Package

This is the JSON Forms TailwindCSS Renderers Package. This package only contains renderers and must be combined with [JSON Forms React](https://github.com/eclipsesource/jsonforms/blob/master/packages/react).

See the official [documentation](https://jsonforms.io/docs/integrations/react/) and the JSON Forms React [seed repository](https://github.com/eclipsesource/jsonforms-react-seed) for examples on how to integrate JSON Forms with your application.

You can combine [JSON Forms React](https://github.com/eclipsesource/jsonforms/blob/master/packages/react) with other renderers too, for example with the [Vanilla Renderers](https://github.com/eclipsesource/jsonforms/blob/master/packages/vanilla-renderers).

Check <https://www.npmjs.com/search?q=%40jsonforms> for all published JSONForms packages.

### Quick start

Install JSON Forms Core, React and React TailwindCSS Renderers

```bash
npm i --save @jsonforms/core @jsonforms/react tailwind-form-renderer
```

Use the `JsonForms` component for each form you want to render and hand over the renderer set.

```js
import React, { useState } from 'react';
import TailwindRenderer from 'tailwind-form-renderer';

function App() {
  const [data, setData] = useState(initialData);
  return (
    <div className='App'>
        <TailwindRenderer
          schema={schema}
          uischema={uischema}
          data={data}
          onChange={(d) =>setData(d.data)}
        />
    </div>
  );
}
```

## License

The JSON Forms project is licensed under the MIT License. See the [LICENSE file](https://github.com/yuviSomavamshi/tailwind-form-renderer/blob/main/LICENSE) for more information.

