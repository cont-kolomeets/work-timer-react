import "./Alert.scss";
import { ReactNode, useState } from "react";

type AlertProps = {
  title: string;
  className: string;
  children: ReactNode;
};

export default function Alert({ title, className, children }: AlertProps) {
  const [shown, setShown] = useState<"" | "shown" | "hidden">("");
  const _closeAlert = () => {
    setShown("hidden");
  };

  return (
    <div className={`wt-alert  ${className} ${shown}`}>
      <div className="wt-pad-12">{title}</div>
      <div className="wt-pad-12">{children}</div>
    </div>
  );
}
