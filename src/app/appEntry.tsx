import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { WorkTimer } from "../pages/workTimer";
import { appStore } from "./appStore";

import "bootstrap-icons/font/bootstrap-icons.scss";
import "bootstrap/dist/css/bootstrap.css";
import "../shared/css/common.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <WorkTimer />
    </Provider>
  </React.StrictMode>
);
