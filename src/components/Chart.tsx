import { DayInfo } from "../utils/DayInfoUtil";
import { format2digit } from "../utils/TimeConvertUtil";
import "../css/Chart.css";
import { ReactNode } from "react";

const TICKS = [
  8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
];

type ChartProps = {
  width: number;
  dayInfo: DayInfo | null;
};

//--------------------------------------------------------------------------
//
// Ticks
//
//--------------------------------------------------------------------------

function _drawTicks(width: number): ReactNode[] {
  const tickStep = width / (TICKS.length - 1);
  return TICKS.map((hour, index) => {
    return (
      <div>
        <div
          className="wt-axis-line__tick"
          style={{ left: tickStep * index + "px" }}
        ></div>
        <div
          className="wt-axis-line__tick-label"
          style={{ left: tickStep * index - 50 + "px" }}
        >{`${format2digit(hour)}:00`}</div>
      </div>
    );
  });
}

//--------------------------------------------------------------------------
//
// Rects
//
//--------------------------------------------------------------------------

function _drawRects(dayInfo: DayInfo, width: number): ReactNode[] | null {
  return (
    dayInfo.points?.map((point) => {
      let sd = new Date(point.start);
      let ed = new Date(point.end);

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
          className="wt-chart-rect"
          style={{ left: xFrom + "px", width: xTo - xFrom + "px" }}
        ></div>
      );
    }) || null
  );
}

//--------------------------------------------------------------------------
//
// Chart
//
//--------------------------------------------------------------------------

function Chart({ width, dayInfo }: ChartProps) {
  if (!dayInfo) {
    return null;
  }

  const ticks = _drawTicks(width);
  const rects = _drawRects(dayInfo, width);
  return (
    <div>
      <div className="wt-axis-line">{ticks}</div>
      {rects}
    </div>
  );
}

export default Chart;
