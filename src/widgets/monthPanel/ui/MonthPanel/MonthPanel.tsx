import { useAppDispatch } from "../../../../app/hooks";
import { Panel } from "../../../../entities/panel";
import { gridModel } from "../../model/gridModel";
import { DaysGrid } from "../DaysGrid/DaysGrid";
import "./MonthPanel.scss";

export function MonthPanel() {
  const dispatch = useAppDispatch();

  const _loadData = () => {
    dispatch(gridModel.actions.fetchGridData());
  };

  return (
    <Panel
      className="wt-month-panel"
      title="Days"
      side="left"
      onShown={_loadData}
    >
      <DaysGrid />
    </Panel>
  );
}
