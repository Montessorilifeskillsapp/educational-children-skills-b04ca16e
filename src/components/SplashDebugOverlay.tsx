import React, { useEffect, useState } from 'react';

interface MatchedLink {
  href: string;
  media: string;
}

const SplashDebugOverlay: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [matched, setMatched] = useState<MatchedLink[]>([]);
  const [all, setAll] = useState<MatchedLink[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('debug') !== 'splash') return;
    setEnabled(true);

    const links = Array.from(
      document.querySelectorAll<HTMLLinkElement>('link[rel="apple-touch-startup-image"]')
    ).map((l) => ({ href: l.href, media: l.media || '(no media)' }));

    setAll(links);
    setMatched(links.filter((l) => !l.media || l.media === '(no media)' || window.matchMedia(l.media).matches));
  }, []);

  if (!enabled) return null;

  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 0;
  const w = typeof window !== 'undefined' ? window.screen.width : 0;
  const h = typeof window !== 'undefined' ? window.screen.height : 0;
  const standalone =
    typeof window !== 'undefined' &&
    // @ts-expect-error iOS-only
    (window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2147483647,
        background: 'rgba(0,0,0,0.85)',
        color: '#fff',
        font: '12px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace',
        padding: '16px',
        overflow: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <strong style={{ fontSize: 14 }}>Splash debug</strong>
        <button
          onClick={() => setEnabled(false)}
          style={{
            background: '#10B981',
            color: '#fff',
            border: 0,
            padding: '4px 10px',
            borderRadius: 6,
            fontWeight: 600,
          }}
        >
          Close
        </button>
      </div>

      <div style={{ marginBottom: 12 }}>
        <div>device-width × device-height: <b>{w} × {h}</b></div>
        <div>device-pixel-ratio: <b>{dpr}</b></div>
        <div>native pixels: <b>{Math.round(w * dpr)} × {Math.round(h * dpr)}</b></div>
        <div>standalone (added to home screen): <b>{String(standalone)}</b></div>
        <div>orientation: <b>{w > h ? 'landscape' : 'portrait'}</b></div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <strong style={{ color: '#10B981' }}>Matched startup image{matched.length === 1 ? '' : 's'} ({matched.length}):</strong>
      </div>
      {matched.length === 0 ? (
        <div style={{ color: '#f87171' }}>⚠ No startup image matched — iOS will use no splash.</div>
      ) : (
        matched.map((m) => (
          <div key={m.href} style={{ marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #333' }}>
            <div style={{ wordBreak: 'break-all' }}>{m.href.replace(window.location.origin, '')}</div>
            <div style={{ color: '#9ca3af', fontSize: 11, marginTop: 2 }}>{m.media}</div>
            <img
              src={m.href}
              alt="matched splash"
              style={{ marginTop: 6, maxWidth: 120, border: '1px solid #444' }}
            />
          </div>
        ))
      )}

      <details style={{ marginTop: 16 }}>
        <summary style={{ cursor: 'pointer', color: '#9ca3af' }}>All {all.length} declared startup images</summary>
        <div style={{ marginTop: 8 }}>
          {all.map((l) => (
            <div key={l.href} style={{ marginBottom: 6 }}>
              <div style={{ wordBreak: 'break-all' }}>{l.href.replace(window.location.origin, '')}</div>
              <div style={{ color: '#6b7280', fontSize: 11 }}>{l.media}</div>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
};

export default SplashDebugOverlay;
