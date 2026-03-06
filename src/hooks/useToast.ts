"use client";

import { useState, useCallback } from "react";

export type ToastType = "error" | "warning" | "info";

export interface ToastData {
  message: string;
  type: ToastType;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastData | null>(null);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  return { toast, showToast };
};