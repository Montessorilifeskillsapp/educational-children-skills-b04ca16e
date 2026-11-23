import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Crown, Shield } from 'lucide-react';
import { analytics } from '@/lib/analytics';
import { Trans, useTranslation } from 'react-i18next';
import { useLocalizedImage } from '@/lib/localizedMedia';

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

/** Translation keys for the Premium benefits list; render with t(key). */
export const PREMIUM_BENEFIT_KEYS = ['pricing.upgrade.benefit1', 'pricing.upgrade.benefit2', 'pricing.upgrade.benefit3'] as const;

const UpgradeDialog: React.FC<UpgradeDialogProps> = ({
  open, onOpenChange, source, title, description, image, imageAlt, meta, dismissLabel,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const shownImage = useLocalizedImage(image);

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
          <img decoding="async" src={shownImage} alt={imageAlt ?? ''} className="w-full h-44 object-cover" />
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
            {PREMIUM_BENEFIT_KEYS.map(key => (
              <li key={key} className="flex gap-2 text-sm text-foreground">
                <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />{t(key)}
              </li>
            ))}
          </ul>
          <div className="rounded-xl bg-primary/10 p-3 text-sm text-foreground">
            <Trans i18nKey="pricing.upgrade.price" components={[<span key="price" className="font-semibold" />]} />
          </div>
          <div className="space-y-2">
            <Button onClick={goToPlans} size="lg" className="w-full rounded-xl">{t('pricing.upgrade.seePlans')}</Button>
            <Button onClick={() => onOpenChange(false)} variant="ghost" className="w-full">{dismissLabel ?? t('pricing.upgrade.notNow')}</Button>
          </div>
          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5" aria-hidden="true" /> {t('pricing.upgrade.guarantee')}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeDialog;
