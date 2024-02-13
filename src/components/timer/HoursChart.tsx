import { useSelector } from "react-redux";
import { getIntervals } from "./timerSlice";
import { workIntervalsToNormalLatePercent } from "../../utils/TimeConvertUtil";

const FILL_COLOR = "#f89c10";

function HoursChart() {
  const { normal, late } = workIntervalsToNormalLatePercent(
    useSelector(getIntervals)
  );
  return (
    <>
      {_12HoursChart(normal, true)}
      {late.length ? _12HoursChart(late, false) : null}
    </>
  );
}

function _12HoursChart(percentage: number[], isInner: boolean) {
  const size = isInner ? 500 : 560;
  const height = size;
  const width = size;
  const strokeWidth = 5;
  const sectorColors = percentage.map((p, i) =>
    p < 0 ? "transparent" : FILL_COLOR
  );
  percentage = percentage.map((p) => Math.abs(p));
  const gap = 0;

  const cx = width / 2;
  const cy = height / 2;
  const r = width / 2 - strokeWidth / 2;
  const C = Math.PI * r * 2;
  const computedGap = (C * gap) / 100;
  const dashOffsetCorrection = Math.PI * r * (1 + 1 / 6);

  const sumGapPercentage = (gap * (percentage?.length - 1)) / 100;
  const strokeDashArrays = percentage.map((percent) => {
    return [
      (C * (1 - sumGapPercentage) * percent) / 100,
      C * (1 - (percent / 100) * (1 - sumGapPercentage)),
    ];
  });

  const strokeDashOffsets = strokeDashArrays.map((value, index) => {
    return strokeDashArrays
      .slice(0, index)
      .reduce(
        (acc, item) =>
          index >= 1 ? acc - item[0] - computedGap : acc - item[0],
        C
      );
  });

  return (
    <div className="wt-stretched wt-flex-row wt-flex-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
      >
        <circle
          fill="transparent"
          stroke="#262626"
          cx={cx}
          cy={cy}
          r={r}
          strokeWidth={strokeWidth}
        />

        {strokeDashOffsets.map((item, index) => {
          return (
            <circle
              key={`${item}_${index}`}
              fill="transparent"
              cx={cx}
              cy={cy}
              r={r}
              stroke={sectorColors[index]}
              strokeDasharray={strokeDashArrays[index].join(", ")}
              strokeDashoffset={item + dashOffsetCorrection}
              strokeWidth={strokeWidth}
            />
          );
        })}
      </svg>
    </div>
  );
}

export default HoursChart;
