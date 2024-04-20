import { UserForm } from "../UserForm/UserForm";

export function SignInForm({
  onLogin,
  onRegister,
}: {
  onLogin(params: { username: string; password: string }): void;
  onRegister(): void;
}) {
  return (
    <UserForm
      title="Log in to Work Timer"
      hasFullName={false}
      submitButtonText="Log in"
      secondaryButtonText="Register"
      onSubmit={onLogin}
      onSecondaryButtonClicked={onRegister}
    />
  );
}
