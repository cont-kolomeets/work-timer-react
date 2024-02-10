import React from "react";
import ReactDOM from "react-dom/client";
import WorkTimer from "./WorkTimer";
import { Provider } from "react-redux";
import AppStore from "./store/AppStore";

// setInterval(() => {
//   console.log(AppStore.getState());
//   setTime(10);
// }, 1000);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={AppStore}>
      <WorkTimer />
    </Provider>
  </React.StrictMode>
);
