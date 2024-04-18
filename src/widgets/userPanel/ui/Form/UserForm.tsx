import { useState } from "react";
import { Button } from "../../../../shared/ui";
import "./UserForm.scss";

export function UserForm({
  title,
  submitButtonText,
  secondaryButtonText,
  hasFullName,
  onSubmit,
  onSecondaryButtonClicked,
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
}) {
  const [username, setUsername] = useState("");
  const [password, setPasswrod] = useState("");
  const [fullName, setFullName] = useState("");

  const _handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.key === "Enter" && _submit();
  };

  const _submit = () => {
    username &&
      password &&
      (!hasFullName || fullName) &&
      onSubmit({ username, password, fullName });
  };

  return (
    <div className="wt-user-form wt-flex-column wt-flex-gap-40">
      <div className="wt-form-title">{title}</div>
      <div className="wt-flex-row wt-form-row">
        <div>Username</div>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value.trim())}
          onKeyUp={_handleEnter}
        ></input>
      </div>
      <div className="wt-flex-row wt-form-row">
        <div>Password</div>
        <input
          type="password"
          value={password}
          onChange={(event) => setPasswrod(event.target.value.trim())}
          onKeyUp={_handleEnter}
        ></input>
      </div>
      {hasFullName ? (
        <div className="wt-flex-row wt-form-row">
          <div>Full name</div>
          <input
            value={fullName}
            onChange={(event) => setFullName(event.target.value.trim())}
            onKeyUp={_handleEnter}
          ></input>
        </div>
      ) : null}
      <div className="wt-flex-row wt-flex-gap-20">
        <Button
          className="wt-flex-spacer"
          disabled={!username || !password || (hasFullName && !fullName)}
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
