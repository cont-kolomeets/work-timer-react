class DayTimer {
  private _startTime = 0;
  private _timeElapsed = 0;
  private _isRunning = false;
  private _intervalHandle: any;
  private _secondPoint = 0;

  get isRunning(): boolean {
    return this._isRunning;
  }

  get time(): number {
    return this._timeElapsed;
  }

  /**
   * @param timeElapsed Specify if you want to start the timer with some time already elapsed.
   */
  start(timeElapsed = 0) {
    this.stop();

    this._isRunning = true;
    this._startTime = new Date().getTime();
    if (timeElapsed > 0) this._startTime -= timeElapsed;

    this._secondPoint = new Date().getTime();
    this._intervalHandle = setInterval(() => this._updateTimer(), 33);
    this._updateTimer();
  }

  private _updateTimer(): void {
    let currentTime = new Date().getTime();
    let delta = currentTime - this._startTime;
    this._timeElapsed = delta;
    this.onTickFrequent();
    if (currentTime - this._secondPoint > 5000) {
      this._secondPoint = currentTime;
      this.onTickRare();
    }
  }

  stop() {
    this._intervalHandle && clearInterval(this._intervalHandle);
    this._isRunning = false;
  }

  onTickFrequent(): void {}
  onTickRare(): void {}
}

export default DayTimer;
