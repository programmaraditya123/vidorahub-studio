"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Eye, Heart, MessageCircle, Pencil, RefreshCw, ThumbsDown, Upload } from "lucide-react";
import { useCreatorUploads } from "@/hooks/useCreatorUploads";
import { formatUploadDate, formatUploadDuration, updateVideoTitle, type CreatorUpload, type SaveUploadDetails, type UploadEditableField } from "@/lib/uploads";
import UploadDetailsModal from "./UploadDetailsModal/UploadDetailsModal";
import { editableUploadFields, uploadFields } from "./UploadDetailsModal/uploadFields";
import shared from "../profileShared.module.scss";
import styles from "./UploadsSection.module.scss";

const saveTitle: SaveUploadDetails = (id, details) => updateVideoTitle(id, details.title ?? "");

export default function UploadsSection() {
  const { data, loading, error, page, goToPage, refresh } = useCreatorUploads();
  const [editing, setEditing] = useState<{ upload: CreatorUpload; field: UploadEditableField } | null>(null);

  return <div className={shared.section}>
    <header className={`${shared.header} ${styles.header}`}>
      <div><h1>Uploads</h1><p>Manage your uploaded videos and vibes and update their details.</p></div>
      <button type="button" className={shared.btnSecondary} onClick={refresh} disabled={loading} aria-label="Refresh uploads"><RefreshCw size={16} /> Refresh</button>
    </header>
    <div className={styles.listHeader}><h2>Your content</h2>{data && <span className={shared.badge}>{data.total_count} uploads</span>}</div>
    <div aria-busy={loading}>
      {loading ? <div className={shared.empty} role="status">Loading your uploads…</div>
        : error ? <div className={styles.state}><p role="alert">{error}</p><button type="button" className={shared.btnSecondary} onClick={refresh}>Try again</button></div>
        : !data?.videos.length ? <div className={styles.state}><Upload size={32} /><h3>No uploads yet</h3><p>Your uploaded videos and vibes will appear here.</p></div>
        : <ul className={styles.list}>{data.videos.map(video => <li key={video._id} className={styles.card}>
          <div className={styles.thumbnail}>
            {/* Remote thumbnails come from the creator API, including external storage hosts. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {video.thumbnailUrl ? <img src={video.thumbnailUrl} alt="" loading="lazy" onError={event => { event.currentTarget.style.display = "none"; }} /> : null}
            <span className={styles.duration}>{formatUploadDuration(video.duration)}</span>
          </div>
          <div className={styles.details}>
            <div className={styles.meta}>
              <span className={`${styles.contentType} ${video.contentType === "vibe" ? styles.vibe : ""}`}>{video.contentType}</span>
              <span className={styles.category}>{video.category}</span>
              <span className={styles.durationLabel}><Clock size={14} /> Duration: {formatUploadDuration(video.duration)}</span>
              <time dateTime={video.createdAt}>{formatUploadDate(video.createdAt)}</time>
            </div>
            <h3>{video.title}</h3><p className={styles.description}>{video.description || "No description"}</p>
            <div className={styles.tags}>{video.tags.length ? video.tags.map((tag, index) => <span key={`${tag}-${index}`}>#{tag}</span>) : <small>No tags</small>}</div>
            <div className={styles.stats}><span><Eye size={14} /> {video.stats.views.toLocaleString()} views</span><span><Heart size={14} /> {video.stats.likes.toLocaleString()} likes</span><span><ThumbsDown size={14} /> {video.stats.dislikes.toLocaleString()} dislikes</span><span><MessageCircle size={14} /> {video.stats.comments.toLocaleString()} comments</span></div>
            <div className={styles.editActions} role="group" aria-label={`Edit ${video.title}`}>
              {editableUploadFields.map(field => <button key={field} type="button" className={styles.edit} onClick={() => setEditing({ upload: video, field })} aria-label={`Edit ${uploadFields[field].label.toLowerCase()} for ${video.title}`}><Pencil size={13} /> Edit {uploadFields[field].label.toLowerCase()}</button>)}
            </div>
          </div>
        </li>)}</ul>}
    </div>
    {data && data.total_pages > 0 && <nav className={styles.pagination} aria-label="Uploads pagination">
      <button type="button" className={shared.btnSecondary} disabled={loading || !data.has_previous || page <= 1} onClick={() => goToPage(page - 1)}><ChevronLeft size={16} /> Previous</button>
      <span aria-live="polite">Page {data.page} of {data.total_pages}</span>
      <button type="button" className={shared.btnSecondary} disabled={loading || !data.has_next || page >= data.total_pages} onClick={() => goToPage(page + 1)}>Next <ChevronRight size={16} /></button>
    </nav>}
    {editing && <UploadDetailsModal key={`${editing.upload._id}-${editing.field}`} upload={editing.upload} field={editing.field} saveDetails={editing.field === "title" ? saveTitle : undefined} close={() => setEditing(null)} onSaved={() => { setEditing(null); refresh(); }} />}
  </div>;
}
