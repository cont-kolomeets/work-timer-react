export type TimeInfo = {
  h: number;
  m: number;
  s: number;
  ms10: number;
};

export function totalToParts(total: number) {
  var h = Math.floor(total / 3600000);
  total -= h * 3600000;
  var m = Math.floor(total / 60000);
  total -= m * 60000;
  var s = Math.floor(total / 1000);
  total -= s * 1000;
  var ms10 = Math.floor(total / 10);

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
  var parts;
  if (typeof objectOrString == "object") parts = objectOrString;
  else {
    var ps = objectOrString.split(":");
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

/**
 * @example
 * 10 => 10
 * 1 => 01
 */
export function format2digit(value: number): string {
  return (value < 10 ? "0" : "") + value;
}

/**
 * @param format "h:m:s" | "h:m:s:ms10"
 * @example
 * 100000 => "h:m:s" | "h:m:s:ms10"
 */
export function formatTotal(total: number, format: string /* e.g. */) {
  var parts = totalToParts(total);
  var fs = format.split(":");
  return fs
    .map((f) => {
      return parts[f as keyof TimeInfo] || 0;
    })
    .map((v) => {
      return format2digit(v);
    })
    .join(":");
}
