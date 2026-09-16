"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { uploadProfileImage } from "@/lib/CreatorInfo";
import { creatorApi } from "@/store/api/creatorApi";
import { useToast } from "./ToastProvider";

export function useProfileImageUpload(originalUrl?: string) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const uploading = useRef(false);
  const mounted = useRef(true);
  const dispatch = useDispatch();
  const { showToast } = useToast();

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview);
  }, [preview]);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file || uploading.current) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select an image file.", "error");
      return;
    }

    uploading.current = true;
    setIsUploading(true);
    let imageUrl: string | undefined;

    try {
      imageUrl = URL.createObjectURL(file);
      const result = await uploadProfileImage(file);
      if (result?.success === false || result?.ok === false) {
        throw new Error(
          typeof result.message === "string" && result.message.trim()
            ? result.message
            : "Could not upload your profile picture. Please try again.",
        );
      }

      if (mounted.current) {
        setPreview(imageUrl);
        imageUrl = undefined;
      }
      dispatch(creatorApi.util.invalidateTags(["Creator"]));
      showToast("Profile picture updated successfully.", "success");
    } catch (error: unknown) {
      const message = error && typeof error === "object" && "message" in error
        && typeof error.message === "string" ? error.message.trim() : "";
      showToast(message || "Could not upload your profile picture. Please try again.", "error");
    } finally {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
      uploading.current = false;
      if (mounted.current) setIsUploading(false);
    }
  };

  return { imageUrl: preview || originalUrl, isUploading, handleImageChange };
}
