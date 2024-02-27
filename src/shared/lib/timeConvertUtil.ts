export type TimeInfo = Partial<{
  h: number;
  m: number;
  s: number;
  ms10: number;
}>;

//--------------------------------------------------------------------------
//
// Total & parts
//
//--------------------------------------------------------------------------

/**
 * Splits the time to parts.
 * @param total Time in ms.
 */
export function totalToParts(total: number) {
  let h = Math.floor(total / 3600000);
  total -= h * 3600000;
  let m = Math.floor(total / 60000);
  total -= m * 60000;
  let s = Math.floor(total / 1000);
  total -= s * 1000;
  let ms10 = Math.floor(total / 10);

  return {
    h: h,
    m: m,
    s: s,
    ms10: ms10,
  };
}

/**
 * @example
 * "h:m:s:ms10" => { h, m, s, ms10 } => 1000000
 */
export function partsToTotal(objectOrString: TimeInfo | string): number {
  let parts;
  if (typeof objectOrString == "object") parts = objectOrString;
  else {
    let ps = objectOrString.split(":");
    parts = {
      h: Number(ps[0] || 0),
      m: Number(ps[1] || 0),
      s: Number(ps[2] || 0),
      ms10: Number(ps[3] || 0),
    };
  }
  return (
    (parts.h || 0) * 3600000 +
    (parts.m || 0) * 60000 +
    (parts.s || 0) * 1000 +
    (parts.ms10 || 0) * 10
  );
}

//--------------------------------------------------------------------------
//
// Format
//
//--------------------------------------------------------------------------

/**
 * @example
 * 10 => 10
 * 1 => 01
 */
export function format2digit(value: number): string {
  return (value < 10 ? "0" : "") + value;
}

export function formatTotal(
  total: number,
  format: "h:m:s" | "h:m" | "h:m:s:ms10"
) {
  let parts = totalToParts(total);
  return format
    .split(":")
    .map((f) => parts[f as keyof TimeInfo] || 0)
    .map((v) => format2digit(v))
    .join(":");
}

export function formatDate(modified: number): string {
  const d = new Date();
  d.setTime(modified);
  return `${d.getFullYear()}/${format2digit(d.getMonth() + 1)}/${format2digit(
    d.getDate()
  )}`;
}

//--------------------------------------------------------------------------
//
// Work intervals
//
//--------------------------------------------------------------------------

/**
 * Merges intervals if the gaps are too small.
 */
export function simplifyWorkIntervals(wi: number[][]): number[][] {
  if (!wi?.length) {
    return wi;
  }
  const newWi: number[][] = [];
  let cur = wi[0];
  newWi.push(cur);
  let i = 1;
  while (i < wi.length) {
    // if the difference is less than 5 minutes
    if (Math.abs(wi[i][0] - cur[1]) < 300_000) {
      // merge
      cur[1] = Math.max(cur[1], wi[i][1]);
    } else {
      // start a new interval
      cur = wi[i];
      newWi.push(cur);
    }
    i++;
  }
  return newWi;
}

/**
 * @returns Intervals for normal (8am - 8pm) and later (8pm - 8am) hours in the format [work, gap] as percent 0..100.
 * Gap is passed as a negative number;
 */
export function workIntervalsToNormalLatePercent(wi: number[][]): {
  normal: number[];
  late: number[];
} {
  if (!wi?.length) {
    return { normal: [], late: [] };
  }
  wi = simplifyWorkIntervals(wi);
  // split to have for normal and late hours
  const _8am = 3600 * 1000 * 8;
  const _8pm = 3600 * 1000 * 20;
  let normalWi: number[][] = [];
  let lateWi: number[][] = [];

  let i = 0;
  while (i < wi.length) {
    if (wi[i][0] < _8am) {
      // ignore (too early)
    } else if (wi[i][1] <= _8pm) {
      // add to normal
      normalWi.push(wi[i]);
    } else {
      // check for late
      if (wi[i][0] >= _8pm) {
        // add whole
        lateWi.push(wi[i]);
      } else {
        // split
        normalWi.push([wi[i][0], _8pm]);
        normalWi.push([_8pm, wi[i][1]]);
      }
    }
    i++;
  }

  // normalize
  normalWi = normalWi.map((i) => [i[0] - _8am, i[1] - _8am]);
  lateWi = lateWi.map((i) => [i[0] - _8pm, i[1] - _8pm]);

  function _toPct(wi: number[][]): number[] {
    if (!wi.length) {
      return [];
    }
    const _12h = 3600 * 1000 * 12;
    const pct: number[] = [];
    pct.push(-(wi[0][0] / _12h) * 100); // gap
    for (let i = 0; i < wi.length; i++) {
      pct.push(((wi[i][1] - wi[i][0]) / _12h) * 100); // work
      if (wi[i + 1]) {
        pct.push(-((wi[i + 1][0] - wi[i][1]) / _12h) * 100); // gap
      }
    }
    return pct;
  }

  return {
    normal: _toPct(normalWi),
    late: _toPct(lateWi),
  };
}

//--------------------------------------------------------------------------
//
// Date
//
//--------------------------------------------------------------------------

/**
 * @param d If not passed, the current time is used.
 */
export function get1BasedDate(d?: Date): {
  y: number;
  m: number;
  d: number;
} {
  d = d || new Date();
  return {
    y: d.getFullYear(),
    m: d.getMonth() + 1,
    d: d.getDate(),
  };
}
