import { SavedState_Day, SavedState_Task } from "./interfaces";

const _connectToServer = async () => (await import("./server/server")).server;

export const client = {
  //--------------------------------------------------------------------------
  //
  // Month data
  //
  //--------------------------------------------------------------------------

  getMonthData: async (params: { year: number; month: number }) => {
    return (await _connectToServer()).getMonthData(params);
  },

  getDayData: async (params: { year: number; month: number; day: number }) => {
    return (await _connectToServer()).getDayData(params);
  },

  updateDay: async (params: {
    year: number;
    month: number;
    dayInfo: Partial<SavedState_Day>;
  }) => {
    return (await _connectToServer()).updateDay(params);
  },

  //--------------------------------------------------------------------------
  //
  // Tasks
  //
  //--------------------------------------------------------------------------

  getTasks: async (params: { year: number; month: number }) => {
    return (await _connectToServer()).getTasks(params);
  },

  updateTask: async (params: {
    year: number;
    month: number;
    task: SavedState_Task;
  }) => {
    return (await _connectToServer()).updateTask(params);
  },

  removeTask: async (params: {
    year: number;
    month: number;
    taskId: string;
  }) => {
    return (await _connectToServer()).removeTask(params);
  },

  //--------------------------------------------------------------------------
  //
  // Dept
  //
  //--------------------------------------------------------------------------

  getDept: async (params: { year: number }) => {
    return (await _connectToServer()).getDept(params);
  },

  updateDept: async (params: { year: number; dept: number }) => {
    return (await _connectToServer()).updateDept(params);
  },
};
