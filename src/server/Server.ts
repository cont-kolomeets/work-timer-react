import { SavedState } from "../data/interfaces";

const KEY = "workTimer.savedState";

/**
 * Fake REST API.
 */
class ServerClass {
  async getSavedState(): Promise<SavedState> {
    let storageItem = localStorage.getItem(KEY);
    const json: SavedState = storageItem
      ? JSON.parse(storageItem)
      : {
          years: {},
        };
    return json;
  }

  async putSavedState(data: SavedState): Promise<void> {
    localStorage.setItem(KEY, JSON.stringify(data));
  }
}

const Server = new ServerClass();
export default Server;
