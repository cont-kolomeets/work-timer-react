import { useUserPanel } from "../../model/useUserPanel";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { SignInForm } from "../SignInForm/SignInForm";
import { UserCard } from "../UserCard/UserCard";
import "./UserPanel.scss";

export function UserPanel() {
  const {
    userState,
    logIn,
    register,
    toRegister,
    toSignIn,
    checkUsername,
    registerUsernameState,
  } = useUserPanel();
  return userState === "logged-in" ? (
    <UserCard />
  ) : (
    <div className="wt-stretched wt-flex-row wt-flex-center wt-user-panel">
      {userState === "logged-out" ? (
        <SignInForm onLogin={logIn} onRegister={toRegister} />
      ) : (
        <RegisterForm
          onRegister={register}
          onSignIn={toSignIn}
          onCheckUsername={checkUsername}
          usernameStatus={registerUsernameState}
        />
      )}
    </div>
  );
}
