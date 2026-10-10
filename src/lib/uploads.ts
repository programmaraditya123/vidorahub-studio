import { http3 } from "./http3";

export type CreatorUpload = {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnailUrl: string;
  duration: number;
  contentType: string;
  category: string;
  stats: { views: number; likes: number; dislikes: number; comments: number };
  createdAt: string;
};

export type CreatorUploadsResponse = {
  success: boolean;
  total_count: number;
  page: number;
  limit: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
  videos: CreatorUpload[];
};

export type UploadDetails = Pick<CreatorUpload, "title" | "description" | "tags">;
export type UploadEditableField = keyof UploadDetails;
export type SaveUploadDetails = (id: string, details: Partial<UploadDetails>) => Promise<string | void>;
export const UPLOADS_PAGE_SIZE = 10;

export async function getCreatorUploads(page: number, signal?: AbortSignal) {
  const { data } = await http3.get<CreatorUploadsResponse>("/api/creator/videos", {
    params: { page, limit: UPLOADS_PAGE_SIZE }, signal,
  });
  if (!data.success || !Array.isArray(data.videos)) {
    throw new Error("Could not load your uploads. Please try again.");
  }
  return data;
}

export async function updateVideoTitle(videoId: string, title: string): Promise<string> {
  const updatedTitle = title.trim();
  if (!updatedTitle) throw new Error("Enter a title.");

  const { data } = await http3.post<unknown>("/api/creator/updateVideoTitle", {
    video_id: videoId,
    title: updatedTitle,
  });
  const body = data && typeof data === "object" ? data as Record<string, unknown> : undefined;
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  if (data == null || data === false || body?.success === false || body?.ok === false) {
    throw new Error(message || "Could not update the title. Please try again.");
  }
  return message || "Title updated successfully.";
}

export async function updateVideoDescription(videoId: string, description: string): Promise<string> {
  const { data } = await http3.post<unknown>("/api/creator/updateVideoDescription", {
    video_id: videoId,
    description,
  });
  const body = data && typeof data === "object" ? data as Record<string, unknown> : undefined;
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  if (data == null || data === false || body?.success === false || body?.ok === false) {
    throw new Error(message || "Could not update the description. Please try again.");
  }
  return message || "Description updated successfully.";
}

export async function updateVideoTags(videoId: string, tags: string[]): Promise<string> {
  const { data } = await http3.post<unknown>("/api/creator/updateTags", {
    video_id: videoId,
    tag: tags,
  });
  const body = data && typeof data === "object" ? data as Record<string, unknown> : undefined;
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  if (data == null || data === false || body?.success === false || body?.ok === false) {
    throw new Error(message || "Could not update the tags. Please try again.");
  }
  return message || "Tags updated successfully.";
}

export function uploadErrorMessage(error: unknown) {
  if (error && typeof error === "object" && "message" in error && typeof error.message === "string") {
    return error.message;
  }
  return "Could not complete the request. Please try again.";
}

export function formatUploadDuration(seconds: number) {
  const duration = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const remainder = String(duration % 60).padStart(2, "0");
  return hours ? `${hours}:${String(minutes).padStart(2, "0")}:${remainder}` : `${minutes}:${remainder}`;
}

export function formatUploadDate(value: string) {
  // The API's timezone-less timestamps are UTC.
  const date = new Date(/(?:Z|[+-]\d{2}:?\d{2})$/i.test(value) ? value : `${value}Z`);
  return Number.isNaN(date.getTime()) ? "Date unavailable" : date.toLocaleDateString(undefined, {
    year: "numeric", month: "short", day: "numeric",
  });
}
