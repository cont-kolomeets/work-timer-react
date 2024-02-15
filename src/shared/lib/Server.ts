import { nanoid } from "@reduxjs/toolkit";
import { SavedState, SavedState_Task } from "../model/interfaces";

const KEY = "workTimer.savedState";

/**
 * Fake REST API. Stores the saved state.
 */
class ServerClass {
  // State

  async getState(): Promise<SavedState> {
    let storageItem = localStorage.getItem(KEY);
    const json: SavedState = storageItem
      ? JSON.parse(storageItem)
      : {
          years: {
            2024: {
              months: {
                2: {
                  tasks: [
                    {
                      id: nanoid(8),
                      issueNumber: 1000,
                      label: "Create work timer app 1",
                      modified: Date.now(),
                    },
                    {
                      id: nanoid(8),
                      issueNumber: 2000,
                      label: "Create work timer app 2",
                      modified: Date.now(),
                    },
                  ],
                },
              },
            },
          },
        };
    return json;
  }

  async postState(data: SavedState): Promise<void> {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  // Tasks

  async getTasks({
    year,
    month,
  }: {
    year: number;
    month: number;
  }): Promise<Record<number, SavedState_Task>> {
    const state = await this.getState();
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    return state.years[year]?.months?.[month]?.tasks || [];
  }

  async postTasks({
    year,
    month,
    tasks,
  }: {
    year: number;
    month: number;
    tasks: Record<number, SavedState_Task>;
  }): Promise<void> {
    const state = await this.getState();
    const y = (state.years[year] = state.years[year] || { months: {} });
    const m = (y.months[month] = y.months[month] || { days: {}, tasks: {} });
    m.tasks = tasks;
    return this.postState(state);
  }
}

export const Server = new ServerClass();
