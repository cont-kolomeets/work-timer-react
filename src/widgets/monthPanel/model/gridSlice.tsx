import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GridDayData } from "./interfaces";

type GridState = {
  data: GridDayData[];
};

const initialState: GridState = {
  data: [
    {
      index: 1,
      time: 0,
      isCurrent: true,
    },
  ],
};

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setMonthData: (state, action: PayloadAction<GridDayData[]>) => {
      state.data = action.payload;
    },
    updateDayData: (state, action: PayloadAction<GridDayData>) => {
      const data = state.data.find(
        (data) => data.index === action.payload.index
      );
      data && (data.time = action.payload.time);
    },
  },
  selectors: {
    getMonthData: (state) => state.data,
  },
});

export const { setMonthData, updateDayData } = gridSlice.actions;
export const { getMonthData } = gridSlice.selectors;
export const gridSliceReducer = gridSlice.reducer;
