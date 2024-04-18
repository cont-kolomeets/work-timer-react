import { UserForm } from "../Form/UserForm";

export function RegisterForm({
  onRegister,
  onSignIn,
}: {
  onRegister(params: {
    username: string;
    password: string;
    fullName: string;
  }): void;
  onSignIn(): void;
}) {
  return (
    <UserForm
      title="Register to Work Timer"
      hasFullName={true}
      submitButtonText="Register"
      secondaryButtonText="Log in"
      onSubmit={onRegister}
      onSecondaryButtonClicked={onSignIn}
    />
  );
}
