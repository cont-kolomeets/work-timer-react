import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/redux/hooks";
import { userModel } from "./userModel";

export function useUserPanel() {
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector(userModel.selectors.getLoadingStatus);

  useEffect(() => {
    dispatch(userModel.actions.checkSignInState());
  }, [dispatch]);

  return {
    loadingStatus,
  };
}
