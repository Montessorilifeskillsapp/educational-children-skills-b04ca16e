export const PREVIEW_SECONDS = 10;

/** Free sample window: 10 seconds taken from the middle of the song. */
export function previewWindow(duration: number): { start: number; end: number } {
  if (!Number.isFinite(duration) || duration <= PREVIEW_SECONDS) {
    return { start: 0, end: Number.isFinite(duration) && duration > 0 ? duration : PREVIEW_SECONDS };
  }
  const start = Math.max(0, duration / 2 - PREVIEW_SECONDS / 2);
  return { start, end: start + PREVIEW_SECONDS };
}
