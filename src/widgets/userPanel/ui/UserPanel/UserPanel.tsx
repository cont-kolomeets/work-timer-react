import { useUserPanel } from "../../model/useUserPanel";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { SignInForm } from "../SignInForm/SignInForm";
import { UserCard } from "../UserCard/UserCard";
import "./UserPanel.scss";

export function UserPanel() {
  const { userState, logIn, register, toRegister, toSignIn } = useUserPanel();
  return (
    <div className="wt-stretched wt-flex-row wt-flex-center wt-user-panel">
      {userState === "logged-in" ? (
        <UserCard />
      ) : userState === "logged-out" ? (
        <SignInForm onLogin={logIn} onRegister={toRegister} />
      ) : (
        <RegisterForm onRegister={register} onSignIn={toSignIn} />
      )}
    </div>
  );
}
