import Loader from "../../shared/Loader/Loader";
import { selectTaskIds } from "../store/tasksSlice";
import TaskCard from "./TaskCard";
import "./TasksList.scss";
import { useSelector } from "react-redux";

export default function TasksList() {
  const taskIds = useSelector(selectTaskIds);
  const loadingStatus = useSelector((state: any) => state.tasks.status);

  if (loadingStatus === "loading") {
    return <Loader />;
  }

  return (
    <div className="wt-tasks-list">
      {taskIds.map((id) => {
        return <TaskCard key={id} id={id} />;
      })}
    </div>
  );
}
