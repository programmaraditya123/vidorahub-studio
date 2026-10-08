import type { UploadEditableField } from "@/lib/uploads";

export const uploadFields: Record<UploadEditableField, {
  label: string;
  multiline?: boolean;
  hint?: string;
  required?: boolean;
}> = {
  title: { label: "Title", required: true },
  description: { label: "Description", multiline: true },
  tags: { label: "Tags", multiline: true, hint: "Enter one tag per line." },
};

export const editableUploadFields = Object.keys(uploadFields) as UploadEditableField[];
