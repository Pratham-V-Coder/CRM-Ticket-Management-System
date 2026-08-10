import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./index.css"; // <-- Keep Tailwind AFTER Bootstrap

import { Provider } from "react-redux";
import store from "./store";
import { loadAuthFromStorage } from "./authBootstrap/authBootstrap";

loadAuthFromStorage(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
