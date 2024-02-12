import { selectTaskIds } from "../tasksSlice";
import TaskCard from "./TaskCard";
import "./TasksList.scss";
import { useSelector } from "react-redux";

export default function TasksList() {
  const taskIds = useSelector(selectTaskIds);
  //const loadingStatus = useSelector((state) => state.tasks.status) // ??

  return (
    <div className="wt-tasks-list">
      {taskIds.map((id) => {
        return <TaskCard key={id} id={id} />;
      })}
    </div>
  );
}
