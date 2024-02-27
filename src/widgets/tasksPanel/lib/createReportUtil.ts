import { SavedState_Task } from "../../../shared/api";
import { formatDate, totalToParts } from "../../../shared/lib";

export function createTasksReport(tasks: SavedState_Task[]): void {
  let content = "";
  const mergedTasks: Record<
    string,
    Pick<SavedState_Task, "label" | "link" | "time">
  > = {};
  tasks.forEach((task) => {
    if (!mergedTasks[task.link]) {
      mergedTasks[task.link] = {
        label: task.label,
        link: task.link,
        time: task.time,
      };
    } else {
      mergedTasks[task.link].time += task.time;
    }
  });

  Object.values(mergedTasks).forEach((task) => {
    const ps = totalToParts(task.time);
    content += `#${issueNumberFromLink(task.link)} ${task.label} - ${ps.h}h${
      ps.m ? " " + ps.m + "m" : ""
    } \n`;
  });
  _downloadFile(`Tasks for ${formatDate(Date.now(), "y/m")}.txt`, content);
}

function _downloadFile(filename: string, content: string): void {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(content)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export function issueNumberFromLink(link: string): string {
  return link.match(/\d+$/)?.[0] || "";
}
