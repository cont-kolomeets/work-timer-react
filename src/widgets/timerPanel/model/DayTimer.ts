import { formatDate } from "../../../shared/lib";

class DayTimer {
  private _startTime = 0;
  private _timeElapsed = 0;
  private _isRunning = false;
  private _intervalHandle: any;
  private _secondPoint = 0;
  private _curInterval: number[] = [];
  private _lastDate: string = "";

  get isRunning(): boolean {
    return this._isRunning;
  }

  get time(): number {
    return this._timeElapsed;
  }

  get interval(): number[] {
    return this._curInterval;
  }

  /**
   * @param timeElapsed Specify if you want to start the timer with some time already elapsed.
   */
  start(timeElapsed = 0) {
    this.stop();
    // check if we need to start tracking for a new day
    // case: the app started on the next day
    this._checkDate();

    this._isRunning = true;
    this._startTime = Date.now();
    if (timeElapsed > 0) this._startTime -= timeElapsed;

    this._curInterval = [this._toIntevalTime(), this._toIntevalTime()];

    this._secondPoint = Date.now();
    this._intervalHandle = setInterval(() => this._updateTimer(), 33);
    this._updateTimer();
  }

  private _updateTimer(): void {
    // check if we need to start tracking for a new day
    // case: the person worked over 0:00am
    this._checkDate();

    let currentTime = Date.now();
    let delta = currentTime - this._startTime;
    this._timeElapsed = delta;
    this._curInterval[1] = this._toIntevalTime();
    this.onTickFrequent();
    if (currentTime - this._secondPoint > 5000) {
      this._secondPoint = currentTime;
      this.onTickRare();
    }
  }

  private _toIntevalTime(): number {
    return (new Date().getHours() * 3600 + new Date().getMinutes() * 60) * 1000;
  }

  private _checkDate(): void {
    const curDate = formatDate(Date.now(), "y/m/d");
    if (this._lastDate !== curDate) {
      this._lastDate = curDate;
      this.onDayChanged();
    }
  }

  stop() {
    this._intervalHandle && clearInterval(this._intervalHandle);
    this._isRunning = false;
  }

  onDayChanged(): void {}
  onTickFrequent(): void {}
  onTickRare(): void {}
}

export default DayTimer;
