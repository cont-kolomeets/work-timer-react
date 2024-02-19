// class TimeModel {
//   initialize(): void {
//     setInterval(() => {
//       if (appStore.getState().timer.running) {
//         appStore.dispatch(setTime(appStore.getState().timer.time + 1000));
//       }
//     }, 1000);

//     //AppStore.dispatch(fetchTasks());
//   }
// }

const fetchData = () => {};

const toggleTimer = () => {};

export const workTimerModel = {
  fetchData,
  toggleTimer,
};
