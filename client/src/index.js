import React from "react";
import ReactDOM from "react-dom/client";
import Component from "./Component";

console.log(React);
console.log(ReactDOM);
console.log(Component);

const rootElement = document.querySelector('#root');
const root = ReactDOM.createRoot(rootElement);

root.render(<Component />);