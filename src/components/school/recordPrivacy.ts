import { useEffect, useState } from 'react';
import { Capacitor, registerPlugin } from '@capacitor/core';

interface RecordPrivacyPlugin { enable(): Promise<void>; disable(): Promise<void> }
const RecordPrivacy = registerPlugin<RecordPrivacyPlugin>('RecordPrivacy');

const isAndroid = () => Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android';

/** Typing fields stay fully usable; everything else in the portal can't be copied, dragged or long-pressed out. */
const editable = (t: EventTarget | null) =>
  t instanceof HTMLElement && !!t.closest('input, textarea, select, [contenteditable="true"]');

const BLUR_KEY = 'school-focus-blur';
export const readFocusBlur = () => { try { return localStorage.getItem(BLUR_KEY) !== 'off'; } catch { return true; } };

/** One static tiled image of "name · date"; drawn by the browser once, no ongoing work. */
export function watermarkUrl(text: string) {
  const esc = text.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><text x="10" y="100" transform="rotate(-24 160 90)" font-family="sans-serif" font-size="13" fill="rgb(51,33,21)" fill-opacity="0.07">${esc}</text></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/**
 * While mounted: Android blocks screenshots/screen recording (OS-level); the web blocks copy,
 * right-click and dragging outside form fields, watermarks records with the staff member's name
 * and date, and (optionally) blurs records while the window isn't active.
 */
export function useRecordPrivacy(label: string | null) {
  const [blurOn, setBlurOn] = useState(readFocusBlur);
  const root = document.documentElement;

  useEffect(() => {
    if (isAndroid()) RecordPrivacy.enable().catch(() => {});
    const block = (e: Event) => { if (!editable(e.target)) e.preventDefault(); };
    const events = ['copy', 'cut', 'contextmenu', 'dragstart'] as const;
    events.forEach((ev) => document.addEventListener(ev, block));
    root.classList.add('record-privacy');
    return () => {
      if (isAndroid()) RecordPrivacy.disable().catch(() => {});
      events.forEach((ev) => document.removeEventListener(ev, block));
      root.classList.remove('record-privacy', 'record-obscured');
    };
  }, []);

  useEffect(() => {
    if (!label) return;
    const day = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    root.style.setProperty('--record-watermark', watermarkUrl(`${label} · ${day}`));
    return () => { root.style.removeProperty('--record-watermark'); };
  }, [label]);

  useEffect(() => {
    if (!blurOn) { root.classList.remove('record-obscured'); return; }
    const hide = () => root.classList.add('record-obscured');
    const show = () => { if (!document.hidden) root.classList.remove('record-obscured'); };
    const vis = () => (document.hidden ? hide() : show());
    window.addEventListener('blur', hide);
    window.addEventListener('focus', show);
    document.addEventListener('visibilitychange', vis);
    return () => {
      window.removeEventListener('blur', hide);
      window.removeEventListener('focus', show);
      document.removeEventListener('visibilitychange', vis);
      root.classList.remove('record-obscured');
    };
  }, [blurOn]);

  const toggleBlur = () => setBlurOn((v) => { try { localStorage.setItem(BLUR_KEY, v ? 'off' : 'on'); } catch { /* ignore */ } return !v; });
  return { blurOn, toggleBlur };
}
