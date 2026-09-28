import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/ui/back-button';
import { useProfile } from '@/contexts/ProfileContext';
import { useAuthContext } from '@/components/AuthProvider';
import { useSEO, SEO_CONFIG } from '@/hooks/useSEO';
import { cn } from '@/lib/utils';
import { useFamilyData } from './useFamilyData';
import { OverviewTab } from './OverviewTab';
import { GoalsTab } from './GoalsTab';
import { CalendarTab } from './CalendarTab';
import { ReportsTab } from './ReportsTab';
import { SettingsTab } from './SettingsTab';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const FamilyDashboard = ({ onBack, onManageProfiles }: { onBack: () => void; onManageProfiles: () => void }) => {
  useSEO(SEO_CONFIG.parentDashboard);
  const { user } = useAuthContext();
  const { profiles, activeProfile } = useProfile();
  const children = profiles.filter((p) => UUID_RE.test(p.id));
  const [childId, setChildId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!childId || !children.find((c) => c.id === childId)) {
      setChildId((children.find((c) => c.id === activeProfile?.id) ?? children[0])?.id);
    }
  }, [children, activeProfile, childId]);

  const child = children.find((c) => c.id === childId);
  const data = useFamilyData(childId);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-5xl mx-auto">
        <BackButton onClick={onBack} label="Back to Dashboard" />
        <header className="mb-5">
          <h1 className="text-3xl font-bold text-foreground">Family Dashboard</h1>
          <p className="text-muted-foreground">Progress, goals, planning and reports for each child.</p>
        </header>

        {!user ? (
          <Card><CardContent className="py-10 text-center text-muted-foreground">Sign in to track progress, set goals and plan activities.</CardContent></Card>
        ) : children.length === 0 ? (
          <Card><CardContent className="py-10 text-center space-y-3">
            <p className="text-muted-foreground">Add a child profile to start tracking.</p>
            <Button onClick={onManageProfiles}>Add a child</Button>
          </CardContent></Card>
        ) : (
          <>
            <div className="flex gap-2 flex-wrap mb-4" role="tablist" aria-label="Choose child">
              {children.map((c) => (
                <button key={c.id} role="tab" aria-selected={c.id === childId} onClick={() => setChildId(c.id)}
                  className={cn('flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors',
                    c.id === childId ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-foreground border-border hover:bg-muted')}>
                  <span aria-hidden>{c.avatar}</span>{c.name}
                </button>
              ))}
            </div>

            {child && (
              <Tabs defaultValue="overview">
                <TabsList className="flex flex-wrap h-auto mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="goals">Goals</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  <TabsTrigger value="reports">Weekly Reports</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview"><OverviewTab name={child.name} completions={data.completions} goals={data.goals} events={data.events} /></TabsContent>
                <TabsContent value="goals"><GoalsTab childId={child.id} goals={data.goals} completions={data.completions} reload={data.reload} /></TabsContent>
                <TabsContent value="calendar"><CalendarTab childId={child.id} childName={child.name} events={data.events} completions={data.completions} reload={data.reload} /></TabsContent>
                <TabsContent value="reports"><ReportsTab key={child.id} childId={child.id} childName={child.name} reports={data.reports} reload={data.reload} /></TabsContent>
                <TabsContent value="settings"><SettingsTab onManageProfiles={onManageProfiles} /></TabsContent>
              </Tabs>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FamilyDashboard;
