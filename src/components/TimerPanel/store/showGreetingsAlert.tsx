import { nanoid } from "@reduxjs/toolkit";
import { showAlert } from "../../shared/Alert/store/alertSlice";
import AppStore from "../../../store/AppStore";

let numCalls = 0;

export default function showGreetingsAlert() {
  const isAm = new Date().getHours() < 12;

  AppStore.dispatch(
    showAlert({
      id: nanoid(8),
      title: numCalls ? "Welcome back!" : isAm ? "Good morning!" : "Good day!",
      message: numCalls ? "Nice to see you again!" : "Have a nice day!",
    })
  );

  numCalls++;
}
