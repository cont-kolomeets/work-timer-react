import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AlertState = {
  stack: AlertInfo[];
};

type AlertInfo = {
  id: string;
  title: string;
  message: string;
  link?: string;
  linkAction?: any;
};

const initialState: AlertState = {
  stack: [],
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<AlertInfo>) => {
      state.stack.push(action.payload);
    },
    hideAlert: (state, action: PayloadAction<string>) => {
      state.stack = state.stack.filter((a) => a.id !== action.payload);
    },
  },
  selectors: {
    getShownAlerts: (state) => state.stack,
    getNumShownAlerts: (state) => state.stack.length,
  },
});

export const alertModel = {
  actions: alertSlice.actions,
  selectors: alertSlice.selectors,
};

export const alertModelReducer = alertSlice.reducer;
