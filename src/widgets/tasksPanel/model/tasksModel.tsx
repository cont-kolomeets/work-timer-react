import {
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../../app/types";
import { SavedState_Task, client } from "../../../shared/api";
import { get1BasedDate } from "../../../shared/lib";

const taskAdaper = createEntityAdapter<SavedState_Task, string>({
  selectId: (data) => data.id,
});

const initialState = taskAdaper.getInitialState<{
  status: "idle" | "loading";
  year: number;
  month: number;
}>({
  status: "idle",
  year: get1BasedDate().y,
  month: get1BasedDate().m,
});

const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, api) => {
  const { year, month } = (api.getState() as RootState).tasks;
  const result = await client.getTasks({
    year,
    month,
  });
  return result;
});

const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async (taskId: string, api) => {
    const { year, month } = (api.getState() as RootState).tasks;
    await client.removeTask({
      year,
      month,
      taskId,
    });
    return taskId;
  }
);

const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task: SavedState_Task, api) => {
    const { year, month } = (api.getState() as RootState).tasks;
    const result = await client.updateTask({
      year,
      month,
      task,
    });
    return result;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
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
    // fetchTasks

    builder.addCase(fetchTasks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      taskAdaper.setAll(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      state.status = "idle";
    });

    // removeTask

    builder.addCase(removeTask.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(removeTask.fulfilled, (state, action) => {
      taskAdaper.removeOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(removeTask.rejected, (state) => {
      state.status = "idle";
    });

    // updateTask

    builder.addCase(updateTask.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      taskAdaper.setOne(state, action);
      state.status = "idle";
    });
    builder.addCase(updateTask.rejected, (state) => {
      state.status = "idle";
    });
  },
  selectors: {
    getLoadingStatus: (state) => state.status,
  },
});

const selectAllTaskIds = taskAdaper.getSelectors(
  (state: RootState) => state.tasks
).selectIds;

const selectAllTasks = taskAdaper.getSelectors(
  (state: RootState) => state.tasks
).selectAll;

const selectTaskById = taskAdaper.getSelectors(
  (state: RootState) => state.tasks
).selectById;

export const tasksModel = {
  actions: {
    ...tasksSlice.actions,
    fetchTasks,
    removeTask,
    updateTask,
  },
  selectors: {
    ...tasksSlice.selectors,
    selectAllTaskIds,
    selectTaskById,
    selectAllTasks,
  },
};

export const tasksModelReducer = tasksSlice.reducer;
