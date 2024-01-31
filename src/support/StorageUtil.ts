import { DayInfo } from "../utils/DayInfoUtil";
import { partsToTotal } from "../utils/TimeConvertUtil";

export type StateItem = {
  years: Record<
    string,
    {
      months: Record<
        number,
        {
          timeNeeded: number;
          days: Record<number, DayInfo | number>;
        }
      >;
    }
  >;
};

var DEFAULT_ITEM: StateItem = {
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
