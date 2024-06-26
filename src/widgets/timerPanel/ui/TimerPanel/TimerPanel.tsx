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

  return (
    <div className="wt-stretched wt-flex-row wt-flex-center wt-timer-panel">
      <HoursChart />
      {loadingStatus === "loading" ? (
        <Loader />
      ) : (
        <div
          className="wt-flex-row wt-relative"
          style={{ opacity: running ? "1" : "0.3" }}
        >
          <div
            className="wt-clickable wt-timer-panel-label"
            onClick={editTime}
            style={{
              fontSize: Math.min(100, (100 * (window.innerHeight - 200)) / 500),
            }}
          >
            {formatTotal(time, "h:m:s")}
          </div>
          <Action
            name="pencil"
            className="wt-m-i-start-12"
            size="20"
            onClick={editTime}
          />
        </div>
      )}
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
