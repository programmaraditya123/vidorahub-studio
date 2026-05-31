"use client";

import { useState } from "react";
import shared from "../profileShared.module.scss";
import styles from "./SettingsSection.module.scss";
import { User, Lock, Bell, Trash2 } from "lucide-react";

type ToggleProps = {
  label: string;
  description?: string;
  defaultOn?: boolean;
};

function Toggle({ label, description, defaultOn = false }: ToggleProps) {
  const [on, setOn] = useState(defaultOn);

  return (
    <div className={styles.toggleRow}>
      <div>
        <span className={styles.toggleLabel}>{label}</span>
        {description && <p className={styles.toggleDesc}>{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        className={`${styles.switch} ${on ? styles.switchOn : ""}`}
        onClick={() => setOn(!on)}
      />
    </div>
  );
}

export default function SettingsSection() {
  return (
    <div className={shared.section}>
      <header className={shared.header}>
        <h1>Settings</h1>
        <p>Manage your account, privacy, notifications, and security.</p>
      </header>

      <section className={styles.group}>
        <div className={styles.groupHead}>
          <User size={18} />
          <h2>Account</h2>
        </div>
        <div className={shared.card}>
          <div className={styles.field}>
            <label htmlFor="display-name">Display name</label>
            <input id="display-name" type="text" defaultValue="@alexdesign" />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" defaultValue="alex@example.com" />
          </div>
          <div className={styles.field}>
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              rows={3}
              defaultValue="Collector of aesthetics & supporting the next wave of creators"
            />
          </div>
          <button type="button" className={shared.btnPrimary}>
            Save changes
          </button>
        </div>
      </section>

      <section className={styles.group}>
        <div className={styles.groupHead}>
          <Bell size={18} />
          <h2>Notifications</h2>
        </div>
        <div className={shared.card}>
          <Toggle
            label="Brand deal updates"
            description="New offers, messages, and contract changes"
            defaultOn
          />
          <Toggle
            label="Analytics weekly digest"
            description="Summary of views and engagement"
            defaultOn
          />
          <Toggle
            label="Marketing from VidoraHub"
            description="Product news and creator tips"
          />
        </div>
      </section>

      <section className={styles.group}>
        <div className={styles.groupHead}>
          <Lock size={18} />
          <h2>Privacy & security</h2>
        </div>
        <div className={shared.card}>
          <Toggle
            label="Public profile"
            description="Allow anyone to view your profile"
            defaultOn
          />
          <Toggle label="Show collections" description="Display saved creator collections" defaultOn />
          <button type="button" className={shared.btnSecondary}>
            Change password
          </button>
        </div>
      </section>

      <section className={styles.dangerZone}>
        <div className={styles.groupHead}>
          <Trash2 size={18} />
          <h2>Danger zone</h2>
        </div>
        <div className={styles.dangerCard}>
          <p>Permanently delete your account and all associated data.</p>
          <button type="button" className={styles.dangerBtn}>
            Delete account
          </button>
        </div>
      </section>
    </div>
  );
}
