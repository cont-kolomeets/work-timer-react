import { useAppSelector } from "../../../../app/redux/hooks";
import { workIntervalsToNormalLatePercent } from "../../../../shared/lib";
import { timerModel } from "../../model/timerModel";

const FILL_COLOR = "#f89c10";

export function HoursChart() {
  const { normal, late } = workIntervalsToNormalLatePercent(
    useAppSelector(timerModel.selectors.getIntervals)
  );
  return (
    <>
      {_draw12HoursChart(normal, true, !late.length)}
      {late.length ? _draw12HoursChart(late, false, true) : null}
    </>
  );
}

function _draw12HoursChart(
  percentage: number[],
  isInner: boolean,
  showTicks: boolean
) {
  const size = isInner ? 500 : 560;
  const height = size;
  const width = size;
  const strokeWidth = 7;
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

  const mins = [];
  if (showTicks) {
    for (let i = 0; i < 12 * 6; i++) {
      mins.push(i);
    }
  }

  return (
    <div className="wt-stretched wt-flex-row wt-flex-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={height}
        viewBox={`-16 -16 ${width + 32} ${height + 32}`}
        width={width}
      >
        <circle
          fill="transparent"
          stroke="#262626"
          cx={cx}
          cy={cy}
          r={r}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
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
              strokeLinecap="round"
            />
          );
        })}

        {mins.map((m) => {
          const r = width / 2 + 2;
          const r2 = r + (m % (3 * 6) === 0 ? 12 : m % 6 === 0 ? 6 : 1);
          const c = width / 2;
          const a = (Math.PI * 2 * m) / 12 / 6;
          return (
            <path
              key={m}
              strokeWidth="3"
              strokeLinecap="round"
              stroke="white"
              d={`M${c + r * Math.cos(a)} ${c + r * Math.sin(a)} ${
                c + r2 * Math.cos(a)
              } ${c + r2 * Math.sin(a)}`}
            />
          );
        })}
      </svg>
    </div>
  );
}
