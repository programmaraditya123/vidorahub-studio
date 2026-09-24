"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";
import { useToast } from "@/hooks/ToastProvider";
import { googleLogin } from "@/lib/LoginRegisterApis";
import styles from "./GoogleAuthButton.module.scss";

type GoogleIdentity = {
  initialize: (options: {
    client_id: string;
    callback: (response: { credential?: string }) => void;
    auto_select: boolean;
  }) => void;
  renderButton: (element: HTMLElement, options: {
    theme: string; size: string; text: string; shape: string; width: number;
  }) => void;
};

export default function GoogleAuthButton({ clientId }: { clientId?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const inFlight = useRef(false);
  const [ready, setReady] = useState(false);
  const [pending, setPending] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const { setToken } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const handlers = useRef({ setToken, showToast, router });

  useEffect(() => {
    handlers.current = { setToken, showToast, router };
  }, [setToken, showToast, router]);

  useEffect(() => {
    const google = (window as Window & {
      google?: { accounts?: { id?: GoogleIdentity } };
    }).google?.accounts?.id;
    const element = container.current;
    if (!ready || !clientId || !google || !element) return;
    let active = true;

    google.initialize({
      client_id: clientId,
      auto_select: false,
      callback: async ({ credential }) => {
        if (!active || inFlight.current) return;
        if (!credential) {
          handlers.current.showToast("Google did not return a sign-in token. Please try again.", "error");
          return;
        }
        inFlight.current = true;
        setPending(true);
        try {
          const result = await googleLogin(credential);
          if (!active) return;
          if (!result.success || !result.token) {
            throw new Error(result.message || "Google authentication failed");
          }
          localStorage.setItem("token", result.token);
          handlers.current.setToken(result.token);
          handlers.current.showToast(result.message || "Google login successful", "success");
          handlers.current.router.replace("/");
        } catch (error) {
          if (!active) return;
          const message = error && typeof error === "object" && "message" in error
            && typeof error.message === "string"
            ? error.message : "Google authentication failed. Please try again.";
          handlers.current.showToast(message, "error");
        } finally {
          inFlight.current = false;
          if (active) setPending(false);
        }
      },
    });
    let renderedWidth = 0;
    const renderButton = () => {
      const width = Math.min(Math.floor(element.clientWidth), 400);
      if (!width || width === renderedWidth) return;
      renderedWidth = width;
      element.replaceChildren();
      google.renderButton(element, {
        theme: "outline", size: "large", text: "continue_with", shape: "pill", width,
      });
    };
    renderButton();
    const observer = new ResizeObserver(renderButton);
    observer.observe(element);

    return () => {
      active = false;
      observer.disconnect();
      element.replaceChildren();
    };
  }, [ready, clientId]);

  return (
    <div className={styles.wrapper} aria-busy={pending}>
      {clientId && (
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
          onReady={() => setReady(true)}
          onError={() => setScriptError(true)}
        />
      )}
      <div ref={container} className={styles.button} inert={pending} />
      <p className={styles.status} role="status">
        {!clientId || scriptError
          ? "Google sign-in is unavailable. Please use email instead."
          : pending ? "Signing in with Google…" : !ready ? "Loading Google sign-in…" : null}
      </p>
      <div className={styles.divider}><span>or continue with email</span></div>
    </div>
  );
}
