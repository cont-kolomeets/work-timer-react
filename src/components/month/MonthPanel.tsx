import "./MonthPanel.scss";
import DaysGrid from "./DaysGrid/DaysGrid";
import Panel from "../shared/Panel/Panel";

export default function MonthPanel() {
  return (
    <Panel className="wt-month-panel" title="Days" side="left">
      <DaysGrid />
    </Panel>
  );
}
