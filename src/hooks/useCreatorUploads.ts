"use client";

import { useCallback, useEffect, useState } from "react";
import { getCreatorUploads, uploadErrorMessage, type CreatorUploadsResponse } from "@/lib/uploads";

export function useCreatorUploads() {
  const [page, setPage] = useState(1);
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<{
    data: CreatorUploadsResponse | null; loading: boolean; error: string;
  }>({ data: null, loading: true, error: "" });

  useEffect(() => {
    const controller = new AbortController();
    getCreatorUploads(page, controller.signal).then(data => {
      if (controller.signal.aborted) return;
      if (data.total_pages > 0 && page > data.total_pages) {
        setPage(data.total_pages);
        return;
      }
      setState({ data, loading: false, error: "" });
    }).catch(error => {
      if (!controller.signal.aborted) setState({ data: null, loading: false, error: uploadErrorMessage(error) });
    });
    return () => controller.abort();
  }, [page, attempt]);

  const goToPage = useCallback((nextPage: number) => {
    setState({ data: null, loading: true, error: "" });
    setPage(nextPage);
  }, []);
  const refresh = useCallback(() => {
    setState({ data: null, loading: true, error: "" });
    setAttempt(value => value + 1);
  }, []);

  return { ...state, page, goToPage, refresh };
}
