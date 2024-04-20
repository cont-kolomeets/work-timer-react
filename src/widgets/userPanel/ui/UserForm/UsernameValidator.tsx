import { Action } from "../../../../shared/ui";
import "./UsernameValidator.scss";

export function UsernameValidator({
  usernameStatus,
}: {
  usernameStatus: "available" | "not-available" | "loading";
}) {
  return (
    <div
      className="wt-user-name-validator wt-flex-row wt-flex-gap-8"
      style={{
        color:
          usernameStatus === "loading"
            ? "yellow"
            : usernameStatus === "not-available"
            ? "red"
            : "greenyellow",
      }}
    >
      <div>
        {usernameStatus === "available"
          ? "good name"
          : usernameStatus === "not-available"
          ? "already taken"
          : "checking name"}
      </div>
      <Action
        name={
          usernameStatus === "not-available"
            ? "exclamation-triangle"
            : "check-circle"
        }
        loading={usernameStatus === "loading"}
        size="16"
      />
    </div>
  );
}
