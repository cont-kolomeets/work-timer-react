import { issueNumberFromLink, totalToParts } from "../../../lib";
import { SavedState_Task } from "../../interfaces";

export function createTasksReport(rawTasks: SavedState_Task[]): string {
  const tasks: Pick<SavedState_Task, "label" | "link" | "time">[] = [];
  const bugs: Pick<SavedState_Task, "label" | "link" | "time">[] = [];

  const mergedTasks: Record<
    string,
    Pick<SavedState_Task, "label" | "link" | "time">
  > = {};
  rawTasks.forEach((task) => {
    if (!mergedTasks[task.link]) {
      const t = {
        label: task.label,
        link: task.link,
        time: task.time,
      };
      mergedTasks[task.link] = t;
      task.type === "bug" ? bugs.push(t) : tasks.push(t);
    } else {
      mergedTasks[task.link].time += task.time;
    }
  });

  let tasksContent = "";
  let tasksTotal_days = 0;
  tasks.sort((t1, t2) => t2.time - t1.time);
  tasks.forEach((task) => {
    const days = _toDays(task.time);
    if (days === 0) {
      bugs.push(task); // too little work for a task
      return;
    }

    tasksTotal_days += days;
    tasksContent += `${issueNumberFromLink(task.link)} ${
      task.label
    } - ${days} ${days === 1 ? "day" : "days"}\n`;
  });

  let bugsContent = "";
  let bugsTotalTime = 0;
  bugs.forEach((bug, index) => {
    bugsTotalTime += bug.time;
    bugsContent += `${issueNumberFromLink(bug.link)}${
      index < bugs.length - 1 ? ", " : ""
    }`;
  });

  return `Total time: ${tasksTotal_days + _toDays(bugsTotalTime)} days

Tasks: ${tasksTotal_days} days
  
${tasksContent}
Bugs: ${_toDays(bugsTotalTime)} days
  
${bugsContent}`;
}

function _toDays(time: number): number {
  const p = totalToParts(time);
  const days = (p.h + (p.m >= 20 ? 1 : 0)) / 8;
  const fr = days - Math.trunc(days);
  return Math.trunc(days) + (fr >= 0.75 ? 1 : fr > 0.25 ? 0.5 : 0);
}
