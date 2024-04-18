import { Action } from "../../../../shared/ui";
import { useUserPanel } from "../../model/useUserPanel";
import "./UserCard.scss";

export function UserCard() {
  const { fullName, logOut } = useUserPanel();

  return (
    <div className="wt-user-card wt-flex-row wt-flex-gap-8 wt-pad-8 ">
      <div>Hello, {fullName}!</div>
      <Action name="box-arrow-right" size="16" onClick={logOut} />
    </div>
  );
}
