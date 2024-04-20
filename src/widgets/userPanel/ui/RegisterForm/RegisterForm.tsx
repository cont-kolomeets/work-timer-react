import { UserForm } from "../UserForm/UserForm";

export function RegisterForm({
  onRegister,
  onSignIn,
  onCheckUsername,
  usernameStatus,
}: {
  onRegister(params: {
    username: string;
    password: string;
    fullName: string;
  }): void;
  onSignIn(): void;
  onCheckUsername(username: string): void;
  usernameStatus: undefined | "available" | "not-available" | "loading";
}) {
  return (
    <UserForm
      title="Register to Work Timer"
      hasFullName={true}
      submitButtonText="Register"
      secondaryButtonText="Log in"
      onSubmit={onRegister}
      onSecondaryButtonClicked={onSignIn}
      needValidateUsername={true}
      onCheckUsername={onCheckUsername}
      usernameStatus={usernameStatus}
    />
  );
}
