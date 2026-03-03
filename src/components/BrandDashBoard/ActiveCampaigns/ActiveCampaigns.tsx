"use client";

import { useState } from "react";
import styles from "./ActiveCampaigns.module.scss";
import { MoreVertical } from "lucide-react";

type Campaign = {
  id: number;
  title: string;
  budget: string;
  duration: string;
  status: "ACTIVE" | "REVIEWING" | "DRAFT";
};

const campaigns: Campaign[] = [
  {
    id: 1,
    title: "Summer Vlog Series 2024",
    budget: "$5k - $12k",
    duration: "3 Months",
    status: "ACTIVE",
  },
  {
    id: 2,
    title: "Tech Unboxing & Review",
    budget: "$2k - $4k",
    duration: "4 Weeks",
    status: "REVIEWING",
  },
  {
    id: 3,
    title: "Livestream Product Launch",
    budget: "$15k+",
    duration: "2 Months",
    status: "DRAFT",
  },
];

export default function ActiveCampaigns() {
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    type: "delete" | "deactivate";
    campaignId: number;
  } | null>(null);

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Active Campaigns</h2>
        <button className={styles.viewAll}>View All</button>
      </div>

      <div className={styles.list}>
        {campaigns.map((campaign) => (
          <div key={campaign.id} className={styles.card}>
            <div className={styles.left}>
              <div className={styles.icon}></div>

              <div>
                <h3>{campaign.title}</h3>
                <p>
                  {campaign.budget} • {campaign.duration}
                </p>
              </div>
            </div>

            <div className={styles.right}>
              <span
                className={`${styles.badge} ${
                  styles[campaign.status]
                }`}
              >
                {campaign.status}
              </span>

              <button
                className={styles.menuBtn}
                onClick={() =>
                  setMenuOpen(
                    menuOpen === campaign.id
                      ? null
                      : campaign.id
                  )
                }
              >
                <MoreVertical size={18} />
              </button>

              {menuOpen === campaign.id && (
                <div className={styles.dropdown}>
                  <button
                    onClick={() =>
                      setConfirmModal({
                        type: "deactivate",
                        campaignId: campaign.id,
                      })
                    }
                  >
                    Deactivate
                  </button>

                  <button
                    className={styles.delete}
                    onClick={() =>
                      setConfirmModal({
                        type: "delete",
                        campaignId: campaign.id,
                      })
                    }
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>
              Are you sure you want to{" "}
              {confirmModal.type === "delete"
                ? "delete"
                : "deactivate"}{" "}
              this campaign?
            </h3>

            <div className={styles.modalActions}>
              <button
                onClick={() => setConfirmModal(null)}
                className={styles.cancel}
              >
                Cancel
              </button>

              <button
                className={styles.confirm}
                onClick={() => {
                  setConfirmModal(null);
                }}
              >
                Yes, Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}