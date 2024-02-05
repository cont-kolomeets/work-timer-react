const DEFAULT_BG_COLOR = "black";

type IHandle = { remove(): void };

function on(
  node: HTMLElement,
  type: string,
  callback: (event: any) => void
): IHandle {
  node.addEventListener(type, callback);
  return {
    remove: () => node.removeEventListener(type, callback),
  };
}

class UserActionController {
  private _hs: IHandle[] = [];

  start(): void {
    this.stop();
    document.body.style.backgroundColor = DEFAULT_BG_COLOR;
    this._hs.push(
      on(document.body, "keyup", this._onKeyUp.bind(this)),
      on(document.body, "keydown", this._onKeyDown.bind(this))
    );
  }

  stop(): void {
    this._hs.forEach((h) => h.remove());
    this._hs.length = 0;
  }

  private _onKeyUp(event: KeyboardEvent): void {
    if (event.key === " ") {
      this.onToggleTimer();
      document.body.style.backgroundColor = DEFAULT_BG_COLOR;
    }
  }

  private _onKeyDown(event: KeyboardEvent): void {
    if (event.key === " ") {
      document.body.style.backgroundColor = "#333333";
    }
  }

  onToggleTimer(): void {}
}

export default UserActionController;
