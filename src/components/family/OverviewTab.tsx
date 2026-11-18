import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { lessonText } from '@/i18n/lessonText';
import { useTranslation } from 'react-i18next';
import { areaTitle, locale } from '@/i18n/format';
import { Progress } from '@/components/ui/progress';
import { curriculumSectionsForMaterials } from '@/data/curriculumSections';
import { areaOfSkill, titleOfSkill } from '@/lib/skillArea';
import { CalEvent, Completion, Goal } from './api';

const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

export const OverviewTab = ({ name, completions, goals, events }: {
  name: string; completions: Completion[]; goals: Goal[]; events: CalEvent[];
}) => {
  const { t } = useTranslation();
  const now = new Date();
  const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
  const thisWeek = completions.filter((c) => c.completed_at && new Date(c.completed_at) >= weekStart);
  const minutes = events.filter((e) => e.completed && new Date(e.starts_at) >= weekStart)
    .reduce((s, e) => s + e.duration_minutes, 0);

  const days = new Set(completions.filter((c) => c.completed_at).map((c) => dayKey(new Date(c.completed_at!))));
  let streak = 0;
  const cur = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (!days.has(dayKey(cur))) cur.setDate(cur.getDate() - 1);
  while (days.has(dayKey(cur))) { streak++; cur.setDate(cur.getDate() - 1); }

  const done = new Set(completions.map((c) => c.skill_id));
  const areas = curriculumSectionsForMaterials.map((s) => {
    const ids = Object.keys(s.skills);
    const n = ids.filter((id) => done.has(id)).length;
    return { key: s.key, title: areaTitle(s.key, s.title), emoji: s.emoji, n, total: ids.length };
  });
  const recent = [...completions].filter((c) => c.completed_at)
    .sort((a, b) => b.completed_at!.localeCompare(a.completed_at!)).slice(0, 6);
  const upcoming = events.filter((e) => !e.completed && new Date(e.starts_at) >= now).slice(0, 4);
  const topGoals = goals.filter((g) => g.status === 'active').slice(0, 3);

  if (completions.length === 0 && goals.length === 0 && events.length === 0) {
    return (
      <Card><CardContent className="py-10 text-center text-muted-foreground">
        {t('family.ov.empty', { name })}
      </CardContent></Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          [t('family.ov.thisWeek'), thisWeek.length],
          [t('family.ov.minutes'), minutes],
          [t('family.ov.streak'), streak],
          [t('family.ov.total'), completions.length],
        ].map(([label, v]) => (
          <Card key={label as string}><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{v}</div>
            <div className="text-xs text-muted-foreground mt-1">{label}</div>
          </CardContent></Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">{t('family.ov.priority')}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {topGoals.length === 0 && <p className="text-sm text-muted-foreground">{t('family.ov.noGoals')}</p>}
            {topGoals.map((g) => {
              const n = g.skill_ids.filter((id) => done.has(id)).length;
              const next = g.skill_ids.find((id) => !done.has(id));
              return (
                <div key={g.id}>
                  <div className="flex justify-between text-sm"><span className="font-medium">{g.title}</span><span>{n}/{g.skill_ids.length}</span></div>
                  <Progress value={g.skill_ids.length ? (n / g.skill_ids.length) * 100 : 0} className="h-2 mt-1" />
                  {next && <p className="text-xs text-muted-foreground mt-1">{t('family.ov.next', { title: lessonText(titleOfSkill(next)) })}</p>}
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">{t('family.ov.comingUp')}</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {upcoming.length === 0 && <p className="text-sm text-muted-foreground">{t('family.ov.nothingPlanned')}</p>}
            {upcoming.map((e) => (
              <div key={e.id} className="flex justify-between text-sm border-b border-border/60 pb-2">
                <span>{lessonText(e.title)}</span>
                <span className="text-muted-foreground">{new Date(e.starts_at).toLocaleString(locale(), { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">{t('family.ov.byArea')}</CardTitle></CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-x-8 gap-y-4">
          {areas.map((a) => (
            <div key={a.key}>
              <div className="flex justify-between text-sm"><span>{a.emoji} {a.title}</span><span className="text-muted-foreground">{t('family.ov.nOfTotal', { n: a.n, total: a.total })}</span></div>
              <Progress value={a.total ? (a.n / a.total) * 100 : 0} className="h-2 mt-1" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">{t('family.ov.recent')}</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {recent.length === 0 && <p className="text-sm text-muted-foreground">{t('family.ov.noneCompleted')}</p>}
          {recent.map((c) => (
            <div key={c.skill_id} className="flex justify-between text-sm">
              <span>{lessonText(titleOfSkill(c.skill_id))} <span className="text-muted-foreground">· {areaTitle(areaOfSkill(c.skill_id), curriculumSectionsForMaterials.find((s) => s.key === areaOfSkill(c.skill_id))?.title ?? '')}</span></span>
              <span className="text-muted-foreground">{new Date(c.completed_at!).toLocaleDateString(locale())}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
