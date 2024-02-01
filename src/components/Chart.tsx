import { DayInfo } from "../utils/DayInfoUtil";
import { format2digit } from "../utils/TimeConvertUtil";
import "../css/Chart.css";

const TICKS = [
  8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
];

type ChartProps = {
  width: number;
  dayInfo: DayInfo;
};

function Chart({ width, dayInfo }: ChartProps) {
  const tickStep = width / (TICKS.length - 1);
  const ticks = TICKS.map((hour, index) => {
    return (
      <div>
        <div
          className="axisLineTick"
          style={{ left: tickStep * index + "px" }}
        ></div>
        <div
          className="axisLineTickLabel"
          style={{ left: tickStep * index - 50 + "px" }}
        >{`${format2digit(hour)}:00`}</div>
      </div>
    );
  });

  const rects = dayInfo.points?.map((point) => {
    var sd = new Date(point.start);
    var ed = new Date(point.end);

    function _toX(d: Date): number {
      return (
        ((d.getHours() + d.getMinutes() / 60 - TICKS[0]) /
          (TICKS[TICKS.length - 1] - TICKS[0])) *
        width
      );
    }

    const xFrom = _toX(sd);
    const xTo = _toX(ed);
    return (
      <div
        className="chartRect"
        style={{ left: xFrom + "px", width: xTo - xFrom + "px" }}
      ></div>
    );
  });

  return (
    <div>
      <div className="axisLine">{ticks}</div>
      {rects}
    </div>
  );
}

export default Chart;
