import { DayInfo } from "./DayInfoUtil";
import { format2digit, totalToParts } from "./TimeConvertUtil";

//--------------------------------------------------------------------------
//
// Start
//
//--------------------------------------------------------------------------

/**
 * Composes the message when the work has started for the given day.
 */
export function calcWhenStartedMessage(dayInfo: DayInfo): string {
  if (!dayInfo.points?.length) {
    return "Hasn't started yet";
  } else {
    let started = new Date(dayInfo.points[0].start);
    return `Started today at ${started.getHours()}:${format2digit(
      started.getMinutes()
    )}`;
  }
}

//--------------------------------------------------------------------------
//
// Leave
//
//--------------------------------------------------------------------------

/**
 * Composes the message when the work can be finished for the given day.
 */
export function calcWhenToLeaveMessage(timeElapsed: number): string {
  let date = new Date();
  let elapsedInfo = totalToParts(timeElapsed);
  let hLeft = 8 - elapsedInfo.h;
  let mLeft = 0;
  if (elapsedInfo.m) {
    hLeft--;
    mLeft = 60 - elapsedInfo.m;
  }

  // add time for lunch if before 2 PM
  if (date.getHours() < 14) mLeft += 40;

  if (mLeft > 60) {
    hLeft++;
    mLeft -= 60;
  }

  if (hLeft < 0) {
    return "You can leave now!";
  } else {
    let hLeave = date.getHours() + hLeft;
    let mLeave = date.getMinutes() + mLeft;
    if (mLeave > 60) {
      hLeave++;
      mLeave -= 60;
    }
    return "You can leave at " + hLeave + ":" + format2digit(mLeave);
  }
}
