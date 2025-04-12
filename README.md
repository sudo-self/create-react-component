# create-react-tsx

CLI tool to generate React components from the command line.

## install 

npm

```bash
 npm i create-react-tsx
```

```
npm install @sudo-self/create-react-tsx@1.0.2
```

## use

To generate a new React component:

```bash
npx create-react-tsx <component-name>
```

## example 

To generate a React component Button

```bash
 npx create-react-tsx Button
```

## return

```bash
import React, { useState } from 'react';

interface CounterProps {

}

const Counter: React.FC<CounterProps> = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  return (
    <div className="p-8 flex flex-col items-center justify-center space-y-4">
      <div className="text-2xl font-bold text-gray-800">Counter App</div>
      <div className="text-4xl font-bold text-blue-500">{count}</div>
      <div className="flex space-x-4">
        <button
          onClick={increment}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Increment
        </button>
        <button
          onClick={decrement}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          disabled={count === 0}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;
```

## by default (component-name).tsx saves to working dir



