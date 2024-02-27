import { issueNumberFromLink, totalToParts } from "../../lib";
import { SavedState_Task } from "../interfaces";

export function createTasksReport(tasks: SavedState_Task[]): string {
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
  return content;
}
