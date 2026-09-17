import React from 'react';

/**
 * Required disclosure for every page that carries supplier purchase links.
 * Kept in one place so the wording stays identical everywhere it appears.
 */
export const AFFILIATE_DISCLOSURE_TEXT =
  'We may earn a commission if you purchase through links on this page, at no additional cost to you.';

interface AffiliateDisclosureProps {
  className?: string;
}

/**
 * Quiet, unobtrusive footnote styling — present and honest, but never
 * competing with the content around it.
 */
export function AffiliateDisclosure({ className = '' }: AffiliateDisclosureProps) {
  return (
    <p
      className={`mt-3 text-[11px] italic text-muted-foreground/70 leading-relaxed ${className}`.trim()}
    >
      {AFFILIATE_DISCLOSURE_TEXT}
    </p>
  );
}

export default AffiliateDisclosure;
