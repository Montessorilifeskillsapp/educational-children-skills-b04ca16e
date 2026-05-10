import React from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';

interface SocialLinksProps {
  variant?: 'light' | 'dark';
  className?: string;
}

const socials = [
  {
    name: 'Instagram',
    handle: '@montessoristorybooks',
    href: 'https://instagram.com/montessoristorybooks',
    Icon: Instagram,
  },
  {
    name: 'Facebook',
    handle: 'Montessoristorybooks',
    href: 'https://facebook.com/Montessoristorybooks',
    Icon: Facebook,
  },
  {
    name: 'YouTube',
    handle: '@montessoristorybooks',
    href: 'https://youtube.com/@montessoristorybooks',
    Icon: Youtube,
  },
];

const SocialLinks: React.FC<SocialLinksProps> = ({ variant = 'dark', className = '' }) => {
  const base =
    variant === 'light'
      ? 'bg-white/20 text-white hover:bg-white/30 border-white/30'
      : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200 hover:text-primary';

  return (
    <nav aria-label="Social media links" className={`flex items-center justify-center gap-3 ${className}`}>
      {socials.map(({ name, handle, href, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow us on ${name} (${handle})`}
          title={`${name}: ${handle}`}
          className={`inline-flex items-center justify-center w-11 h-11 rounded-full border shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary0 ${base}`}
        >
          <Icon className="w-5 h-5" aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
};

export default SocialLinks;
