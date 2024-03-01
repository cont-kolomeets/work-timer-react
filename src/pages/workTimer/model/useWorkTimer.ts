import { nanoid } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/redux/hooks";
import { useAlerts } from "../../../entities/alert";
import { alertModel } from "../../../entities/alert/model/alertModel";
import { get1BasedDate } from "../../../shared/lib";
import { gridModel } from "../../../widgets/monthPanel/model/gridModel";
import { timerModel } from "../../../widgets/timerPanel/model/timerModel";

export function useWorkTimer() {
  const dispatch = useAppDispatch();
  const monthData = useAppSelector(gridModel.selectors.selectMonthData);
  const alerts = useAlerts();

  const syncTimeToGrid = (time: number) => {
    dispatch(gridModel.actions.resetDate());
    if (monthData.find((data) => data.index === get1BasedDate().d)) {
      dispatch(
        gridModel.actions.updateData({ index: get1BasedDate().d, time })
      );
    } else {
      dispatch(gridModel.actions.fetchGridData());
    }
  };

  const onGridEditStart = () => {
    dispatch(timerModel.actions.stopTimer());
  };

  const onGridEditEnd = () => {
    dispatch(timerModel.actions.fetchTime());
  };

  useEffect(() => {
    setTimeout(() => {
      const isDemo = window.location.href.includes("demo=true");
      isDemo &&
        dispatch(
          alertModel.actions.showAlert({
            id: nanoid(8),
            title: "Welcome",
            message:
              "Welcome to Work Timer demo! Press Start to run the timer.",
            timeout: 3000,
          })
        );
    }, 1000);
  }, [dispatch]);

  return {
    syncTimeToGrid,
    onGridEditStart,
    onGridEditEnd,
    alerts,
  };
}
