export const SITE_ORIGIN = 'https://montessorilifeskillsapp.com';
export const PRICING_TITLE = 'Montessori Curriculum Pricing | Plans from Free to $349/yr';

export const publicPageMetadata: Record<string, { title: string; description: string }> = {
  '/pricing': { title: PRICING_TITLE, description: 'Compare Free, Premium and Family Montessori curriculum plans. Premium is $29.99/month or $199/year; Family covers up to four children for $349/year.' },
  '/plans': { title: PRICING_TITLE, description: 'Compare Free, Premium and Family Montessori curriculum plans. Premium is $29.99/month or $199/year; Family covers up to four children for $349/year.' },
  '/about': { title: 'About Montessori Life Skills | Our Montessori Approach', description: 'Meet AMI-trained guide Kerry Howard and discover the Montessori approach behind our adult-guided, hands-on curriculum.' },
  '/welcome': { title: 'Montessori at Home | Montessori Life Skills', description: 'Prepare materials, follow precise presentations, and guide children through hands-on Montessori activities off-screen.' },
  ...Object.fromEntries([
    ['practical-life', 'Practical Life'], ['sensorial', 'Sensorial'], ['language', 'Language'],
    ['math', 'Mathematics'], ['geography', 'Geography'], ['botany', 'Botany'],
    ['art', 'Art'], ['cultural', 'Cultural Studies'], ['grace-courtesy', 'Grace and Courtesy'],
  ].map(([path, name]) => [`/${path}`, {
    title: `${name} Montessori Activities | Montessori Life Skills`,
    description: `Explore ${name} Montessori activities with materials, preparation, presentation steps, and observation guidance for adults working with children off-screen.`,
  }])),
};

export function canonicalUrl(path: string): string {
  return `${SITE_ORIGIN}${new URL(path, SITE_ORIGIN).pathname.replace(/\/$/, '') || '/'}`;
}

const escapeAttribute = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Transform the built HTML, not just the post-JavaScript document. */
export function pageHead(html: string, pathname: string): string {
  const metadata = publicPageMetadata[pathname];
  if (!metadata) return html;
  const url = canonicalUrl(pathname);
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttribute(metadata.title)}</title>`)
    .replace(/(<link\b[^>]*rel="canonical"[^>]*href=")[^"]*(")/, `$1${url}$2`)
    .replace(/<meta\b[^>]*>/g, (tag) => {
      const key = tag.match(/(?:name|property)="([^"]+)"/)?.[1];
      const content = key && ({
        description: metadata.description, 'og:description': metadata.description, 'twitter:description': metadata.description,
        'og:title': metadata.title, 'twitter:title': metadata.title, 'og:url': url, 'twitter:url': url,
      } as Record<string, string>)[key];
      return content ? tag.replace(/content="[^"]*"/, `content="${escapeAttribute(content)}"`) : tag;
    });
}