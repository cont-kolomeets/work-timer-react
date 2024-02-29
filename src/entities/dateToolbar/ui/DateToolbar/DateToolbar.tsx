import { format2digit } from "../../../../shared/lib";
import { Action } from "../../../../shared/ui";
import { IconName } from "../../../../shared/ui/Action/Action";

type ActionInfo = {
  icon: IconName;
  disabled?: boolean;
  loading?: boolean;
  onClick(): void;
};

export function DateToolbar({
  year,
  month,
  actionsLeft,
  actionsRight,
  onClickDate,
}: {
  year: number;
  month: number;
  actionsLeft: ActionInfo[];
  actionsRight: ActionInfo[];
  onClickDate(): void;
}) {
  return (
    <div className="wt-flex-row wt-m-b-end-12 wt-clickable wt-flex-gap-12">
      {actionsLeft.map((info) => {
        return <Action name={info.icon} size="16" onClick={info.onClick} />;
      })}
      <div
        className=" wt-flex-row wt-flex-center wt-flex-spacer wt-date-toolbar__date"
        onClick={onClickDate}
      >{`${year}/${format2digit(month)}`}</div>
      {actionsRight.map((info) => {
        return (
          <Action
            name={info.icon}
            disabled={info.disabled}
            loading={info.loading}
            size="16"
            onClick={info.onClick}
          />
        );
      })}
    </div>
  );
}
