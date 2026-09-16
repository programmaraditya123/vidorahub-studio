"use client";

import { useEffect, useState } from "react";
import { LoaderCircle, Store, RefreshCw } from "lucide-react";
import { getStoreStatus, storeErrorMessage } from "@/lib/stores";
import StoreFormModal from "./StoreFormModal";
import shared from "../../profileShared.module.scss";
import styles from "../StoreSection.module.scss";

type Status = "loading" | "create" | "update" | "error";

export default function StoreManagement() {
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    getStoreStatus(controller.signal).then(exists => {
      if (!controller.signal.aborted) setStatus(exists ? "update" : "create");
    }).catch(reason => {
      if (controller.signal.aborted) return;
      setError(storeErrorMessage(reason, "Could not check your store status."));
      setStatus("error");
    });
    return () => controller.abort();
  }, [attempt]);

  const refresh = () => { setStatus("loading"); setError(""); setAttempt(value => value + 1); };

  return <div className={styles.storeManagement}>
    <button type="button" className={shared.btnSecondary} disabled={status === "loading"} onClick={() => status === "error" ? refresh() : setOpen(true)}>
      {status === "loading" ? <LoaderCircle size={16} className={styles.spin} /> : status === "error" ? <RefreshCw size={16} /> : <Store size={16} />}
      {status === "loading" ? "Checking store…" : status === "error" ? "Retry store status" : status === "create" ? "Create store" : "Update store"}
    </button>
    {status === "error" && <p className={styles.storeStatusError} role="alert">{error}</p>}
    {open && (status === "create" || status === "update") && <StoreFormModal mode={status} close={() => { setOpen(false); refresh(); }} onSaved={() => { setOpen(false); setStatus("update"); }} />}
  </div>;
}
