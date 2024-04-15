import { SavedState_Day, SavedState_Task } from "../interfaces";

export interface IWorkTimerServer {
  //--------------------------------------------------------------------------
  //
  // User
  //
  //--------------------------------------------------------------------------

  checkSignInState(): Promise<boolean>;
  getSignedInUser(): {
    username: string;
    fullName: string;
  } | null;
  signIn(params: { username: string; password: string }): Promise<boolean>;
  register(params: {
    username: string;
    password: string;
    fullName: string;
  }): Promise<boolean>;
  checkUserNameAvailable(username: string): Promise<boolean>;
  signOut(): boolean;

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
  }): Promise<void>;

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

  updateOrCreateTask(params: {
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

  createReportDay(params: {
    year: number;
    month: number;
    day: number;
  }): Promise<string>;
  createReportMonth(params: { year: number; month: number }): Promise<string>;
}
