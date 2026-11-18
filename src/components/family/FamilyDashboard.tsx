import { useEffect, useState } from 'react';
import { useLessonLanguage } from '@/i18n/lessonText';
import { useTranslation } from 'react-i18next';
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
import SchoolRecords from './SchoolRecords';
import { HomeschoolTab } from './HomeschoolTab';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const FamilyDashboard = ({ onBack, onManageProfiles }: { onBack: () => void; onManageProfiles: () => void }) => {
  useSEO(SEO_CONFIG.parentDashboard);
  const { t } = useTranslation();
  useLessonLanguage();
  const { user } = useAuthContext();
  const { profiles, activeProfile } = useProfile();
  const children = profiles.filter((p) => UUID_RE.test(p.id) && p.covered !== false);
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
        <BackButton onClick={onBack} label={t('family.dash.back')} />
        <header className="mb-5">
          <h1 className="text-3xl font-bold text-foreground">{t('family.dash.title')}</h1>
          <p className="text-muted-foreground">{t('family.dash.subtitle')}</p>
        </header>

        {user && <SchoolRecords key={user.id} userId={user.id} />}

        {!user ? (
          <Card><CardContent className="py-10 text-center text-muted-foreground">{t('family.dash.signIn')}</CardContent></Card>
        ) : children.length === 0 ? (
          <Card><CardContent className="py-10 text-center space-y-3">
            <p className="text-muted-foreground">{t('family.dash.addFirst')}</p>
            <Button onClick={onManageProfiles}>{t('family.dash.addChild')}</Button>
          </CardContent></Card>
        ) : (
          <>
            <div className="flex gap-2 flex-wrap mb-4" role="tablist" aria-label={t('family.dash.chooseChild')}>
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
                  <TabsTrigger value="overview">{t('family.dash.tabs.overview')}</TabsTrigger>
                  <TabsTrigger value="goals">{t('family.dash.tabs.goals')}</TabsTrigger>
                  <TabsTrigger value="calendar">{t('family.dash.tabs.calendar')}</TabsTrigger>
                  <TabsTrigger value="reports">{t('family.dash.tabs.reports')}</TabsTrigger>
                  <TabsTrigger value="homeschool">{t('family.dash.tabs.homeschool')}</TabsTrigger>
                  <TabsTrigger value="settings">{t('family.dash.tabs.settings')}</TabsTrigger>
                </TabsList>
                <TabsContent value="overview"><OverviewTab name={child.name} completions={data.completions} goals={data.goals} events={data.events} /></TabsContent>
                <TabsContent value="goals"><GoalsTab childId={child.id} goals={data.goals} completions={data.completions} reload={data.reload} /></TabsContent>
                <TabsContent value="calendar"><CalendarTab childId={child.id} childName={child.name} events={data.events} completions={data.completions} reload={data.reload} /></TabsContent>
                <TabsContent value="reports"><ReportsTab key={child.id} childId={child.id} childName={child.name} reports={data.reports} reload={data.reload} /></TabsContent>
                <TabsContent value="homeschool"><HomeschoolTab key={child.id} childName={child.name} completions={data.completions} /></TabsContent>
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
