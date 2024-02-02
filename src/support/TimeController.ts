import { GridData } from "../components/Grid";
import { toDayInfo } from "../utils/DayInfoUtil";
import { partsToTotal } from "../utils/TimeConvertUtil";
import {
  DEFAULT_STATE_ITEM,
  StateItem,
  StateItemMonth,
} from "../utils/StorageUtil";
import DayTimer from "./DayTimer";

export type MonthCompletionInfo = {
  total: number;
  timeNeeded: number;
  completedRatio: number;
};

class TimeController {
  dayTimer = new DayTimer();
  private _years: StateItem["years"] = {};
  private _currentDay = -1;
  private _currentMonth = -1;
  private _currentYear = -1;
  private _userMonth = -1;
  private _userYear = -1;

  constructor() {
    // pass events
    this.dayTimer.onTickFrequent = () => {
      this.onTickFrequent();
    };
    this.dayTimer.onTickRare = () => {
      this._saveState();
      this.onTickRare();
    };
  }

  toggleTimer(): void {
    if (this.dayTimer.isRunning) {
      this.dayTimer.stop();
      this._saveState();
    } else {
      this._provideCurrentDayPath();
      this.dayTimer.start(this.getCurrentDayInfo().elapsed);
    }
    this.onTickFrequent();
  }

  getCurrentMonthTimeList(daysOnly?: boolean): GridData[] {
    let list: GridData[] = [];

    let year = this._years[this.getVisibleYear()];
    if (!year) {
      return list;
    }

    let month = year.months[this.getVisibleMonth()];
    if (!month) {
      return list;
    }

    for (let id in month.days) {
      const obj = this._createDayDataObject(month, +id);
      obj && list.push(obj);
    }

    let completionInfo = this.getCurrentMonthCompletion();
    if (completionInfo && !daysOnly) {
      const obj: GridData = {
        dayIndex: "Total",
        dayTime: completionInfo.total,
        isTotal: true,
        month,
      };
      list.push(obj);
    }

    if (!daysOnly) {
      list.push({
        dayIndex: "Dept",
        dayTime: year.dept || 0,
        isDept: true,
        year,
      });
    }

    return list;
  }

  private _createDayDataObject(
    month: StateItemMonth,
    id: number
  ): GridData | null {
    let dayInfo = (month.days[id] = toDayInfo(month.days[id]));
    let dayTime = dayInfo.elapsed;
    if (dayTime > 0) {
      const obj: GridData = {
        isCurrent: !this._isUserMonth() && id === this._currentDay,
        dayIndex: id,
        dayTime: dayTime,
        dayInfo,
      };
      return obj;
    }
    return null;
  }

  //--------------------------------------------------------------------------
  //
  // Set new day time manually
  //
  //--------------------------------------------------------------------------

  /**
   * Ability to change the elapased time for a specified day.
   */
  setDayNewTime(value: string /*hh:mm*/, data: GridData): void {
    if (!value || value.indexOf(":") === -1) {
      alert("Incorrect entry!");
      return;
    }
    let ps = value.split(":");

    this.dayTimer.stop();

    if (data.dayInfo) {
      data.dayInfo.elapsed = partsToTotal({
        h: Number(ps[0]),
        m: Number(ps[1]),
      });
      if (!this._isUserMonth() && data.dayIndex === this._currentDay) {
        this.dayTimer.setElapsedTime(data.dayInfo.elapsed);
      }
    }

    this._saveState();

    // event to update
    this.onTickRare();
  }

  //--------------------------------------------------------------------------
  //
  // Set new month time manually
  //
  //--------------------------------------------------------------------------

  /**
   * Ability to change the total month time.
   */
  setNewMonthTime(value: string /*hh:mm*/, data: GridData): void {
    if (!data.month) {
      return;
    }

    if (!value || value.indexOf(":") === -1) {
      alert("Incorrect entry!");
      return;
    }
    let ps = value.split(":");

    this.dayTimer.stop();

    data.month.timeNeeded = partsToTotal({
      h: Number(ps[0]),
      m: Number(ps[1]),
    });

    this._saveState();

    // event to update
    this.onTickRare();
  }

  //--------------------------------------------------------------------------
  //
  // Set new dept time manually
  //
  //--------------------------------------------------------------------------

  /**
   * Ability to change the total depth for a year.
   */
  setNewYearDept(value: string /*hh:mm*/, data: GridData): void {
    if (!data.year) {
      return;
    }

    if (!value || value.indexOf(":") === -1) {
      alert("Incorrect entry!");
      return;
    }
    let ps = value.split(":");

    this.dayTimer.stop();

    data.year.dept = partsToTotal({
      h: Number(ps[0]),
      m: Number(ps[1]),
    });

    this._saveState();

    // event to update
    this.onTickRare();
  }

  //--------------------------------------------------------------------------
  //
  // Year/month getters/setters (data only)
  //
  //--------------------------------------------------------------------------

  /**
   * Used to visualize data from other years and months.
   */
  setUserYearMonth(year: number, month: number) {
    this.dayTimer.stop();
    this._userYear = year;
    this._userMonth = month;
    // event to update
    this.onTickRare();
  }

  //--------------------------------------------------------------------------
  //
  // Year/month getters/setters (data only)
  //
  //--------------------------------------------------------------------------

  getVisibleMonth() {
    return this._userMonth !== -1 ? this._userMonth : this._currentMonth;
  }

  getVisibleYear(): number {
    return this._userYear !== -1 ? this._userYear : this._currentYear;
  }

  getNumDaysInCurrentMonth(excludeWeekend?: boolean): number {
    let d = new Date();
    let totalDaysInMonth = new Date(
      d.getFullYear(),
      d.getMonth() + 1,
      0
    ).getDate();

    if (excludeWeekend) {
      let numWeekendDays = 0;
      for (let i = 1; i <= totalDaysInMonth; i++) {
        d = new Date();
        d.setDate(i);
        if (d.getDay() === 0 || d.getDay() === 6) numWeekendDays++;
      }
      totalDaysInMonth -= numWeekendDays;
    }

    return totalDaysInMonth;
  }

  getCurrentDayInfo() {
    let year = this._years[this._currentYear];
    let month = year && year.months[this._currentMonth];
    let dayInfo = toDayInfo(month && month.days[this._currentDay]);
    month && (month.days[this._currentDay] = dayInfo);
    return dayInfo;
  }

  getCurrentMonthCompletion(): MonthCompletionInfo | null {
    let year = this._years[this.getVisibleYear()];
    if (!year) {
      return null;
    }

    let month = year.months[this.getVisibleMonth()];
    if (!month) {
      return null;
    }

    let totalFromDays = 0;
    for (let id in month.days) {
      let dayInfo = (month.days[id] = toDayInfo(month.days[id]));
      totalFromDays += dayInfo.elapsed > 0 ? dayInfo.elapsed : 0;
    }

    return {
      total: totalFromDays,
      timeNeeded: month.timeNeeded,
      completedRatio: totalFromDays / month.timeNeeded,
    };
  }

  // private

  private _getMonthDay() {
    return new Date().getDate();
  }

  private _getMonth() {
    return new Date().getMonth() + 1;
  }

  private _getYear() {
    return new Date().getFullYear();
  }

  private _isUserMonth(): boolean {
    return (
      this._userMonth !== -1 &&
      this._userMonth !== this._currentMonth &&
      this._userYear !== -1 &&
      this._userYear !== this._currentYear
    );
  }

  //--------------------------------------------------------------------------
  //
  // Data utility
  //
  //--------------------------------------------------------------------------

  /**
   * Makes sure the hash structure for the current month/day exists.
   */
  private _provideCurrentDayPath() {
    this._currentDay = this._getMonthDay();
    this._currentMonth = this._getMonth();
    this._currentYear = this._getYear();

    let year = (this._years[this._currentYear] =
      this._years[this._currentYear] || {}); // provide a year
    let months = (year.months = year.months || {});

    let month = (months[this._currentMonth] = months[this._currentMonth] || {}); // provide a month
    month.days = month.days || {}; // provide days hash
    // TODO: update timeNeeded
    month.timeNeeded = month.timeNeeded || partsToTotal({ h: 8 * 20 });

    let days = months[this._currentMonth].days;
    let dayInfo = (days[this._currentDay] = toDayInfo(days[this._currentDay]));
    if (!dayInfo.points.length) {
      dayInfo.points.push({
        start: new Date().getTime(),
        end: new Date().getTime(),
      });
    }
  }

  //--------------------------------------------------------------------------
  //
  // Serialization
  //
  //--------------------------------------------------------------------------

  fromSavedState(): void {
    let storageItem = localStorage.getItem("workTimer.yearsItem");
    const json = storageItem ? JSON.parse(storageItem) : DEFAULT_STATE_ITEM;
    this._years = json.years || {};
    this._provideCurrentDayPath();
    this.dayTimer.setElapsedTime(this.getCurrentDayInfo().elapsed);
  }

  private _saveState(): void {
    if (this._currentDay === -1) {
      return;
    }

    const m = this._years[this._currentYear].months[this._currentMonth];

    let dayInfo = (m.days[this._currentDay] = toDayInfo(
      m.days[this._currentDay]
    ));
    dayInfo.elapsed = this.dayTimer.timeElapsed || 0;

    const lastPoint = dayInfo.points[dayInfo.points.length - 1];
    if (lastPoint && lastPoint.end) {
      const curTime = new Date().getTime();

      if (curTime - lastPoint.end > 20000 /* 20 seconds */) {
        // start a new interval
        dayInfo.points.push({
          start: curTime,
          end: curTime,
        });
      } else {
        lastPoint.end = curTime;
      }
    }

    localStorage.setItem(
      "workTimer.yearsItem",
      JSON.stringify({
        years: this._years,
      })
    );
  }

  //--------------------------------------------------------------------------
  //
  // Events
  //
  //--------------------------------------------------------------------------

  onTickFrequent(): void {}
  onTickRare(): void {}
}

export default TimeController;
