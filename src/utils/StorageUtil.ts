import { DayInfo } from "./DayInfoUtil";
import { partsToTotal } from "./TimeConvertUtil";

export type StateItem = {
  years: Record<string, StateItemYear>;
};

export type StateItemYear = {
  months: Record<number, StateItemMonth>;
  dept?: number;
};

export type StateItemMonth = {
  timeNeeded: number;
  days: Record<number, DayInfo | number /* old format */>;
};

export const DEFAULT_STATE_ITEM: StateItem = {
  years: {
    "2016": {
      months: {
        "1": {
          timeNeeded: partsToTotal("176"),
          days: {
            "1": partsToTotal("1:00:00"),
          },
        },
      },
    },
  },
};
