class DayTimer {
  startTime = 0;
  timeElapsed = 0;
  isRunning = false;

  private _intervalHandle: any;

  /**
   * This can be used to visualize the time before starting the timer.
   */
  setElapsedTime(timeElapsed: number) {
    this.stop();
    this.timeElapsed = timeElapsed;
  }

  /**
   * @param timeElapsed Specify if you want to start the timer with some time already elapsed.
   */
  start(timeElapsed = 0) {
    this.stop();

    this.isRunning = true;
    this.startTime = new Date().getTime();
    if (timeElapsed > 0) this.startTime -= timeElapsed;

    let secondPoint = new Date().getTime();
    this._intervalHandle = setInterval(
      () => this._updateTimer(secondPoint),
      33
    );
    this._updateTimer(secondPoint);
  }

  private _updateTimer(secondPoint: number): void {
    let currentTime = new Date().getTime();
    let delta = currentTime - this.startTime;
    this.timeElapsed = delta;
    this.onTickFrequent();
    if (currentTime - secondPoint > 5000) {
      secondPoint = currentTime;
      this.onTickRare();
    }
  }

  stop() {
    this._intervalHandle && clearInterval(this._intervalHandle);
    this.isRunning = false;
  }

  onTickFrequent(): void {}
  onTickRare(): void {}
}

export default DayTimer;
