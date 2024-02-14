import "./TaskDialog.scss";
import Dialog from "../../shared/Dialog/Dialog";

type TaskDialogProps = {
  onClose(): void;
};

export default function TaskDialog({ onClose }: TaskDialogProps) {
  return (
    <Dialog title="Add task" className="wt-task-dialog" onClose={onClose}>
      Hello
    </Dialog>
  );
}
