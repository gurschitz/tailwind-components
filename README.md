# Tailwind Components

A useful little helper library for [tailwindcss](https://tailwindcss.com/).

## Example

In your Components, you can use tailwind-components like in the following example.

```javascript
import React, { useState } from "react";
import tw from "tailwind-components";

const Container = tw.div.className`p-4 flex justify-between items-center`;

function Component() {
  const [active, setActive] = useState(false);

  return (
    <Container className={{ "bg-green-300": active, "bg-blue-300": !active }}>
      <tw.p className={{ "text-green-900": active }}>
        {active ? "I am active" : "I am inactive"}
      </tw.p>
      <tw.button
        className="ml-2 px-2 py-3 border bg-white"
        onClick={() => setActive(active => !active)}
      >
        Click Me
      </tw.button>
    </Container>
  );
}

export default Component;
```

The `className` prop usage is inspired by the Object Syntax in Vue.js. You can pass a string, an object with booleans as values as well as an array that contains either strings or objects.

## Prefix

If your tailwind classes have a prefix, you can do the following:
In your index.js file, you can pass the tailwind config with `setTailwindConfig`.

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { setTailwindConfig } from "tailwind-components";
import tailwindConfig from "./tailwind.config.js";

setTailwindConfig(tailwindConfig);

ReactDOM.render(<App />, document.getElementById("root"));
```

Once you have done this, the prefix is added automatically to all your classes when you use tailwind-components.
