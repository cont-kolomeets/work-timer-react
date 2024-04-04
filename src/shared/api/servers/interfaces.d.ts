import { SavedState_Day, SavedState_Task } from "../interfaces";

export interface IWorkTimerServer {
  //--------------------------------------------------------------------------
  //
  // Month data
  //
  //--------------------------------------------------------------------------

  getMonthData(params: {
    year: number;
    month: number;
  }): Promise<Record<number, SavedState_Day>>;

  getDayData(params: {
    year: number;
    month: number;
    day: number;
  }): Promise<SavedState_Day>;

  updateDay(params: {
    year: number;
    month: number;
    dayInfo: Partial<SavedState_Day>;
  }): Promise<SavedState_Day>;

  //--------------------------------------------------------------------------
  //
  // Tasks
  //
  //--------------------------------------------------------------------------

  getTasks(params: {
    year: number;
    month: number;
  }): Promise<Record<number, SavedState_Task>>;

  removeTask(params: {
    year: number;
    month: number;
    taskId: string;
  }): Promise<void>;

  undoRemoveTask({ taskId }: { taskId: string }): Promise<void>;

  updateTask(params: {
    year: number;
    month: number;
    task: SavedState_Task;
  }): Promise<SavedState_Task>;

  //--------------------------------------------------------------------------
  //
  // Dept
  //
  //--------------------------------------------------------------------------

  getDept(params: { year: number }): Promise<number>;

  updateDept(params: { year: number; dept: number }): Promise<void>;

  //--------------------------------------------------------------------------
  //
  // Report
  //
  //--------------------------------------------------------------------------

  createReport(params: { year: number; month: number }): Promise<string>;
}
