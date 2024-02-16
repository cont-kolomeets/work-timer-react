import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AlertState = {
  stack: AlertInfo[];
};

type AlertInfo = {
  id: string;
  title: string;
  message: string;
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
    getAlertById: (state, id: string) => {
      return state.stack.find((a) => a.id === id);
    },
    getAllAlerts: (state) => {
      return state.stack;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export const { getAlertById, getAllAlerts } = alertSlice.selectors;
export const alertSliceReducer = alertSlice.reducer;
