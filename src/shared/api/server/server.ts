import {
  SavedState,
  SavedState_Day,
  SavedState_Month,
  SavedState_Task,
  SavedState_Year,
} from "../interfaces";

const KEY = "workTimer.savedState";
const SEVER_LATENCY = 250; // ms

localStorage.removeItem(KEY); // remove for testing

// for testing
//const { d, m, y } = get1BasedDate();
const DEFAULT_STATE: SavedState = {}; /*
  years: {
    [y]: {
      months: {
        [m]: {
          days: {
            [d]: {
              index: d,
              time: 100000,
              workIntervals: [
                [3600 * 1000 * 8, 3600 * 1000 * 12],
                [3600 * 1000 * 13, 3600 * 1000 * 15],
                [3600 * 1000 * 20, 3600 * 1000 * 23],
              ],
            },
          },
          tasks: {
            1000: {
              issue: 1000,
              label: "Create work timer app 1",
              time: 1e7,
              modified: Date.now(),
            },
            2000: {
              issue: 2000,
              label: "Create work timer app 2",
              time: 2e7,
              modified: Date.now(),
            },
          },
        },
      },
    },
  },
};*/

/**
 * Fake REST API. Stores the saved state.
 * Returns copies of objects.
 * Copies data when writing.
 */
class ServerClass {
  //--------------------------------------------------------------------------
  //
  // Month data
  //
  //--------------------------------------------------------------------------

  async getMonthData({
    year,
    month,
  }: {
    year: number;
    month: number;
  }): Promise<Record<number, SavedState_Day>> {
    const { m } = await this._provideMonth({ year, month });
    return JSON.parse(JSON.stringify(m.days));
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
    const { m } = await this._provideMonth({ year, month });
    return JSON.parse(
      JSON.stringify(
        m.days[day] || {
          index: day,
          time: 0,
          workIntervals: [],
        }
      )
    );
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
    const { state, m } = await this._provideMonth({ year, month });
    const { index } = dayInfo as SavedState_Day;
    m.days[index] = { ...m.days[index], ...dayInfo };
    this._postState(state);
    return m.days[index];
  }

  //--------------------------------------------------------------------------
  //
  // Tasks
  //
  //--------------------------------------------------------------------------

  async getTasks({
    year,
    month,
  }: {
    year: number;
    month: number;
  }): Promise<Record<number, SavedState_Task>> {
    const { m } = await this._provideMonth({ year, month });
    return JSON.parse(JSON.stringify(m.tasks));
  }

  async removeTask({
    year,
    month,
    taskId,
  }: {
    year: number;
    month: number;
    taskId: string;
  }): Promise<void> {
    const { state, m } = await this._provideMonth({ year, month });
    delete m.tasks[taskId];
    this._postState(state);
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
    const { state, m } = await this._provideMonth({ year, month });
    m.tasks[task.id] = { ...task };
    this._postState(state);
    return task;
  }

  //--------------------------------------------------------------------------
  //
  // Dept
  //
  //--------------------------------------------------------------------------

  async getDept({ year }: { year: number }): Promise<number> {
    const { y } = await this._provideMonth({ year, month: 1 });
    return y.dept || 0;
  }

  async updateDept({
    year,
    dept,
  }: {
    year: number;
    dept: number;
  }): Promise<void> {
    const { state, y } = await this._provideMonth({ year, month: 1 });
    y.dept = dept;
    this._postState(state);
  }

  //--------------------------------------------------------------------------
  //
  // Private
  //
  //--------------------------------------------------------------------------

  private async _provideMonth({
    year,
    month,
  }: {
    year: number;
    month: number;
  }): Promise<{ state: SavedState; y: SavedState_Year; m: SavedState_Month }> {
    const state = await this._getState();
    const ys = (state.years = state.years || {});
    const y = (ys[year] = ys[year] || { months: {} });
    const m = (y.months[month] = y.months[month] || {});
    m.days = m.days || {};
    m.tasks = m.tasks || {};
    return { state, y, m };
  }

  // State

  private _cachedState: SavedState | null = null;

  private async _getState(): Promise<SavedState> {
    await new Promise((resolve) => setTimeout(resolve, SEVER_LATENCY));
    if (this._cachedState) {
      console.log(this._cachedState);
      return this._cachedState;
    }
    let storageItem = localStorage.getItem(KEY);
    const json: SavedState = storageItem
      ? JSON.parse(storageItem)
      : DEFAULT_STATE;
    return (this._cachedState = json);
  }

  private _postH: number | null = null;
  private _pendingPostState: SavedState | null = null;

  private _postState(data: SavedState): void {
    this._pendingPostState = data;
    clearTimeout(this._postH as number);
    this._postH = setTimeout(() => {
      localStorage.setItem(KEY, JSON.stringify(this._pendingPostState));
    }, 5000) as any;
  }
}

export const server = new ServerClass();
