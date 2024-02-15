import { Panel } from "../../../../entities/panel";
import { DaysGrid } from "../DaysGrid/DaysGrid";
import "./MonthPanel.scss";

export function MonthPanel() {
  return (
    <Panel className="wt-month-panel" title="Days" side="left">
      <DaysGrid />
    </Panel>
  );
}
