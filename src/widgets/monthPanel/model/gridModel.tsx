import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../../app/types";
import { client } from "../../../shared/api";
import { get1BasedDate } from "../../../shared/lib";
import { GridDayData } from "./interfaces";

type GridState = {
  year: number;
  month: number;
  data: GridDayData[];
  dept: number;
  status: "idle" | "loading";
};

const initialState: GridState = {
  year: get1BasedDate().y,
  month: get1BasedDate().m,
  data: [],
  dept: 0,
  status: "idle",
};

const fetchGridData = createAsyncThunk("grid/fetchGridData", async (_, api) => {
  const { year, month } = (api.getState() as RootState).grid;
  const monthData = client.getMonthData({ year, month });
  const dept = client.getDept({ year });
  const result = await Promise.all([monthData, dept]);
  return { monthData: result[0], dept: result[1] };
});

const editGridData = createAsyncThunk(
  "grid/editGridData",
  async (data: GridDayData, api) => {
    const { year, month } = (api.getState() as RootState).grid;
    const result = client.updateDay({
      year,
      month,
      dayInfo: {
        index: data.index,
        time: data.time,
      },
    });
    return result;
  }
);

const editDept = createAsyncThunk(
  "grid/editDept",
  async (dept: number, api) => {
    const { year } = (api.getState() as RootState).grid;
    await client.updateDept({ year, dept });
  }
);

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setDate: (
      state,
      action: PayloadAction<{ year: number; month: number }>
    ) => {
      state.year = action.payload.year;
      state.month = action.payload.month;
    },
  },
  extraReducers: (builder) => {
    // fetchGridData

    builder.addCase(fetchGridData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchGridData.fulfilled, (state, result) => {
      const { monthData, dept } = result.payload;
      state.data = Object.values(monthData).sort((a, b) => a.index - b.index);
      state.dept = dept;
      state.status = "idle";
    });
    builder.addCase(fetchGridData.rejected, (state) => {
      state.data = [];
      state.dept = 0;
      state.status = "idle";
    });

    // editGridData

    builder.addCase(editGridData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(editGridData.fulfilled, (state, action) => {
      const updatedDay = action.payload;
      const data = state.data.find((data) => data.index === updatedDay.index);
      data && (data.time = updatedDay.time);
      state.status = "idle";
    });
    builder.addCase(editGridData.rejected, (state) => {
      state.status = "idle";
    });
  },
  selectors: {
    getLoaingStatus: (state) => state.status,
    getYear: (state) => state.year,
    getMonth: (state) => state.month,
  },
});

const selectMonthData = createSelector(
  (state: RootState) => state.grid,
  (state) => state.data
);

const selectDept = createSelector(
  (state: RootState) => state.grid,
  (state) => state.dept
);

export const gridModel = {
  actions: {
    ...gridSlice.actions,
    fetchGridData,
    editGridData,
    editDept,
  },
  selectors: {
    ...gridSlice.selectors,
    selectMonthData,
    selectDept,
  },
};

export const gridModelReducer = gridSlice.reducer;
