import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

/**
 * Persistent one-tap Home button.
 * Always visible on section/activity screens so a user can never get locked in.
 */
const HIDDEN_PREFIXES = ['/auth', '/admin'];

const HomeFab: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isRoot = location.pathname === '/' || location.pathname === '/index' || location.pathname === '/home';
  const onLandingHome = isRoot && !location.search.includes('view=');
  const hidden = onLandingHome || HIDDEN_PREFIXES.some((p) => location.pathname.startsWith(p));

  if (hidden) return null;

  return (
    <button
      type="button"
      aria-label="Go to home screen"
      onClick={() => navigate('/')}
      className="fixed left-4 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-primary-foreground shadow-lg transition-transform active:scale-95 hover:opacity-90"
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
    >
      <Home className="h-5 w-5" />
      <span className="text-sm font-semibold">Home</span>
    </button>
  );
};

export default HomeFab;
