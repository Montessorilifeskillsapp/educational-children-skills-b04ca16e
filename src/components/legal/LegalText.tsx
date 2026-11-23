import React from 'react';
import { openCookieSettings } from '@/components/consent/openCookieSettings';
import type { PolicyBlock } from '@/content/privacy/policy.en';

const LINK = 'text-primary hover:underline';

/** Renders legal documents' small inline markup: **bold**, *italic*, [text](link), `code` and [[cookies|text]]. */
export function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[\[cookies\|[^\]]+\]\]|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g);
  return <>{parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>;
    const cookie = part.match(/^\[\[cookies\|(.+)\]\]$/);
    if (cookie) return <button key={i} type="button" onClick={openCookieSettings} className="text-primary underline">{cookie[1]}</button>;
    const link = part.match(/^\[(.+)\]\((.+)\)$/);
    if (link) {
      const external = /^https?:/.test(link[2]);
      return <a key={i} href={link[2]} className={LINK} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>{link[1]}</a>;
    }
    if (part.startsWith('`') && part.endsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>;
    return <React.Fragment key={i}>{part}</React.Fragment>;
  })}</>;
}

export function Block({ block, lang }: { block: PolicyBlock; lang: string }) {
  if ('h3' in block) return <h3 className="text-lg font-medium mb-2">{block.h3}</h3>;
  if ('h4' in block) return <h4 className="text-base font-medium mb-2">{block.h4}</h4>;
  if ('ul' in block) return <ul className="list-disc pl-6 mb-4 space-y-1">{block.ul.map((item, i) => <li key={i}><Inline text={item} /></li>)}</ul>;
  if (block.hideIn?.includes(lang)) return null;
  return <p className="mb-4" lang={block.lang}><Inline text={block.p} /></p>;
}
