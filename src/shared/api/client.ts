import { SavedState_Day, SavedState_Task } from "./interfaces";
import { IWorkTimerServer } from "./servers/interfaces";

const useRemoveServer = !window.location.href.includes("local=true");

const _connectToServer = async (): Promise<IWorkTimerServer> => {
  if (useRemoveServer) {
    return (await import("./servers/remoteServer/server")).server;
  }
  return (await import("./servers/localServer/server")).server;
};

export const client = {
  //--------------------------------------------------------------------------
  //
  // User
  //
  //--------------------------------------------------------------------------

  checkSignInState: async (): Promise<boolean> => {
    return (await _connectToServer()).checkSignInState();
  },

  getSignedInUser: async (): Promise<{
    username: string;
    fullName: string;
  } | null> => {
    return (await _connectToServer()).getSignedInUser();
  },

  signIn: async (params: {
    username: string;
    password: string;
  }): Promise<boolean> => {
    return (await _connectToServer()).signIn(params);
  },

  register: async (params: {
    username: string;
    password: string;
    fullName: string;
  }): Promise<boolean> => {
    return (await _connectToServer()).register(params);
  },

  checkUserNameAvailable: async (username: string): Promise<boolean> => {
    return (await _connectToServer()).checkUserNameAvailable(username);
  },

  signOut: async (): Promise<boolean> => {
    return (await _connectToServer()).signOut();
  },

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
    return (await _connectToServer()).updateOrCreateTask(params);
  },

  removeTask: async (params: {
    year: number;
    month: number;
    taskId: string;
  }) => {
    return (await _connectToServer()).removeTask(params);
  },

  undoRemoveTask: async (params: { taskId: string }) => {
    return (await _connectToServer()).undoRemoveTask(params);
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

  //--------------------------------------------------------------------------
  //
  // Report
  //
  //--------------------------------------------------------------------------

  async createReportDay(params: {
    year: number;
    month: number;
    day: number;
  }): Promise<string> {
    return (await _connectToServer()).createReportDay(params);
  },

  async createReportMonth(params: {
    year: number;
    month: number;
  }): Promise<string> {
    return (await _connectToServer()).createReportMonth(params);
  },
};
