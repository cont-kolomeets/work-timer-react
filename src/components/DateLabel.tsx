import "../css/DateLabel.css";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function _formatDateLabel(year: number, month: number): string {
  return `${year} ${MONTH_NAMES[month - 1]}`;
}

type DateLabelProps = {
  year: number;
  month: number;
  onSetNewDate(year: number, month: number): void;
};

function DateLabel({ year, month, onSetNewDate }: DateLabelProps) {
  function _clickHanler(): void {
    const value = prompt("Enter year:month as YYYY:MM") as string;
    const values = value.split(":");
    const year = Number(values[0]) || -1;
    const month = Number(values[1]) || -1;
    onSetNewDate(year, month);
  }

  const dateLabel = _formatDateLabel(year, month);

  return (
    <div className="wt-date-label" onClick={_clickHanler}>
      {dateLabel}
    </div>
  );
}

export default DateLabel;
