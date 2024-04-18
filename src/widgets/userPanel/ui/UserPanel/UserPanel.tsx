import { Loader } from "../../../../shared/ui";
import { useUserPanel } from "../../model/useUserPanel";
import "./UserPanel.scss";

export function UserPanel() {
  const { loadingStatus } = useUserPanel();

  if (loadingStatus === "loading") {
    return <Loader />;
  }

  return (
    <div className="wt-stretched wt-flex-row wt-flex-center wt-user-panel">
      <div></div>
    </div>
  );
}
