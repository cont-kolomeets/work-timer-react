import { formatTotal } from "./TimeConvertUtil";

export function updateDocumentHeader(
  isRunning: boolean,
  timeElapsed: number
): void {
  if (isRunning) {
    document.title = "WT " + formatTotal(timeElapsed, "h:m:s");
  } else {
    document.title = "Work Timer (STOPPED!)";
  }
}
