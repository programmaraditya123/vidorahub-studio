"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main style={{ padding: 32, fontFamily: "Arial, sans-serif" }}>
          <h1>Something went wrong</h1>
          <p>{error.message || "VidoraHub Studio could not load this page."}</p>
          <button type="button" onClick={reset}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
