import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type DialogState = {
  dialogOpen: boolean;
};

const initialState: DialogState = {
  dialogOpen: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setDialogState: (state, action: PayloadAction<boolean>) => {
      state.dialogOpen = action.payload;
    },
  },
  selectors: {
    getDialogState: (state) => state.dialogOpen,
  },
});

export const dialogModel = {
  actions: dialogSlice.actions,
  selectors: dialogSlice.selectors,
};

export const dialogModelReducer = dialogSlice.reducer;
