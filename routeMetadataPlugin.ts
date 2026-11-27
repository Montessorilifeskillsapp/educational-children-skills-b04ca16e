import type { Plugin } from 'vite';
import { pageHead, publicPageMetadata } from './src/lib/pageMetadata';

/** Real HTML entry files let static hosting serve each public page's own head. */
export const routeMetadataPlugin = (): Plugin => ({
  name: 'public-page-heads',
  enforce: 'post',
  transformIndexHtml: {
    order: 'post',
    handler(html, context) {
      return context.server ? pageHead(html, context.originalUrl?.split('?')[0] ?? context.path) : html;
    },
  },
  generateBundle: {
    order: 'post',
    handler(_options, bundle) {
      const index = bundle['index.html'];
      if (!index || index.type !== 'asset') throw new Error('Missing built index.html for public page metadata');
      const html = typeof index.source === 'string' ? index.source : new TextDecoder().decode(index.source);
      for (const pathname of Object.keys(publicPageMetadata)) {
        this.emitFile({ type: 'asset', fileName: `${pathname.slice(1)}/index.html`, source: pageHead(html, pathname) });
      }
    },
  },
});