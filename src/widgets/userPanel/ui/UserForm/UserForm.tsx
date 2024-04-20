import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../../../shared/model/useDebounce";
import { Button } from "../../../../shared/ui";
import "./UserForm.scss";
import { UsernameValidator } from "./UsernameValidator";

export function UserForm({
  title,
  submitButtonText,
  secondaryButtonText,
  hasFullName,
  onSubmit,
  onSecondaryButtonClicked,
  needValidateUsername,
  usernameStatus,
  onCheckUsername,
}: {
  title: string;
  submitButtonText: string;
  secondaryButtonText?: string;
  hasFullName: boolean;
  onSubmit(params: {
    username: string;
    password: string;
    fullName: string;
  }): void;
  onSecondaryButtonClicked?(): void;
  needValidateUsername?: boolean;
  usernameStatus?: undefined | "available" | "not-available" | "loading";
  onCheckUsername?(username: string): void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPasswrod] = useState("");
  const [fullName, setFullName] = useState("");

  const debouncedUsername = useDebounce(username, 500);
  const lastCheckedName = useRef("");

  useEffect(() => {
    const name = debouncedUsername.trim();
    if (!name || lastCheckedName.current === name) {
      return;
    }
    lastCheckedName.current = name;
    onCheckUsername?.(name);
  }, [lastCheckedName, onCheckUsername, debouncedUsername]);

  const _handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.key === "Enter" && _submit();
  };

  const _submit = () => {
    username.trim() &&
      password.trim() &&
      (!hasFullName || fullName.trim()) &&
      usernameStatus !== "not-available" &&
      onSubmit({
        username: username.trim(),
        password: password.trim(),
        fullName: fullName?.trim(),
      });
  };

  return (
    <div className="wt-user-form wt-flex-column wt-flex-gap-40">
      <div className="wt-form-title">{title}</div>
      <div className="wt-flex-row wt-form-row">
        <div>Username</div>
        <input
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          onKeyUp={_handleEnter}
        ></input>
        {needValidateUsername && usernameStatus ? (
          <UsernameValidator usernameStatus={usernameStatus} />
        ) : null}
      </div>
      <div className="wt-flex-row wt-form-row">
        <div>Password</div>
        <input
          type="password"
          value={password}
          onChange={(event) => setPasswrod(event.target.value)}
          onKeyUp={_handleEnter}
        ></input>
      </div>
      {hasFullName ? (
        <div className="wt-flex-row wt-form-row">
          <div>Full name</div>
          <input
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            onKeyUp={_handleEnter}
          ></input>
        </div>
      ) : null}
      <div className="wt-flex-row wt-flex-gap-20">
        <Button
          className="wt-flex-spacer"
          disabled={
            !username.trim() ||
            !password.trim() ||
            (hasFullName && !fullName?.trim()) ||
            usernameStatus === "not-available"
          }
          onClick={_submit}
        >
          {submitButtonText}
        </Button>
        {secondaryButtonText && onSecondaryButtonClicked ? (
          <>
            or
            <Button
              className="wt-flex-spacer"
              onClick={onSecondaryButtonClicked}
            >
              {secondaryButtonText}
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
}
