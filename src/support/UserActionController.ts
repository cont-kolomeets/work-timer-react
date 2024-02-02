const DEFAULT_BG_COLOR = "black";

class UserActionController {
  start(): void {
    document.body.style.backgroundColor = DEFAULT_BG_COLOR;
    document.body.addEventListener("keyup", this._onKeyUp.bind(this));
    document.body.addEventListener("keydown", this._onKeyDown.bind(this));
  }

  stop(): void {
    document.body.removeEventListener("keyup", this._onKeyUp.bind(this));
    document.body.removeEventListener("keydown", this._onKeyDown.bind(this));
  }

  private _onKeyUp(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.onToggleTimer();
      document.body.style.backgroundColor = DEFAULT_BG_COLOR;
    }
  }

  private _onKeyDown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      document.body.style.backgroundColor = "#333333";
    }
  }

  onToggleTimer(): void {}
}

export default UserActionController;
