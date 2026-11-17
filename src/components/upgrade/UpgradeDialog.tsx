import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Crown, Shield } from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Where the prompt was shown, for conversion analytics. */
  source: 'locked-card' | 'activity-complete' | 'onboarding';
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  meta?: string;
  dismissLabel?: string;
}

export const PREMIUM_BENEFITS = [
  'Every presentation in all curriculum areas, in AMI sequence',
  'Step-by-step written presentations and lesson videos',
  'Homeschool Standards guide and printable portfolio',
];

const UpgradeDialog: React.FC<UpgradeDialogProps> = ({
  open, onOpenChange, source, title, description, image, imageAlt, meta, dismissLabel = 'Not now',
}) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (open) analytics.track('upgrade_prompt_view', { source });
  }, [open, source]);

  const goToPlans = () => {
    analytics.track('upgrade_prompt_click', { source });
    onOpenChange(false);
    navigate('/plans');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        {image && (
          <img decoding="async" src={image} alt={imageAlt ?? ''} className="w-full h-44 object-cover" />
        )}
        <div className="p-6 space-y-4">
          <DialogHeader className="text-left space-y-2">
            {meta && (
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <Crown className="h-3.5 w-3.5" aria-hidden="true" /> {meta}
              </p>
            )}
            <DialogTitle className="text-2xl leading-tight">{title}</DialogTitle>
            <DialogDescription className="text-base">{description}</DialogDescription>
          </DialogHeader>
          <ul className="space-y-2">
            {PREMIUM_BENEFITS.map(item => (
              <li key={item} className="flex gap-2 text-sm text-foreground">
                <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />{item}
              </li>
            ))}
          </ul>
          <div className="rounded-xl bg-primary/10 p-3 text-sm text-foreground">
            <span className="font-semibold">$199/year</span> (about $16.58/month) or $29.99/month.
            Less than a month of typical Montessori preschool tuition.
          </div>
          <div className="space-y-2">
            <Button onClick={goToPlans} size="lg" className="w-full rounded-xl">See Premium plans</Button>
            <Button onClick={() => onOpenChange(false)} variant="ghost" className="w-full">{dismissLabel}</Button>
          </div>
          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5" aria-hidden="true" /> 30-day money-back guarantee · Cancel anytime
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeDialog;
