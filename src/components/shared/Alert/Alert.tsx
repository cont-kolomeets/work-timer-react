import "./Alert.scss";
import { useState } from "react";

type AlertProps = {
  title: string;
  message: string;
  onClose(): void;
};

export default function Alert({ title, message, onClose }: AlertProps) {
  const [shown, setShown] = useState<"" | "shown" | "hidden">("");
  const _closeAlert = () => {
    setShown("hidden"); // will trigger the animation
    setTimeout(() => onClose(), 1000); // will notify the parent
  };

  setTimeout(() => {
    setShown((state) => state === "" ? "shown" : state); // will trigger the animation
  });

  return (
    <div className={`wt-flex-row wt-flex-center wt-alert ${shown}`}>
      <div className="wt-flex-spacer wt-pad-12">
        <div className="wt-margin-block-12 wt-alert__title">{title}</div>
        <div className="wt-margin-block-12">{message}</div>
      </div>
      <div className="wt-pad-12">
        <i className="bi bi-x wt-action-button" onClick={_closeAlert}></i>
      </div>
    </div>
  );
}