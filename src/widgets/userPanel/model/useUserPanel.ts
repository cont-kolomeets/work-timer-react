import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/redux/hooks";
import { alertModel } from "../../../entities/alert/model/alertModel";
import { userModel } from "./userModel";

export function useUserPanel() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(userModel.selectors.getState);
  const fullName = useAppSelector(userModel.selectors.getLoggedIn_fullName);
  const signInError = useAppSelector(userModel.selectors.getSignIn_error);
  const registerState = useAppSelector(userModel.selectors.getRegister_state);
  const registerUsernameState = useAppSelector(
    userModel.selectors.getRegister_nameState
  );

  useEffect(() => {
    if (signInError) {
      dispatch(userModel.actions.clearStates());
      dispatch(
        alertModel.actions.showAlert({
          title: "Error!",
          message: "Failed to log it. Username or password may be incorrect.",
          timeout: 5000,
        })
      );
    }
  }, [dispatch, signInError]);

  useEffect(() => {
    if (registerState) {
      dispatch(userModel.actions.clearStates());
      dispatch(
        alertModel.actions.showAlert({
          title: registerState === "success" ? "Congratulation!" : "Error!",
          message:
            registerState === "success"
              ? "Registration complete! Please log in with your credentials."
              : "Failed to register. Please try again.",
          timeout: 5000,
        })
      );
    }
  }, [dispatch, registerState]);

  const logIn = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    dispatch(userModel.actions.setSignIn_username(username));
    dispatch(userModel.actions.setSignIn_password(password));
    dispatch(userModel.actions.signIn());
  };

  const register = ({
    username,
    password,
    fullName,
  }: {
    username: string;
    password: string;
    fullName: string;
  }) => {
    dispatch(userModel.actions.setRegister_username(username));
    dispatch(userModel.actions.setRegister_password(password));
    dispatch(userModel.actions.setRegister_fullName(fullName));
    dispatch(userModel.actions.register());
  };

  const logOut = () => {
    dispatch(userModel.actions.signOut());
  };

  const toRegister = () => {
    dispatch(userModel.actions.setState("register"));
  };

  const toSignIn = () => {
    dispatch(userModel.actions.setState("logged-out"));
  };

  const checkUsername = (username: string) => {
    dispatch(userModel.actions.checkUserNameAvailable(username));
  };

  return {
    userState,
    fullName,
    toRegister,
    toSignIn,
    logIn,
    register,
    logOut,
    checkUsername,
    registerUsernameState,
  };
}
