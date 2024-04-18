import { clone, get1BasedDate, getNumDaysInMonth } from "../../../lib";
import { SavedState_Day, SavedState_Task } from "../../interfaces";
import { IWorkTimerServer } from "../interfaces";
import {
  createTasksReportDay,
  createTasksReportMonth,
} from "../localServer/createReportUtil";
import { RemoteClient } from "./client";

export type User = {
  username: string;
  fullName: string;
};

const TOKEN_KEY = "workTimer.token";
const client = new RemoteClient();

/**
 * REST API wrapper. Caches loaded data.
 * Returns copies of objects.
 */
class ServerClass implements IWorkTimerServer {
  //--------------------------------------------------------------------------
  //
  // User
  //
  //--------------------------------------------------------------------------

  private _user: User | null = null;

  getSignedInUser(): User | null {
    return this._user;
  }

  async checkSignInState(): Promise<boolean> {
    client.token = localStorage.getItem(TOKEN_KEY);
    if (!client.token) {
      return false;
    }
    return client.sendGet("checkToken").then(({ data }) => {
      if (!data.valid) {
        return false;
      }
      // our token is valid, can get the user
      return client.sendGet("user").then((data) => {
        this._user = data;
        return true;
      });
    });
  }

  async signIn({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<boolean> {
    client.token = null;
    return client
      .sendGet(`getToken?username=${username}&password=${password}`)
      .then((data) => {
        if (!data.token) {
          return false;
        }
        localStorage.setItem(TOKEN_KEY, data.token);
        return this.checkSignInState();
      });
  }

  async register(params: {
    username: string;
    password: string;
    fullName: string;
  }): Promise<boolean> {
    client.token = null;
    return client.sendPost("user", params).then((data) => {
      return !data.error;
    });
  }

  async checkUserNameAvailable(username: string): Promise<boolean> {
    return !username
      ? false
      : client.sendGet("checkUserName?username" + username).then((data) => {
          return data.exists === false;
        });
  }

  signOut(): boolean {
    localStorage.removeItem(TOKEN_KEY);
    client.token = null;
    this._user = null;
    return true;
  }

  //--------------------------------------------------------------------------
  //
  // Month data
  //
  //--------------------------------------------------------------------------

  private _daysCache: Record<string, Record<number, SavedState_Day>> = {};
  private _pendingUpdate: {
    year: number;
    month: number;
    dayInfo: Partial<SavedState_Day>;
  } | null = null;
  private _updateTimerH: any;

  async getMonthData({
    year,
    month,
  }: {
    year: number;
    month: number;
  }): Promise<Record<number, SavedState_Day>> {
    const days = await this._provideMonthDays({ year, month });
    return clone(days);
  }

  async getDayData({
    year,
    month,
    day,
  }: {
    year: number;
    month: number;
    day: number;
  }): Promise<SavedState_Day> {
    const days = await this._provideMonthDays({ year, month });
    return clone(days[day]);
  }

  private async _provideMonthDays({
    year,
    month,
  }: {
    year: number;
    month: number;
  }): Promise<Record<number, SavedState_Day>> {
    if (this._pendingUpdate) {
      await this._doUpdate();
    }

    if (this._daysCache[year + "/" + month]) {
      return this._daysCache[year + "/" + month];
    }

    const serverDays = await client.sendGet<any[]>(
      `days?year=${year}&month=${month}`
    );
    const cache: Record<number, SavedState_Day> = {};
    serverDays?.forEach((sDay) => {
      const day: SavedState_Day = {
        index: sDay.day,
        time: sDay.time || 0,
        workIntervals: sDay.workIntervals || [],
      };
      cache[day.index] = day;
    });
    for (let i = 0; i < getNumDaysInMonth(year, month); i++) {
      cache[i + 1] = cache[i + 1] || {
        index: i + 1,
        time: 0,
        workIntervals: [],
      };
    }

    return (this._daysCache[year + "/" + month] = cache);
  }

  async updateDay({
    year,
    month,
    dayInfo,
  }: {
    year: number;
    month: number;
    dayInfo: Partial<SavedState_Day>;
  }): Promise<void> {
    this._pendingUpdate = { year, month, dayInfo: clone(dayInfo) };
    this._updateTimerH =
      this._updateTimerH || setTimeout(() => this._doUpdate(), 60_000);
  }

  private async _doUpdate(): Promise<void> {
    if (!this._pendingUpdate) {
      return;
    }

    const { year, month, dayInfo } = this._pendingUpdate;
    this._pendingUpdate = null;
    clearTimeout(this._updateTimerH);
    this._updateTimerH = null;

    await client.sendPost(
      `day?year=${year}&month=${month}&day=${dayInfo.index}`,
      {
        time: dayInfo.time,
        workIntervals: dayInfo.workIntervals,
      }
    );
    // invalidate cache
    delete this._daysCache[year + "/" + month];
  }

  //--------------------------------------------------------------------------
  //
  // Tasks
  //
  //--------------------------------------------------------------------------

  private _tasksCache: Record<string, Record<string, SavedState_Task>> = {};

  async getTasks({
    year,
    month,
  }: {
    year: number;
    month: number;
  }): Promise<Record<string, SavedState_Task>> {
    const tasks = await this._fetchTasks({ year, month });
    return clone(tasks);
  }

  private async _fetchTasks({
    year,
    month,
  }: {
    year: number;
    month: number;
  }): Promise<Record<string, SavedState_Task>> {
    if (this._tasksCache[year + "/" + month]) {
      return this._tasksCache[year + "/" + month];
    }
    const serverTasks = (await client.sendGet(
      `tasks?year=${year}&month=${month}`
    )) as any[];
    const cache: Record<number, SavedState_Task> = {};
    serverTasks?.forEach((sTask) => {
      cache[sTask.id] = sTask;
    });
    return (this._tasksCache[year + "/" + month] = cache);
  }

  private _removedCache: Record<
    string,
    { year: number; month: number; task: SavedState_Task }
  > = {};

  async removeTask({
    year,
    month,
    taskId,
  }: {
    year: number;
    month: number;
    taskId: string;
  }): Promise<void> {
    const tasks = await this._fetchTasks({ year, month });
    this._removedCache[taskId] = { year, month, task: tasks[taskId] };
    await client.sendDelete("tasks/" + taskId);
    // invalidate cache
    delete this._tasksCache[year + "/" + month];
  }

  async undoRemoveTask({ taskId }: { taskId: string }): Promise<void> {
    const info = this._removedCache[taskId];
    if (info) {
      delete this._removedCache[taskId];
      const { year, month, task } = info;
      task.id = ""; // a new id will have to be created
      await this.updateOrCreateTask({ year, month, task, isRestoring: true });
    }
  }

  async updateOrCreateTask({
    year,
    month,
    task,
    isRestoring,
  }: {
    year: number;
    month: number;
    task: SavedState_Task;
    isRestoring?: boolean;
  }): Promise<SavedState_Task> {
    if (!isRestoring) {
      !task.id && (task.created = Date.now());
      task.modified = Date.now();
    }

    const data: any = { ...task };
    delete data.id;
    delete data.year;
    delete data.month;

    if (!task.id) {
      // create
      const newTask = await client.sendPost<{ id: string }>(
        `tasks?year=${year}&month=${month}`,
        data
      );
      task.id = newTask.id; // update the id
    } else {
      // update
      await client.sendPatch(`tasks/` + task.id, data);
    }

    // invalidate cache
    delete this._tasksCache[year + "/" + month];
    return task;
  }

  //--------------------------------------------------------------------------
  //
  // Dept
  //
  //--------------------------------------------------------------------------

  private _dept = -1;

  async getDept(): Promise<number> {
    const dept = await this._fetchDept();
    return dept || 0;
  }

  private async _fetchDept(): Promise<number> {
    if (this._dept >= 0) {
      return this._dept;
    }
    const response = await client.sendGet<{ dept: number }>(`dept`);
    return (this._dept = response.dept || 0);
  }

  async updateDept({ dept }: { dept: number }): Promise<void> {
    await client.sendPost(`dept`, { dept });
    // invalidate cache
    this._dept = -1;
  }

  //--------------------------------------------------------------------------
  //
  // Report
  //
  //--------------------------------------------------------------------------

  async createReportDay({
    year,
    month,
    day,
  }: {
    year: number;
    month: number;
    day: number;
  }): Promise<string> {
    const tasksCache = await this.getTasks({ year, month });
    const tasks = Object.values(tasksCache).filter(
      (task) => get1BasedDate(task.modified).d === day
    );
    return createTasksReportDay(tasks);
  }

  async createReportMonth({
    year,
    month,
  }: {
    year: number;
    month: number;
  }): Promise<string> {
    const tasks = await this.getTasks({ year, month });
    return createTasksReportMonth(Object.values(tasks));
  }
}

export const server = new ServerClass();
