"use client";

import { AlertCircle, AlertTriangle, CircleCheck, Info } from "lucide-react";
import styles from "./Toast.module.scss";

interface Props {
  message: string;
  type: "error" | "warning" | "info" | "success";
}

export default function Toast({ message, type }: Props) {
  const icons = {
    error: <AlertCircle size={20} />,
    warning: <AlertTriangle size={20} />,
    info: <Info size={20} />,
    success: <CircleCheck size={20} />,
  };

  return (
    <div className={`${styles.toast} ${styles[type]}`} role={type === "error" ? "alert" : "status"} aria-atomic="true">
      {icons[type]}
      <span>{message}</span>
    </div>
  );
}
