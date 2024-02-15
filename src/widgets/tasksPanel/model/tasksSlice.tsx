import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { request } from "../../../shared/api";
import { SavedState_Task } from "../../../shared/model";

const taskAdaper = createEntityAdapter<SavedState_Task>();

const initialState = taskAdaper.getInitialState<{ status: "idle" | "loading" }>(
  {
    status: "idle",
  }
);

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  return request<Record<number, SavedState_Task>>("WorkTimerServer/GetTasks", {
    f: "json",
    data: { year: 2024, month: 2 },
  });
});

export const saveTasks = createAsyncThunk(
  "tasks/saveTasks",
  async (tasks: Record<number, SavedState_Task>) => {
    return request<void>("WorkTimerServer/PostTasks", {
      f: "json",
      data: { year: 2024, month: 2, tasks },
    });
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTask: (state, action: { payload: SavedState_Task }) => {
      const { id, issueNumber, label, modified } = action.payload;
      const task = state.entities[id];
      task.issueNumber = issueNumber;
      task.label = label;
      task.modified = modified;
    },
    addTask: (state, action) => {
      taskAdaper.addOne(state, action);
    },
    removeTask: (state, action) => {
      taskAdaper.removeOne(state, action);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      taskAdaper.setAll(state, action);
      state.status = "idle";
    });
  },
});

export const { updateTask, addTask, removeTask } = tasksSlice.actions;

export const { selectAll: selectTasks, selectById: selectTaskById } =
  taskAdaper.getSelectors((state: any) => state.tasks);

export const selectTaskIds = createSelector(selectTasks, (tasks) =>
  tasks.map((task) => task.id)
);

export const tasksSliceReducer = tasksSlice.reducer;
