import { useState } from 'react';
import { lessonText } from '@/i18n/lessonText';
import { useTranslation } from 'react-i18next';
import { areaTitle, locale } from '@/i18n/format';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Printer, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { curriculumSectionsForMaterials } from '@/data/curriculumSections';
import { call, WeeklyReport } from './api';

export const ReportsTab = ({ childId, childName, reports, reload }: {
  childId: string; childName: string; reports: WeeklyReport[]; reload: () => void;
}) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [busy, setBusy] = useState(false);
  const [openId, setOpenId] = useState<string | null>(reports[0]?.id ?? null);

  const generate = async () => {
    setBusy(true);
    try {
      const r = await call<{ report: WeeklyReport }>({ action: 'report_generate', child_id: childId });
      setOpenId(r.report.id);
      reload();
    } catch (e) {
      toast({ title: t('family.rep.createFailed'), description: String(e), variant: 'destructive' });
    } finally { setBusy(false); }
  };

  const current = reports.find((r) => r.id === openId) ?? reports[0];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap print:hidden">
        <p className="text-sm text-muted-foreground">{t('family.rep.intro')}</p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={generate} disabled={busy}><RefreshCw className="h-4 w-4 mr-1" />{busy ? t('family.rep.creating') : t('family.rep.soFar')}</Button>
          {current && <Button variant="outline" onClick={() => window.print()}><Printer className="h-4 w-4 mr-1" />{t('shared.print')}</Button>}
        </div>
      </div>

      {reports.length === 0 && (
        <Card><CardContent className="py-10 text-center text-muted-foreground">{t('family.rep.empty')}</CardContent></Card>
      )}

      {reports.length > 0 && (
        <div className="grid md:grid-cols-[180px_1fr] gap-4">
          <div className="space-y-1 print:hidden">
            {reports.map((r) => (
              <Button key={r.id} variant={r.id === current?.id ? 'default' : 'ghost'} className="w-full justify-start" onClick={() => setOpenId(r.id)}>
                {t('family.rep.weekOf', { date: new Date(r.week_start + 'T00:00').toLocaleDateString(locale(), { month: 'short', day: 'numeric' }) })}
              </Button>
            ))}
          </div>
          {current && (
            <Card>
              <CardHeader>
                <CardTitle>{t('family.rep.title', { name: childName, date: new Date(current.week_start + 'T00:00').toLocaleDateString(locale(), { month: 'long', day: 'numeric', year: 'numeric' }) })}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div><div className="text-2xl font-bold">{current.summary.activity_count}</div><div className="text-xs text-muted-foreground">{t('family.rep.completed')}</div></div>
                  <div><div className="text-2xl font-bold">{current.summary.minutes}</div><div className="text-xs text-muted-foreground">{t('family.ov.minutes')}</div></div>
                  <div><div className="text-2xl font-bold">{current.summary.planned_done}/{current.summary.planned}</div><div className="text-xs text-muted-foreground">{t('family.rep.sessions')}</div></div>
                </div>
                <section>
                  <h4 className="font-semibold mb-2">{t('family.rep.areas')}</h4>
                  {Object.keys(current.summary.areas).length === 0 ? <p className="text-sm text-muted-foreground">{t('family.rep.noneWeek')}</p> : (
                    <ul className="text-sm space-y-1">
                      {Object.entries(current.summary.areas).map(([k, n]) => (
                        <li key={k}>{areaTitle(k, curriculumSectionsForMaterials.find((s) => s.key === k)?.title ?? t('shared.other'))}: {n}</li>
                      ))}
                    </ul>
                  )}
                </section>
                <section>
                  <h4 className="font-semibold mb-2">{t('family.rep.activities')}</h4>
                  {current.summary.activities.length === 0 ? <p className="text-sm text-muted-foreground">{t('family.rep.noActivities')}</p> : (
                    <ul className="text-sm space-y-1">
                      {current.summary.activities.map((a, i) => <li key={i}>{lessonText(a.title)} <span className="text-muted-foreground">· {new Date(a.at).toLocaleDateString(locale(), { weekday: 'short' })}</span></li>)}
                    </ul>
                  )}
                </section>
                <section>
                  <h4 className="font-semibold mb-2">{t('family.rep.goals')}</h4>
                  {current.summary.goals.length === 0 ? <p className="text-sm text-muted-foreground">{t('family.rep.noGoals')}</p> : current.summary.goals.map((g, i) => (
                    <div key={i} className="mb-3">
                      <div className="flex justify-between text-sm"><span>{g.title}</span><span>{g.complete}/{g.total}</span></div>
                      <Progress value={g.total ? (g.complete / g.total) * 100 : 0} className="h-2 mt-1" />
                      {g.next && <p className="text-xs text-muted-foreground mt-1">{t('family.rep.presentNext', { title: g.next })}</p>}
                    </div>
                  ))}
                </section>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
