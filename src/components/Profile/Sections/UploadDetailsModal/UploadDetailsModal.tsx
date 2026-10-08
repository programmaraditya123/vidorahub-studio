"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useToast } from "@/hooks/ToastProvider";
import { uploadErrorMessage, type CreatorUpload, type SaveUploadDetails, type UploadEditableField } from "@/lib/uploads";
import { uploadFields } from "./uploadFields";
import styles from "../AddProductModal/AddProductModal.module.scss";
import local from "./UploadDetailsModal.module.scss";

type Props = {
  upload: CreatorUpload;
  field: UploadEditableField;
  close: () => void;
  onSaved: () => void;
  saveDetails?: SaveUploadDetails;
};

export default function UploadDetailsModal({ upload, field, close, onSaved, saveDetails }: Props) {
  const { showToast } = useToast();
  const config = uploadFields[field];
  const previousValue = field === "tags" ? upload.tags.join("\n") : upload[field];
  const [newValue, setNewValue] = useState(previousValue);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [confirmClose, setConfirmClose] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const mounted = useRef(true);
  const dirty = newValue !== previousValue;

  useEffect(() => {
    mounted.current = true;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.querySelector<HTMLElement>("#upload-new-value")?.focus();
    const containFocus = (event: FocusEvent) => {
      if (dialog.current && !dialog.current.contains(event.target as Node)) dialog.current.focus();
    };
    document.addEventListener("focusin", containFocus);
    return () => {
      mounted.current = false;
      document.removeEventListener("focusin", containFocus);
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const beforeUnload = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [dirty]);

  const requestClose = () => {
    if (busy.current) return;
    if (dirty) setConfirmClose(true);
    else close();
  };
  const change = (value: string) => {
    setNewValue(value);
    setConfirmClose(false);
    setError("");
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!saveDetails || busy.current || !dirty) return;
    if (field === "title" && !newValue.trim()) { setError("Enter a title."); document.getElementById("upload-new-value")?.focus(); return; }
    busy.current = true;
    setSaving(true);
    setError("");
    try {
      // Submit only the selected field so unrelated details cannot be overwritten.
      const update = field === "tags"
        ? { tags: Array.from(new Set(newValue.split("\n").map(tag => tag.trim()).filter(Boolean))) }
        : { [field]: field === "description" ? newValue : newValue.trim() };
      const message = await saveDetails(upload._id, update);
      if (mounted.current) {
        showToast(message || `${config.label} updated successfully.`, "success");
        onSaved();
      }
    } catch (reason) {
      if (mounted.current) {
        const message = uploadErrorMessage(reason);
        setError(message);
        showToast(message, "error");
      }
    } finally {
      busy.current = false;
      if (mounted.current) setSaving(false);
    }
  };

  return createPortal(<div className={styles.overlay} onClick={event => { if (event.target === event.currentTarget) requestClose(); }}>
    <div ref={dialog} className={`${styles.modal} ${local.modal}`} role="dialog" aria-modal="true" aria-labelledby="upload-dialog-title" tabIndex={-1} onKeyDown={event => {
      if (event.key === "Escape") { event.preventDefault(); requestClose(); }
      if (event.key !== "Tab") return;
      const elements = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), textarea:not(:disabled)'));
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (!first) { event.preventDefault(); return; }
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog.current)) { event.preventDefault(); first.focus(); }
    }}>
      <div className={styles.header}><div className={styles.headerText}><h3 id="upload-dialog-title">Update {config.label.toLowerCase()}</h3><p>{upload.title}</p></div><button type="button" className={styles.close} onClick={requestClose} disabled={saving} aria-label={`Close ${config.label.toLowerCase()} editor`}><X size={20} /></button></div>
      <form className={local.form} onSubmit={submit} aria-busy={saving}>
        <div className={styles.body}>
          <fieldset className={local.fields} disabled={saving}>
            <div className={styles.field}>
              <label htmlFor="upload-previous-value">Current {config.label.toLowerCase()}</label>
              {config.multiline ? <textarea id="upload-previous-value" className={local.frozen} rows={field === "description" ? 5 : 3} value={previousValue} readOnly aria-describedby="upload-previous-hint" /> : <input id="upload-previous-value" className={local.frozen} value={previousValue} readOnly aria-describedby="upload-previous-hint" />}
              <p id="upload-previous-hint" className={styles.hint}>Current saved value (read only).</p>
            </div>
            <div className={styles.field}>
              <label htmlFor="upload-new-value">New {config.label.toLowerCase()}</label>
              {config.multiline ? <textarea id="upload-new-value" rows={field === "description" ? 6 : 3} value={newValue} onChange={event => change(event.target.value)} aria-describedby={config.hint ? "upload-new-hint" : undefined} /> : <input id="upload-new-value" type="text" required={config.required} value={newValue} onChange={event => change(event.target.value)} />}
              {config.hint && <p id="upload-new-hint" className={styles.hint}>{config.hint}</p>}
            </div>
          </fieldset>
          {!saveDetails && <p className={local.notice} role="status">Saving upload details is currently unavailable.</p>}
          {error && <p className={local.error} role="alert">{error}</p>}
        </div>
        <div className={styles.footer}>
          {confirmClose ? <div className={local.confirm}><p>Discard your unsaved changes?</p><div><button type="button" className={styles.cancel} onClick={() => setConfirmClose(false)}>Keep editing</button><button type="button" className={styles.submit} onClick={close}>Discard changes</button></div></div>
            : <><button type="button" className={styles.cancel} onClick={requestClose} disabled={saving}>Cancel</button><button type="submit" className={styles.submit} disabled={saving || !dirty || !saveDetails}>{saving ? "Saving…" : `Update ${config.label.toLowerCase()}`}</button></>}
        </div>
      </form>
    </div>
  </div>, document.body);
}
