import { fetchTasks } from "../components/tasks/tasksSlice";
import { setTime } from "../components/timer/timerSlice";
import AppStore from "../store/AppStore";

class TimeModelClass {
  initialize(): void {
    setInterval(() => {
      AppStore.dispatch(setTime(AppStore.getState().timer.time + 1000));
    }, 1000);

    AppStore.dispatch(fetchTasks());
  }
}

const TimeModel = new TimeModelClass();
export default TimeModel;
