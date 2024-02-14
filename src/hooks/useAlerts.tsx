import { useSelector, useDispatch } from "react-redux";
import {
  getAllAlerts,
  hideAlert,
} from "../components/shared/Alert/store/alertSlice";
import Alert from "../components/shared/Alert/Alert";

export default function useAlerts() {
  const alerts = useSelector(getAllAlerts); // gets current alerts from the store
  const dispatch = useDispatch(); // connector to the store

  const alertsContent = alerts.map((a) => {
    return (
      <Alert
        key={a.id} // unique key to avoid re-rendering
        title={a.title}
        message={a.message}
        onClose={() => {
          dispatch(hideAlert(a.id)); // will update the store and re-render the components that listen to it
        }}
      />
    );
  });
  return alertsContent.length ? alertsContent : null;
}
