"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AlertCircle, LoaderCircle, Store, X } from "lucide-react";
import { useToast } from "@/hooks/ToastProvider";
import {
  createStore, getStoreDetails, updateStore, storeErrorMessage, storeToForm,
  storeFormToPayload, validateStoreForm, type StoreCurrency, type StoreForm,
  type StoreFieldErrors,
} from "@/lib/stores";
import styles from "../AddProductModal/AddProductModal.module.scss";
import local from "./StoreFormModal.module.scss";

type Props = { mode: "create" | "update"; close: () => void; onSaved: () => void };

function Field({ name, label, error, hint, children }: {
  name: keyof StoreForm; label: string; error?: string; hint?: string; children: ReactNode;
}) {
  return (
    <div className={`${styles.field} ${error ? styles.fieldError : ""}`}>
      <label htmlFor={`store-${name}`}>{label}</label>
      {children}
      {(error || hint) && <p id={`store-${name}-hint`} className={error ? local.fieldError : styles.hint}>{error || hint}</p>}
    </div>
  );
}

export default function StoreFormModal({ mode: initialMode, close, onSaved }: Props) {
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState<StoreForm>(() => storeToForm());
  const [initialForm, setInitialForm] = useState<StoreForm>(() => storeToForm());
  const [loading, setLoading] = useState(initialMode === "update");
  const [loadError, setLoadError] = useState("");
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [errors, setErrors] = useState<StoreFieldErrors>({});
  const [confirmClose, setConfirmClose] = useState(false);
  const busy = useRef(false);
  const mounted = useRef(true);
  const dialogRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();
  const dirty = JSON.stringify(form) !== JSON.stringify(initialForm);

  useEffect(() => {
    mounted.current = true;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const keepFocusInDialog = (event: FocusEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) dialogRef.current.focus();
    };
    document.addEventListener("focusin", keepFocusInDialog);
    return () => {
      mounted.current = false;
      document.removeEventListener("focusin", keepFocusInDialog);
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, []);

  useEffect(() => {
    if (mode !== "update") return;
    const controller = new AbortController();
    getStoreDetails(controller.signal).then(store => {
      if (controller.signal.aborted) return;
      const next = storeToForm(store ?? undefined);
      setForm(next);
      setInitialForm(next);
      if (!store) {
        setMode("create");
        setNotice("No store was found. You can create one below.");
      }
      setLoading(false);
    }).catch(reason => {
      if (controller.signal.aborted) return;
      setLoadError(storeErrorMessage(reason, "Could not load your store details. Please try again."));
      setLoading(false);
    });
    return () => controller.abort();
  }, [mode, loadAttempt]);

  useEffect(() => {
    if (!dirty && !saving) return;
    const beforeUnload = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [dirty, saving]);

  const requestClose = () => {
    if (busy.current) return;
    if (dirty) setConfirmClose(true);
    else close();
  };

  const change = <K extends keyof StoreForm>(key: K, value: StoreForm[K]) => {
    setForm(previous => ({ ...previous, [key]: value }));
    setErrors(previous => ({ ...previous, [key]: undefined }));
    setError("");
    setConfirmClose(false);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy.current || loading || loadError) return;
    const nextErrors = validateStoreForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const field = Object.keys(nextErrors)[0];
      document.getElementById(`store-${field}`)?.focus();
      return;
    }
    busy.current = true;
    setSaving(true);
    setError("");
    setConfirmClose(false);
    try {
      const payload = storeFormToPayload(form);
      const result = await (mode === "create" ? createStore(payload) : updateStore(payload));
      if (!mounted.current) return;
      if (result.alreadyExists) {
        setNotice("A store already exists for your account. Review its current details before updating.");
        setLoading(true);
        setMode("update");
        return;
      }
      showToast(result.message, "success");
      onSaved();
    } catch (reason) {
      if (!mounted.current) return;
      const message = storeErrorMessage(reason);
      setError(message);
      showToast(message, "error");
    } finally {
      busy.current = false;
      if (mounted.current) setSaving(false);
    }
  };

  const textField = (name: "name" | "description" | "categories" | "subcategories" | "location" | "websiteurl" | "shipping" | "returns", label: string, hint?: string, multiline = false) => {
    const props = {
      id: `store-${name}`, name, value: form[name],
      required: name !== "websiteurl" && name !== "subcategories",
      "aria-invalid": Boolean(errors[name]),
      "aria-describedby": errors[name] || hint ? `store-${name}-hint` : undefined,
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => change(name, event.target.value),
    };
    return <Field name={name} label={label} error={errors[name]} hint={hint}>
      {multiline ? <textarea {...props} rows={3} /> : <input {...props} type={name === "websiteurl" ? "url" : "text"} />}
    </Field>;
  };

  return createPortal(
    <div className={styles.overlay} onClick={event => { if (event.target === event.currentTarget) requestClose(); }}>
      <div ref={dialogRef} className={`${styles.modal} ${local.modal}`} role="dialog" aria-modal="true" aria-labelledby="store-dialog-title" tabIndex={-1}
        onKeyDown={event => {
          if (event.key === "Escape") { event.preventDefault(); requestClose(); }
          if (event.key !== "Tab") return;
          const elements = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]')).filter(element => !element.matches(":disabled"));
          const first = elements[0];
          const last = elements[elements.length - 1];
          if (!first) { event.preventDefault(); return; }
          if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialogRef.current)) { event.preventDefault(); first.focus(); }
        }}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h3 id="store-dialog-title">{mode === "create" ? "Create your store" : "Update your store"}</h3>
            <p>Set up your storefront, currency, and customer policies.</p>
          </div>
          <button type="button" className={styles.close} onClick={requestClose} disabled={saving} aria-label="Close store settings"><X size={20} /></button>
        </div>

        {loading ? <div className={local.loading} role="status"><LoaderCircle className={local.spin} size={24} /> Loading store details…</div>
          : loadError ? <div className={local.loading}><p role="alert">{loadError}</p><button className={styles.cancel} onClick={() => { setLoading(true); setLoadError(""); setLoadAttempt(value => value + 1); }}>Try again</button></div>
          : <form className={local.form} onSubmit={submit} noValidate aria-busy={saving}>
            <div className={`${styles.body} ${local.body}`}>
              {notice && <p className={local.notice} role="status">{notice}</p>}
              {error && <div className={`${styles.alert} ${styles.alertError}`} role="alert"><AlertCircle size={18} /><span>{error}</span></div>}
              <fieldset disabled={saving} className={local.fields}>
                <legend className={local.legend}><Store size={16} /> Store details</legend>
                {textField("name", "Store name")}
                {textField("description", "Description", "Tell customers what your store offers.", true)}
                <div className={styles.row2}>
                  {textField("categories", "Categories", "Separate categories with commas.")}
                  {textField("subcategories", "Subcategories (optional)", "Separate subcategories with commas.")}
                </div>
                <div className={styles.row2}>
                  <Field name="currency" label="Currency" error={errors.currency}>
                    <select id="store-currency" value={form.currency} onChange={event => change("currency", event.target.value as StoreCurrency)} aria-invalid={Boolean(errors.currency)} aria-describedby={errors.currency ? "store-currency-hint" : undefined}>
                      <option value="rupee">Indian rupee (INR)</option><option value="dollar">US dollar (USD)</option><option value="euro">Euro (EUR)</option><option value="yen">Japanese yen (JPY)</option>
                    </select>
                  </Field>
                  {textField("location", "Location")}
                </div>
                {textField("websiteurl", "Website URL (optional)", "For example, https://yourstore.com")}
                <label className={local.availability}><input type="checkbox" checked={form.isAvailable} onChange={event => change("isAvailable", event.target.checked)} /><span><strong>Store available</strong><small>Turn off to mark your store as unavailable.</small></span></label>
                <h4 className={local.legend}>Customer policies</h4>
                {textField("shipping", "Shipping policy", "For digital items, explain delivery or say shipping does not apply.", true)}
                {textField("returns", "Return policy", "Explain returns, refunds, or cancellations.", true)}
              </fieldset>
            </div>
            <div className={`${styles.footer} ${local.footer}`}>
              {confirmClose ? <div className={local.confirm} role="alert"><p>Discard your unsaved changes?</p><div className={styles.actions}><button type="button" className={styles.cancel} onClick={() => setConfirmClose(false)}>Keep editing</button><button type="button" className={styles.save} onClick={close}>Discard changes</button></div></div>
                : <><p className={styles.footerNote}>Your details help customers shop with confidence.</p><div className={styles.actions}><button type="button" className={styles.cancel} onClick={requestClose} disabled={saving}>Cancel</button><button type="submit" className={styles.save} disabled={saving || (mode === "update" && !dirty)}>{saving && <span className={styles.spinner} aria-hidden="true" />}{saving ? "Saving…" : mode === "create" ? "Create store" : "Save changes"}</button></div></>}
            </div>
          </form>}
      </div>
    </div>, document.body,
  );
}
