import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Alert } from "../ui/Alert";
import { alertModel } from "./alertModel";

/**
 * Allows alerts to be shown in the page.
 */
export function useAlerts() {
  const alerts = useAppSelector(alertModel.selectors.getShownAlerts); // gets current alerts from the store
  const dispatch = useAppDispatch(); // connector to the store

  const alertsContent = alerts.map((a) => {
    return (
      <Alert
        key={a.id} // unique key to avoid re-rendering
        title={a.title}
        message={a.message}
        onClosed={() => {
          dispatch(alertModel.actions.hideAlert(a.id)); // will update the store and re-render the components that listen to it
        }}
      />
    );
  });
  return alertsContent.length ? alertsContent : null;
}
