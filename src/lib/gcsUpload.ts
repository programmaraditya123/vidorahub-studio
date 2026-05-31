import { http } from "./http";

/** Store product images → GCS path: thumbnails/{contentCategory}s/... */
export const PRODUCT_IMAGE_UPLOAD = {
  type: "thumbnail" as const,
  contentCategory: "vibe" as const,
};

export type GetUploadUrlResponse = {
  ok: boolean;
  uploadUrl?: string;
  publicUrl?: string;
  filePath?: string;
  message?: string;
};

export type SignedUploadParams = {
  fileName: string;
  contentType: string;
  type: "thumbnail" | "video";
  contentCategory: "video" | "vibe";
};

export async function getSignedUploadUrl(
  params: SignedUploadParams,
): Promise<GetUploadUrlResponse> {
  const { data } = await http.post<GetUploadUrlResponse>(
    "/api/v1/get-upload-url",
    params,
  );

  if (!data.ok || !data.uploadUrl || !data.publicUrl) {
    throw new Error(data.message || "Failed to get upload URL");
  }

  return data;
}

/** PUT file bytes to the GCS v4 signed URL (must use fetch — full external URL). */
export async function putFileToSignedUrl(
  uploadUrl: string,
  file: File,
  contentType: string,
): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": contentType },
    body: file,
  });

  if (!res.ok) {
    throw new Error(`Image upload failed (${res.status})`);
  }
}

export async function uploadViaSignedUrl(
  file: File,
  options: Pick<SignedUploadParams, "type" | "contentCategory">,
): Promise<string> {
  const contentType = file.type || "image/jpeg";
  const fileName = file.name || `image-${Date.now()}.jpg`;

  const { uploadUrl, publicUrl } = await getSignedUploadUrl({
    fileName,
    contentType,
    type: options.type,
    contentCategory: options.contentCategory,
  });

  await putFileToSignedUrl(uploadUrl!, file, contentType);

  return publicUrl!;
}
