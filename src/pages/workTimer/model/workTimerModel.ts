import { PayloadAction } from "@reduxjs/toolkit";

function syncTime(): PayloadAction<void> {
  return { type: "sync-time", payload: void 0 };
}

export const workTimerModel = {
  actions: {
    syncTime,
  },
};

export function workTimerReducer(state: any, action: any): void {}
