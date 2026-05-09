import React from 'react';
import { Facebook, Instagram, Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { analytics } from '@/lib/analytics';

// Event names (kept stable for downstream funnel/conversion reporting)
export const SHARE_EVENTS = {
  FACEBOOK_SHARE_CLICK: 'share_facebook_click',
  INSTAGRAM_COPY_CLICK: 'share_instagram_copy_click',
  INSTAGRAM_COPY_SUCCESS: 'share_instagram_copy_success',
  INSTAGRAM_COPY_FAILURE: 'share_instagram_copy_failure',
} as const;

interface ShareThisPageProps {
  className?: string;
  variant?: 'light' | 'dark';
}

const INSTAGRAM_URL = 'https://instagram.com/montessoristorybooks';

const ShareThisPage: React.FC<ShareThisPageProps> = ({ className = '', variant = 'dark' }) => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const handleFacebookShare = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  const handleInstagramCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTAGRAM_URL);
      setCopied(true);
      toast({
        title: 'Instagram link copied!',
        description: 'Paste it anywhere to share @montessoristorybooks.',
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast({
        title: 'Could not copy',
        description: INSTAGRAM_URL,
        variant: 'destructive',
      });
    }
  };

  const isLight = variant === 'light';

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <p className={`text-sm font-medium ${isLight ? 'text-white/90' : 'text-slate-600'}`}>
        Share this page
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          onClick={handleFacebookShare}
          aria-label="Share this page on Facebook"
          className="bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-full px-5"
        >
          <Facebook className="w-4 h-4 mr-2" aria-hidden="true" />
          Share on Facebook
        </Button>
        <Button
          onClick={handleInstagramCopy}
          aria-label="Copy Instagram link for @montessoristorybooks"
          className="bg-gradient-to-r from-[#E1306C] via-[#C13584] to-[#833AB4] hover:opacity-90 text-white rounded-full px-5"
        >
          {copied ? (
            <Check className="w-4 h-4 mr-2" aria-hidden="true" />
          ) : (
            <Instagram className="w-4 h-4 mr-2" aria-hidden="true" />
          )}
          {copied ? 'Copied!' : 'Copy Instagram link'}
          <Copy className="w-3.5 h-3.5 ml-2 opacity-70" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
};

export default ShareThisPage;
