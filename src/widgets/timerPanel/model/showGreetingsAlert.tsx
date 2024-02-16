import { nanoid } from "@reduxjs/toolkit";
import { appStore } from "../../../app/appStore";
import { showAlert } from "../../../entities/alert/model/alertSlice";

let numCalls = 0;

export function showGreetingsAlert() {
  if (appStore.getState().alert.stack.length) {
    return;
  }

  const isAm = new Date().getHours() < 12;

  appStore.dispatch(
    showAlert({
      id: nanoid(8),
      title: numCalls ? "Welcome back!" : isAm ? "Good morning!" : "Good day!",
      message: numCalls ? "Nice to see you again!" : "Have a nice day!",
    })
  );

  numCalls++;
}
