import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Copy, Check, Sparkles, Gift } from 'lucide-react';
import { toast } from 'sonner';

interface ShareWinCardProps {
  skillTitle: string;
  categoryName: string;
}

const SITE_URL = 'https://montessorilifeskillsapp.com';

const ShareWinCard: React.FC<ShareWinCardProps> = ({ skillTitle, categoryName }) => {
  const [copied, setCopied] = useState(false);

  const shareText = `We just finished "${skillTitle}" — a real Montessori ${categoryName} activity from an AMI-trained guide. 🌿`;
  const shareUrl = `${SITE_URL}/?ref=share`;

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && (navigator as any).share) {
      try {
        await (navigator as any).share({
          title: 'Montessori Life Skills',
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // user cancelled — fall through to copy
      }
    }
    handleCopy();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      toast.success('Copied — paste it anywhere!');
      setTimeout(() => setCopied(false), 2200);
    } catch {
      toast.error('Could not copy. Long-press to copy manually.');
    }
  };

  return (
    <div className="mt-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-accent/5 p-5 text-left">
      <div className="flex items-start gap-3 mb-4">
        <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <p className="font-semibold text-foreground">Share the win</p>
          <p className="text-sm text-muted-foreground">
            Send a friend a free month — and get one yourself when they join.
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-background/70 border border-border p-3 mb-4 text-sm text-foreground/90 italic">
        "{shareText}"
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          onClick={handleShare}
          className="flex-1 bg-gradient-to-r from-primary to-accent text-primary-foreground"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button onClick={handleCopy} variant="outline" className="flex-1">
          {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
          {copied ? 'Copied' : 'Copy link'}
        </Button>
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Gift className="w-3.5 h-3.5" />
        Referral rewards apply on their first paid month.
      </p>
    </div>
  );
};

export default ShareWinCard;
