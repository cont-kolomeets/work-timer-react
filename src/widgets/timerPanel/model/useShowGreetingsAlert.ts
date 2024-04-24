import { useAppDispatch, useAppSelector } from "../../../app/redux/hooks";
import { alertModel } from "../../../entities/alert/model/alertModel";
import { getHours } from "../../../shared/lib";

let numCalls = 0;

export function useShowGreetingsAlert() {
  const dispatch = useAppDispatch();
  const numShownAlerts = useAppSelector(alertModel.selectors.getNumShownAlerts);

  return {
    showGreetings: () => {
      if (numShownAlerts) {
        return;
      }

      const isAm = getHours() < 12;
      dispatch(
        alertModel.actions.showAlert({
          title: numCalls
            ? "Welcome back!"
            : isAm
            ? "Good morning!"
            : "Good day!",
          message: numCalls ? "Nice to see you again!" : "Have a nice day!",
        })
      );
      numCalls++;
    },
  };
}
