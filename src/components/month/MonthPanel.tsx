import "./MonthPanel.scss";
import PanelTitle from "../shared/PanelTitle";
import DaysGrid from "./DaysGrid/DaysGrid";

export default function MonthPanel() {
  return (
    <div className="wt-panel wt-month-panel">
      <PanelTitle title="Days" />
      <div className="wt-panel-content">
        <DaysGrid />
      </div>
    </div>
  );
}
