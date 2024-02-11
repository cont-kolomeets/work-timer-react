import React from "react";
import ReactDOM from "react-dom/client";
import WorkTimer from "./WorkTimer";
import { Provider } from "react-redux";
import AppStore from "./store/AppStore";
import { setTime } from "./components/timer/timerSlice";

setInterval(() => {
  AppStore.dispatch(setTime(AppStore.getState().timer.time + 1000))
}, 1000);

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
