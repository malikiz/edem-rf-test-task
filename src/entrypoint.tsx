import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux'

import store from './store'
import App from "./App";
import { cssVariables } from "./constants";

const rootElement = document.getElementById("root");
const headElement = document.getElementsByTagName('head')![0]!
const styleElement = document.createElement('style') as HTMLStyleElement

styleElement.innerText = `:root {${Object.entries(cssVariables).map(([key, value]) => {
  return `${key}: ${value}`
}).join(';')}}`

headElement.appendChild(styleElement)

// New as of React v18.x
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
