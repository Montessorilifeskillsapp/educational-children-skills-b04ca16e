import React, { useMemo } from 'react';
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
  const covered = profiles.filter((p) => p.covered !== false);
  const uncovered = useMemo(() => profiles.filter((p) => p.covered === false), [profiles]);

  if (!user) return null;

  return (
    <Card className={highlight ? 'border-primary ring-2 ring-primary/40' : ''}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          <Users className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold">Children covered: {Math.min(covered.length, childAllowance)} of {childAllowance}</p>
            <p className="text-sm text-muted-foreground">
              {isFamily
                ? 'Family includes up to four children.'
                : isPremium ? 'Premium includes one child. Family includes up to four children.' : 'Explorer includes one child. Choose Family for up to four children.'}
            </p>
            {highlight && (
              <p className="text-sm mt-1 font-medium">{isFamily ? 'Your Family Plan is at its four-child limit.' : 'Choose the Family Plan to add more children.'}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {!isFamily && <Button size="sm" onClick={() => navigate('/plans')}>See Family Plan</Button>}
          {isFamily && childAllowance >= 4 && profiles.length >= 4 && (
            <Button size="sm" variant="outline" asChild><a href="mailto:montessorilifeskills@gmail.com?subject=More%20than%20four%20child%20profiles">Contact support for more than four</a></Button>
          )}
        </div>

        {uncovered.length > 0 && !choosing && (
          <p className="text-sm text-muted-foreground">
            Not included in the current plan: {uncovered.map((p) => p.name).join(', ')}. Their saved progress is kept safe.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ChildCoveragePanel;
