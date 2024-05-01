import { format2digit, formatDate, formatTotal, partsToTotal, simplifyWorkIntervals, totalToParts, workIntervalsToNormalLatePercent } from "../timeConvertUtil";

describe("timeConvertUtil", () => {
    it("format2digit", () => {
        expect(format2digit(10)).toBe("10");
        expect(format2digit(1)).toBe("01");
    });

    it("formatDate", () => {
        const d = new Date(2024, 3, 1);
        expect(formatDate(d.getTime(), "y/m")).toBe("2024/04");
        expect(formatDate(d.getTime(), "y/m/d")).toBe("2024/04/01");
    });

    it("formatTotal", () => {
        expect(formatTotal(10_000_000, "h:m")).toBe("02:46");
        expect(formatTotal(10_000_000, "h:m:s")).toBe("02:46:40");
        expect(formatTotal(10_000_100, "h:m:s:ms10")).toBe("02:46:40:10");
    });

    it("partsToTotal", () => {
        expect(partsToTotal("02:46")).toBe(9_960_000);
        expect(partsToTotal({ h: 2, m: 46 })).toBe(9_960_000);
        expect(partsToTotal("02:46:40")).toBe(10_000_000);
        expect(partsToTotal({ h: 2, m: 46, s: 40 })).toBe(10_000_000);
        expect(partsToTotal("02:46:40:10")).toBe(10_000_100);
        expect(partsToTotal({ h: 2, m: 46, s: 40, ms10: 10 })).toBe(10_000_100);
    });

    it("totalToParts", () => {
        expect(totalToParts(10_000_100)).toEqual({ h: 2, m: 46, s: 40, ms10: 10 });
    });

    it("workIntervalsToNormalLatePercent", () => {
        expect(workIntervalsToNormalLatePercent([[10 * 3_600_000, 14 * 3_600_000]])).toEqual({
            normal: [
                -16.666666666666664,
                33.33333333333333,
            ], late: []
        });
    });

    it("simplifyWorkIntervals", () => {
        expect(simplifyWorkIntervals([[0, 300_000]])).toEqual([[0, 300_000]]);
        expect(simplifyWorkIntervals([[0, 300_000], [400_000, 600_000]])).toEqual([[0, 600_000]]);
        expect(simplifyWorkIntervals([[0, 300_000], [300_000, 600_000]])).toEqual([[0, 600_000]]);
        expect(simplifyWorkIntervals([[0, 300_000], [500_000, 900_000]])).toEqual([[0, 900_000]]);
        expect(simplifyWorkIntervals([[0, 300_000], [600_000, 900_000]])).toEqual([[0, 300_000], [600_000, 900_000]]);
        expect(simplifyWorkIntervals([[0, 300_000], [700_000, 900_000]])).toEqual([[0, 300_000], [700_000, 900_000]]);
    });
});