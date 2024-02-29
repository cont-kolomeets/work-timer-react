import { formatTotal } from "../../../../shared/lib";
import { Action, Button, Loader } from "../../../../shared/ui";
import { useTimerPanel } from "../../model/useTimerPanel";
import { HoursChart } from "../HoursChart/HoursChart";
import "./TimerPanel.scss";

export function TimerPanel({
  onTimeUpdated,
}: {
  onTimeUpdated(time: number): void;
}) {
  const { time, running, loadingStatus, editDialog, editTime, toggleTimer } =
    useTimerPanel(onTimeUpdated);

  if (loadingStatus === "loading") {
    return <Loader />;
  }

  return (
    <div className="wt-stretched wt-flex-row wt-flex-center wt-timer-panel">
      <div className="wt-stretched wt-timer-panel-bg"></div>
      <HoursChart />

      <div
        className="wt-flex-row wt-relative"
        style={{ opacity: running ? "1" : "0.3" }}
      >
        <div className="wt-clickable wt-timer-panel-label" onClick={editTime}>
          {formatTotal(time, "h:m:s")}
        </div>
        <Action
          name="pencil"
          className="wt-m-i-start-12"
          size="20"
          onClick={editTime}
        />
      </div>
      <div className="wt-flex-row wt-flex-center wt-timer-bottom-container">
        <Button
          className="wt-round-button wt-timer-toggle-button"
          onClick={toggleTimer}
        >
          {running ? "Stop" : "Start"}
        </Button>
      </div>

      {editDialog}
    </div>
  );
}
