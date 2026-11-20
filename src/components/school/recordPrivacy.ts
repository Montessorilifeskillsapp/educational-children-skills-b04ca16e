import { useEffect } from 'react';
import { Capacitor, registerPlugin } from '@capacitor/core';

interface RecordPrivacyPlugin { enable(): Promise<void>; disable(): Promise<void> }
const RecordPrivacy = registerPlugin<RecordPrivacyPlugin>('RecordPrivacy');

/** Native apps (Android and iPhone) ship the RecordPrivacy plugin; web browsers can't block captures. */
const isNativeApp = () => Capacitor.isNativePlatform() && ['android', 'ios'].includes(Capacitor.getPlatform());

/** Typing fields stay fully usable; everything else in the portal can't be copied, dragged or long-pressed out. */
const editable = (t: EventTarget | null) =>
  t instanceof HTMLElement && !!t.closest('input, textarea, select, [contenteditable="true"]');

/**
 * While mounted: Android blocks screenshots/screen recording (OS-level); iPhone captures come out blank,
 * a warning shows after each screenshot and the app switcher preview is covered; the web blocks copy,
 * right-click and dragging outside form fields.
 */
export function useRecordPrivacy() {
  useEffect(() => {
    const root = document.documentElement;
    if (isNativeApp()) RecordPrivacy.enable().catch(() => {});
    const block = (e: Event) => { if (!editable(e.target)) e.preventDefault(); };
    const events = ['copy', 'cut', 'contextmenu', 'dragstart'] as const;
    events.forEach((ev) => document.addEventListener(ev, block));
    root.classList.add('record-privacy');
    return () => {
      if (isNativeApp()) RecordPrivacy.disable().catch(() => {});
      events.forEach((ev) => document.removeEventListener(ev, block));
      root.classList.remove('record-privacy');
    };
  }, []);
}
