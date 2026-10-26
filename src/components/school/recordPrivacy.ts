import { useEffect } from 'react';
import { Capacitor, registerPlugin } from '@capacitor/core';

interface RecordPrivacyPlugin { enable(): Promise<void>; disable(): Promise<void> }
const RecordPrivacy = registerPlugin<RecordPrivacyPlugin>('RecordPrivacy');

const isAndroid = () => Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android';

/** Typing fields stay fully usable; everything else in the portal can't be copied, dragged or long-pressed out. */
const editable = (t: EventTarget | null) =>
  t instanceof HTMLElement && !!t.closest('input, textarea, select, [contenteditable="true"]');

/**
 * While mounted: Android blocks screenshots/screen recording (OS-level), and the web
 * blocks copy, right-click and dragging of student records outside of form fields.
 */
export function useRecordPrivacy() {
  useEffect(() => {
    if (isAndroid()) RecordPrivacy.enable().catch(() => {});
    const block = (e: Event) => { if (!editable(e.target)) e.preventDefault(); };
    const events = ['copy', 'cut', 'contextmenu', 'dragstart'] as const;
    events.forEach((ev) => document.addEventListener(ev, block));
    document.documentElement.classList.add('record-privacy');
    return () => {
      if (isAndroid()) RecordPrivacy.disable().catch(() => {});
      events.forEach((ev) => document.removeEventListener(ev, block));
      document.documentElement.classList.remove('record-privacy');
    };
  }, []);
}
