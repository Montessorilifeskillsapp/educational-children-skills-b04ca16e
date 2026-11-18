import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useProfile } from '@/contexts/ProfileContext';
import { useAuthContext } from './AuthProvider';

/** Shows the plan's child limit and routes families to the appropriate plan or support. */
const ChildCoveragePanel: React.FC<{ highlight?: boolean }> = ({ highlight }) => {
  const { user } = useAuthContext();
  const { isPremium, isFamily, childAllowance } = useSubscription();
  const { profiles } = useProfile();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const covered = profiles.filter((p) => p.covered !== false);
  const uncovered = useMemo(() => profiles.filter((p) => p.covered === false), [profiles]);

  if (!user) return null;

  return (
    <Card className={highlight ? 'border-primary ring-2 ring-primary/40' : ''}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          <Users className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold">{t('family.cov.count', { n: Math.min(covered.length, childAllowance), total: childAllowance })}</p>
            <p className="text-sm text-muted-foreground">
              {isFamily
                ? t('family.cov.family')
                : isPremium ? t('family.cov.premium') : t('family.cov.explorer')}
            </p>
            {highlight && (
              <p className="text-sm mt-1 font-medium">{isFamily ? t('family.cov.atLimit') : t('family.cov.choose')}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {!isFamily && <Button size="sm" onClick={() => navigate('/plans')}>{t('family.cov.see')}</Button>}
          {isFamily && childAllowance >= 4 && profiles.length >= 4 && (
            <Button size="sm" variant="outline" asChild><a href="mailto:montessorilifeskills@gmail.com?subject=More%20than%20four%20child%20profiles">{t('family.cov.support')}</a></Button>
          )}
        </div>

        {uncovered.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {t('family.cov.uncovered', { names: uncovered.map((p) => p.name).join(', ') })}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ChildCoveragePanel;
