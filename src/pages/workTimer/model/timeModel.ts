import { appStore } from "../../../app/appStore";
import { setTime } from "../../../widgets/timerPanel/model/timerSlice";

class TimeModel {
  initialize(): void {
    setInterval(() => {
      if (appStore.getState().timer.running) {
        appStore.dispatch(setTime(appStore.getState().timer.time + 1000));
      }
    }, 1000);

    //AppStore.dispatch(fetchTasks());
  }
}

export const timeModel = new TimeModel();
