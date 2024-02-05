import { MonthCompletionInfo } from "../hooks/support/TimeController";
import { totalToParts } from "./TimeConvertUtil";

/**
 * Composes the message for the current month.
 */
export function composeMonthStatusLabel({
  monthCompletion,
  numDaysInMonth,
}: {
  monthCompletion: MonthCompletionInfo | null;
  numDaysInMonth: number;
}): string {
  let status = "";
  let ci = monthCompletion;

  if (!ci) {
    return "";
  }

  if (ci.completedRatio >= 1) {
    let cr = ci.completedRatio;
    if (cr < 1.05)
      status =
        "You've worked enough this month. Go and get some rest. You don't have to work anymore.";
    if (cr < 1.1)
      status = "You've worked too much. Don't you think that's enough?";
    else
      status =
        "You've worked WAY TOOO much!!! Go and spend some time with your family!!!";
  } else {
    let currentDay = new Date().getDate();
    let numWeekendDays = 0;
    for (var i = currentDay; i <= numDaysInMonth; i++) {
      let d = new Date();
      d.setDate(i);
      if (d.getDay() === 0 || d.getDay() === 6) numWeekendDays++;
    }
    let daysLeft = numDaysInMonth - currentDay + 1 - numWeekendDays;
    let timeLeft = ci.timeNeeded - ci.total;
    let hs = totalToParts(timeLeft).h;
    status =
      "You've got " +
      daysLeft +
      " days and " +
      hs +
      " hours to work, which makes it " +
      (hs / daysLeft).toFixed(2) +
      " hours a day.";

    // check if you are behind the schedule (include today)
    let numWorkingDaysPassed = 0;
    for (let i = 1; i <= currentDay; i++) {
      let d = new Date();
      d.setDate(i);
      if (d.getDay() !== 0 && d.getDay() !== 6) numWorkingDaysPassed++;
    }

    let behindSchedule = numWorkingDaysPassed * 8 * 3600000 - ci.total;
    if (behindSchedule > 0)
      status +=
        "<br/>You are behind the schedule by " +
        (behindSchedule / 3600000).toFixed(2) +
        " hours";
  }

  return status;
}
