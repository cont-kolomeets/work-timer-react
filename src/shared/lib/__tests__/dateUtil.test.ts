import { get1BasedDate, getNumDaysInMonth, isHoliday, isWeekend } from "../dateUtil";

describe("dateUtil", () => {
    it("getNumDaysInMonth", () => {
        expect(getNumDaysInMonth(2024, 4)).toBe(30);
    });

    it("get1BasedDate", () => {
        const d = new Date(2024, 3, 1);
        expect(get1BasedDate(d).y).toBe(2024);
        expect(get1BasedDate(d).m).toBe(4);
        expect(get1BasedDate(d).d).toBe(1);
    });

    it("isHoliday", () => {
        expect(isHoliday(3, 8)).toBe(true);
        expect(isHoliday(3, 9)).not.toBe(true);
    });

    it("isWeekend", () => {
        expect(isWeekend(2024, 4, 27)).toBe(true);
        expect(isWeekend(2024, 4, 28)).toBe(true);
        expect(isWeekend(2024, 4, 29)).toBe(false);
    });
});
