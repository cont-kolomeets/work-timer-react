import { getLoggedInUser, getNumDaysInMonth } from "../../../lib";
import { SavedState_Day, SavedState_Task } from "../../interfaces";
import { IWorkTimerServer } from "../interfaces";
import { createTasksReport } from "../localServer/createReportUtil";
import { fetchDelete, getJSON, postJSON, putJSON } from "./fetchUtil";

const API_URL = "http://localhost:5000/api/";

// Example POST method implementation:
// async function postData(url = "", data = {}) {
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     mode: "cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//       //"Content-Type": "application/json",
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     redirect: "follow", // manual, *follow, error
//     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   });
//   return response.json(); // parses JSON response into native JavaScript objects
// }

/**
 * Fake REST API. Stores the saved state.
 * Returns copies of objects.
 * Copies data when writing.
 */
class ServerClass implements IWorkTimerServer {
  //--------------------------------------------------------------------------
  //
  // Month data
  //
  //--------------------------------------------------------------------------

  private _daysCache: Record<string, Record<number, SavedState_Day>> = {};

  async getMonthData({
    year,
    month,
  }: {
    year: number;
    month: number;
  }): Promise<Record<number, SavedState_Day>> {
    const days = await this._provideMonthDays({ year, month });
    return JSON.parse(JSON.stringify(days));
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
    return JSON.parse(JSON.stringify(days[day]));
  }

  private async _provideMonthDays({
    year,
    month,
  }: {
    year: number;
    month: number;
  }): Promise<Record<number, SavedState_Day>> {
    if (this._daysCache[year + "/" + month]) {
      return this._daysCache[year + "/" + month];
    }

    const serverDays = (await getJSON(
      API_URL + `days?user=${getLoggedInUser()}&year=${year}&month=${month}`
    )) as any[];
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
  }): Promise<SavedState_Day> {
    await postJSON(
      API_URL +
        `day?user=${getLoggedInUser()}&year=${year}&month=${month}&day=${
          dayInfo.index
        }`,
      {
        time: dayInfo.time,
        workIntervals: dayInfo.workIntervals,
      }
    );
    // invalidate cache
    delete this._daysCache[year + "/" + month];
    return this.getDayData({ year, month, day: dayInfo.index as number });
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
    return JSON.parse(JSON.stringify(tasks));
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
    const serverTasks = (await getJSON(
      API_URL + `tasks?user=${getLoggedInUser()}&year=${year}&month=${month}`
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
    await fetchDelete(API_URL + "task/" + taskId);
    // invalidate cache
    delete this._tasksCache[year + "/" + month];
  }

  async undoRemoveTask({ taskId }: { taskId: string }): Promise<void> {
    const info = this._removedCache[taskId];
    if (info) {
      delete this._removedCache[taskId];
      const { year, month, task } = info;
      task.id = ""; // a new id will have to be created
      await this.updateTask({ year, month, task });
    }
  }

  async updateTask({
    year,
    month,
    task,
  }: {
    year: number;
    month: number;
    task: SavedState_Task;
  }): Promise<SavedState_Task> {
    const data: any = { ...task };
    delete data.id;
    delete data.year;
    delete data.month;

    if (!task.id) {
      // create
      const newTask = await postJSON(
        API_URL + `task?user=${getLoggedInUser()}&year=${year}&month=${month}`,
        data
      );
      task.id = newTask.id; // update the id
    } else {
      // update
      await putJSON(API_URL + `task/` + task.id, data);
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
    const response = (await getJSON(
      API_URL + `dept?user=${getLoggedInUser()}`
    )) as any;
    return (this._dept = response?.dept || 0);
  }

  async updateDept({ dept }: { dept: number }): Promise<void> {
    await postJSON(API_URL + `dept?user=${getLoggedInUser()}`, { dept });
    // invalidate cache
    this._dept = -1;
  }

  //--------------------------------------------------------------------------
  //
  // Report
  //
  //--------------------------------------------------------------------------

  async createReport({
    year,
    month,
  }: {
    year: number;
    month: number;
  }): Promise<string> {
    const tasks = await this.getTasks({ year, month });
    return createTasksReport(Object.values(tasks));
  }
}

export const server = new ServerClass();
