import { formatTotal } from "./timeConvertUtil";

export function updateDocumentHeader(isRunning: boolean, time: number): void {
  if (isRunning) {
    document.title = "WT " + formatTotal(time, "h:m:s");
  } else {
    document.title = "Work Timer (STOPPED!)";
  }
}
