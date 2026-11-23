import React from 'react';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Check, Copy, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { analytics } from '@/lib/analytics';

// Event names (kept stable for downstream funnel/conversion reporting)
export const SHARE_EVENTS = {
  FACEBOOK_SHARE_CLICK: 'share_facebook_click',
  INSTAGRAM_COPY_CLICK: 'share_instagram_copy_click',
  INSTAGRAM_COPY_SUCCESS: 'share_instagram_copy_success',
  INSTAGRAM_COPY_FAILURE: 'share_instagram_copy_failure',
  NATIVE_SHARE_CLICK: 'share_native_click',
  NATIVE_SHARE_SUCCESS: 'share_native_success',
  NATIVE_SHARE_CANCELLED: 'share_native_cancelled',
  NATIVE_SHARE_FALLBACK_COPY: 'share_native_fallback_copy',
} as const;

interface ShareThisPageProps {
  className?: string;
  variant?: 'light' | 'dark';
  title?: string;
  text?: string;
}

const INSTAGRAM_URL = 'https://instagram.com/montessoristorybooks';

const ShareThisPage: React.FC<ShareThisPageProps> = ({
  className = '',
  variant = 'dark',
  title,
  text,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);
  const [nativeCopied, setNativeCopied] = React.useState(false);
  const [canNativeShare, setCanNativeShare] = React.useState(false);

  React.useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

  const getPagePath = () =>
    typeof window !== 'undefined' ? window.location.pathname : '';

  const handleFacebookShare = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    analytics.trackInteraction('click', SHARE_EVENTS.FACEBOOK_SHARE_CLICK, {
      network: 'facebook',
      shared_url: url,
      page_path: getPagePath(),
    });
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  const handleInstagramCopy = async () => {
    analytics.trackInteraction('click', SHARE_EVENTS.INSTAGRAM_COPY_CLICK, {
      network: 'instagram',
      handle: '@montessoristorybooks',
      page_path: getPagePath(),
    });
    try {
      await navigator.clipboard.writeText(INSTAGRAM_URL);
      setCopied(true);
      analytics.trackInteraction('copy', SHARE_EVENTS.INSTAGRAM_COPY_SUCCESS, {
        network: 'instagram',
        copied_url: INSTAGRAM_URL,
      });
      toast({
        title: t('pages.share.igToastTitle'),
        description: t('pages.share.igToastBody'),
      });
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      analytics.trackInteraction('copy', SHARE_EVENTS.INSTAGRAM_COPY_FAILURE, {
        network: 'instagram',
        error: err instanceof Error ? err.message : 'unknown',
      });
      toast({
        title: t('pages.share.copyFailed'),
        description: INSTAGRAM_URL,
        variant: 'destructive',
      });
    }
  };

  const fallbackCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setNativeCopied(true);
      analytics.trackInteraction('copy', SHARE_EVENTS.NATIVE_SHARE_FALLBACK_COPY, {
        copied_url: url,
        page_path: getPagePath(),
      });
      toast({
        title: t('pages.share.linkCopied'),
        description: t('pages.share.linkToastBody'),
      });
      setTimeout(() => setNativeCopied(false), 2500);
    } catch {
      toast({
        title: t('pages.share.linkFailed'),
        description: url,
        variant: 'destructive',
      });
    }
  };

  const handleNativeShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const shareTitle = title ?? document.title;
    const shareText =
      text ?? t('pages.share.defaultText');

    analytics.trackInteraction('click', SHARE_EVENTS.NATIVE_SHARE_CLICK, {
      shared_url: url,
      page_path: getPagePath(),
      method: canNativeShare ? 'web_share_api' : 'clipboard_fallback',
    });

    if (canNativeShare) {
      try {
        await navigator.share({ title: shareTitle, text: shareText, url });
        analytics.trackInteraction('share', SHARE_EVENTS.NATIVE_SHARE_SUCCESS, {
          shared_url: url,
          page_path: getPagePath(),
        });
      } catch (err) {
        // User cancelled or share failed — fall back to copy on real failure.
        const isAbort = err instanceof DOMException && err.name === 'AbortError';
        if (isAbort) {
          analytics.trackInteraction('cancel', SHARE_EVENTS.NATIVE_SHARE_CANCELLED, {
            page_path: getPagePath(),
          });
          return;
        }
        await fallbackCopyLink(url);
      }
    } else {
      await fallbackCopyLink(url);
    }
  };

  const isLight = variant === 'light';

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <p className={`text-sm font-medium ${isLight ? 'text-white/90' : 'text-muted-foreground'}`}>
        {t('pages.share.heading')}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          onClick={handleNativeShare}
          aria-label={canNativeShare ? t('pages.share.shareAria') : t('pages.share.copyAria')}
          className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5"
        >
          {nativeCopied ? (
            <Check className="w-4 h-4 mr-2" aria-hidden="true" />
          ) : (
            <Share2 className="w-4 h-4 mr-2" aria-hidden="true" />
          )}
          {nativeCopied ? t('pages.share.linkCopied') : canNativeShare ? t('pages.share.share') : t('pages.share.copyLink')}
        </Button>
        <Button
          onClick={handleFacebookShare}
          aria-label={t('pages.share.fbAria')}
          className="bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-full px-5"
        >
          <Facebook className="w-4 h-4 mr-2" aria-hidden="true" />
          {t('pages.share.fb')}
        </Button>
        <Button
          onClick={handleInstagramCopy}
          aria-label={t('pages.share.igAria')}
          className="bg-gradient-to-r from-[#E1306C] via-[#C13584] to-[#833AB4] hover:opacity-90 text-white rounded-full px-5"
        >
          {copied ? (
            <Check className="w-4 h-4 mr-2" aria-hidden="true" />
          ) : (
            <Instagram className="w-4 h-4 mr-2" aria-hidden="true" />
          )}
          {copied ? t('pages.share.igCopied') : t('pages.share.igCopy')}
          <Copy className="w-3.5 h-3.5 ml-2 opacity-70" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
};

export default ShareThisPage;
