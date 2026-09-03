import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';

const SECTION_LINKS: { label: string; path: string }[] = [
  { label: 'Practical Life', path: '/practical-life' },
  { label: 'Sensorial', path: '/sensorial' },
  { label: 'Math', path: '/math' },
  { label: 'Language', path: '/language' },
  { label: 'Botany', path: '/botany' },
  { label: 'Geography', path: '/geography' },
  { label: 'Science', path: '/cultural' },
  { label: 'Art', path: '/art' },
  { label: 'Grace & Courtesy', path: '/grace-courtesy' },
];

/**
 * Compact section switcher rendered at the top of curriculum area pages,
 * so users can jump directly between sections (like the homepage nav)
 * without going back home first.
 */
const SectionNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav
      aria-label="Curriculum sections"
      className="mb-6 -mx-1 overflow-x-auto"
    >
      <div className="flex items-center gap-1 px-1 pb-1 w-max mx-auto">
        <Link
          to="/"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors whitespace-nowrap"
        >
          <Home className="w-4 h-4" />
          Home
        </Link>
        {SECTION_LINKS.map((link) => {
          const active = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              aria-current={active ? 'page' : undefined}
              className={`px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default SectionNav;
