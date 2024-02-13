import { createSlice } from "@reduxjs/toolkit";
import { GridData } from "./DaysGrid";

type GridState = {
  data: GridData[];
};

type GridAction = {
  payload: GridData[];
};

const initialState: GridState = {
  data: [
    {
      dayIndex: 1,
      dayTime: 0,
      isCurrent: true
    }
  ],
};

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setData: (state, action: GridAction) => {
      state.data = action.payload;
    },
  },
  selectors: {
    getData: (state) => state.data,
  },
});

export const { setData } = gridSlice.actions;
export const { getData } = gridSlice.selectors;
export default gridSlice.reducer;
