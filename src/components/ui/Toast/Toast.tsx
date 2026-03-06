"use client";

import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import styles from "./Toast.module.scss";

interface Props {
  message: string;
  type: "error" | "warning" | "info";
}

export default function Toast({ message, type }: Props) {
  const icons = {
    error: <AlertCircle size={20} />,
    warning: <AlertTriangle size={20} />,
    info: <Info size={20} />,
  };

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      {icons[type]}
      <span>{message}</span>
    </div>
  );
}