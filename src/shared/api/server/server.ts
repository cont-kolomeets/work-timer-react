import {
  SavedState,
  SavedState_Day,
  SavedState_Month,
  SavedState_Task,
  SavedState_Year,
} from "../interfaces";

const KEY = "workTimer.savedState";

const DEFAULT_STATE: SavedState = {
  years: {
    2024: {
      months: {
        2: {
          days: {
            1: {
              index: 1,
              time: 100000,
              workIntervals: [],
            },
          },
          tasks: [
            {
              issue: 1000,
              label: "Create work timer app 1",
              modified: Date.now(),
            },
            {
              issue: 2000,
              label: "Create work timer app 2",
              modified: Date.now(),
            },
          ],
        },
      },
    },
  },
};

/**
 * Fake REST API. Stores the saved state.
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
    return m.days;
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
    m.days[index] = Object.assign(m.days[index] || {}, dayInfo);
    await this._postState(state);
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
    return m.tasks;
  }

  async removeTask({
    year,
    month,
    taskId,
  }: {
    year: number;
    month: number;
    taskId: number;
  }): Promise<void> {
    const { state, m } = await this._provideMonth({ year, month });
    delete m.tasks[taskId];
    await this._postState(state);
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
    m.tasks[task.issue] = task;
    await this._postState(state);
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
    await this._postState(state);
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
    const y = (state.years[year] = state.years[year] || { months: {} });
    const m = (y.months[month] = y.months[month] || {});
    m.days = m.days || {};
    m.tasks = m.tasks || {};
    return { state, y, m };
  }

  // State

  private _cachedState: SavedState | null = null;

  private async _getState(): Promise<SavedState> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (this._cachedState) {
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

  private async _postState(data: SavedState): Promise<void> {
    this._pendingPostState = data;
    clearTimeout(this._postH as number);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this._postH = setTimeout(() => {
      localStorage.setItem(KEY, JSON.stringify(this._pendingPostState));
    }, 5000) as any;
  }
}

export const server = new ServerClass();
