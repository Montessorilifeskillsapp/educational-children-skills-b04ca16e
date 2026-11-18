import { useMemo, useState } from 'react';
import { lessonText } from '@/i18n/lessonText';
import { useTranslation } from 'react-i18next';
import { areaTitle, locale } from '@/i18n/format';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { curriculumSectionsForMaterials } from '@/data/curriculumSections';
import { titleOfSkill } from '@/lib/skillArea';
import { call, Completion, Goal } from './api';


export const GoalsTab = ({ childId, goals, completions, reload }: {
  childId: string; goals: Goal[]; completions: Completion[]; reload: () => void;
}) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const PRIORITY: Record<number, string> = { 1: t('family.goals.p1'), 2: t('family.goals.p2'), 3: t('family.goals.p3') };
  const done = useMemo(() => new Set(completions.map((c) => c.skill_id)), [completions]);
  const [editing, setEditing] = useState<Partial<Goal> | null>(null);
  const [saving, setSaving] = useState(false);

  const sorted = [...goals].sort((a, b) => (a.status === b.status ? a.sort_order - b.sort_order || a.priority - b.priority : a.status === 'active' ? -1 : 1));
  const section = curriculumSectionsForMaterials.find((s) => s.key === editing?.area);

  const save = async () => {
    if (!editing?.title || !editing.skill_ids?.length) {
      toast({ title: t('family.goals.needTitle'), variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      await call({ action: 'goal_save', goal: {
        id: editing.id, child_id: childId, title: editing.title, area: editing.area ?? null,
        skill_ids: editing.skill_ids, priority: editing.priority ?? 2, target_date: editing.target_date || null,
        status: editing.status ?? 'active',
      } });
      setEditing(null);
      reload();
    } catch (e) {
      toast({ title: t('family.goals.saveFailed'), description: String(e), variant: 'destructive' });
    } finally { setSaving(false); }
  };

  const move = async (idx: number, dir: -1 | 1) => {
    const active = sorted.filter((g) => g.status === 'active');
    const j = idx + dir;
    if (j < 0 || j >= active.length) return;
    [active[idx], active[j]] = [active[j], active[idx]];
    await call({ action: 'goal_reorder', ids: active.map((g) => g.id) });
    reload();
  };

  const remove = async (id: string) => {
    await call({ action: 'goal_delete', id });
    reload();
  };

  const activeGoals = sorted.filter((g) => g.status === 'active');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm text-muted-foreground">{t('family.goals.intro')}</p>
        <Button onClick={() => setEditing({ priority: 2, skill_ids: [] })}><Plus className="h-4 w-4 mr-1" />{t('family.goals.new')}</Button>
      </div>

      {sorted.length === 0 && (
        <Card><CardContent className="py-10 text-center text-muted-foreground">{t('family.goals.empty')}</CardContent></Card>
      )}

      {sorted.map((g) => {
        const n = g.skill_ids.filter((id) => done.has(id)).length;
        const next = g.skill_ids.find((id) => !done.has(id));
        const idx = activeGoals.indexOf(g);
        const area = curriculumSectionsForMaterials.find((s) => s.key === g.area);
        return (
          <Card key={g.id} className={g.status !== 'active' ? 'opacity-70' : ''}>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {g.status === 'active' && <span className="text-xs font-semibold text-muted-foreground">#{idx + 1}</span>}
                    <h3 className="font-semibold text-foreground">{g.title}</h3>
                    <Badge variant={g.priority === 1 ? 'default' : 'secondary'}>{PRIORITY[g.priority]}</Badge>
                    {g.status === 'done' && <Badge variant="outline">{t('family.goals.reached')}</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {area ? `${area.emoji} ${areaTitle(area.key, area.title)}` : ''}{g.target_date ? t('family.goals.by', { date: new Date(g.target_date + 'T00:00').toLocaleDateString(locale()) }) : ''}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  {g.status === 'active' && <>
                    <Button size="icon" variant="ghost" aria-label={t('family.goals.up')} onClick={() => move(idx, -1)} disabled={idx === 0}><ArrowUp className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" aria-label={t('family.goals.down')} onClick={() => move(idx, 1)} disabled={idx === activeGoals.length - 1}><ArrowDown className="h-4 w-4" /></Button>
                  </>}
                  <Button size="icon" variant="ghost" aria-label={t('family.goals.edit')} onClick={() => setEditing(g)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" aria-label={t('family.goals.delete')} onClick={() => remove(g.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="flex justify-between text-sm"><span>{t('family.goals.nActivities', { n, total: g.skill_ids.length })}</span><span>{g.skill_ids.length ? Math.round((n / g.skill_ids.length) * 100) : 0}%</span></div>
              <Progress value={g.skill_ids.length ? (n / g.skill_ids.length) * 100 : 0} className="h-2" />
              {next && <p className="text-sm text-muted-foreground">{t('family.goals.nextSeq')} <span className="text-foreground">{lessonText(titleOfSkill(next))}</span></p>}
            </CardContent>
          </Card>
        );
      })}

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing?.id ? t('family.goals.edit') : t('family.goals.new')}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="goal-title">{t('family.goals.goal')}</Label>
              <Input id="goal-title" value={editing?.title ?? ''} maxLength={200} placeholder={t('family.goals.placeholder')}
                onChange={(e) => setEditing((p) => ({ ...p, title: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>{t('family.goals.priority')}</Label>
                <Select value={String(editing?.priority ?? 2)} onValueChange={(v) => setEditing((p) => ({ ...p, priority: Number(v) }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{[1, 2, 3].map((p) => <SelectItem key={p} value={String(p)}>{PRIORITY[p]}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="goal-date">{t('family.goals.target')}</Label>
                <Input id="goal-date" type="date" value={editing?.target_date ?? ''} onChange={(e) => setEditing((p) => ({ ...p, target_date: e.target.value }))} />
              </div>
            </div>
            <div>
              <Label>{t('family.goals.area')}</Label>
              <Select value={editing?.area ?? ''} onValueChange={(v) => setEditing((p) => ({ ...p, area: v, skill_ids: [] }))}>
                <SelectTrigger><SelectValue placeholder={t('family.goals.chooseArea')} /></SelectTrigger>
                <SelectContent>{curriculumSectionsForMaterials.map((s) => <SelectItem key={s.key} value={s.key}>{s.emoji} {areaTitle(s.key, s.title)}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            {section && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <Label>{t('family.goals.activities')}</Label>
                  <Button type="button" variant="link" size="sm" className="h-auto p-0"
                    onClick={() => setEditing((p) => ({ ...p, skill_ids: Object.keys(section.skills) }))}>{t('family.goals.selectAll')}</Button>
                </div>
                <ScrollArea className="h-56 border rounded-md p-2">
                  {Object.entries(section.skills).map(([id, s]) => {
                    const checked = editing?.skill_ids?.includes(id) ?? false;
                    return (
                      <label key={id} className="flex items-center gap-2 py-1 text-sm cursor-pointer">
                        <Checkbox checked={checked} onCheckedChange={(c) => setEditing((p) => {
                          const cur = p?.skill_ids ?? [];
                          const order = Object.keys(section.skills);
                          const nextIds = c ? [...cur, id] : cur.filter((x) => x !== id);
                          return { ...p, skill_ids: order.filter((x) => nextIds.includes(x)) };
                        })} />
                        <span>{lessonText(s.title)}</span>
                        {done.has(id) && <Badge variant="outline" className="ml-auto text-xs">{t('shared.done')}</Badge>}
                      </label>
                    );
                  })}
                </ScrollArea>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>{t('shared.cancel')}</Button>
            <Button onClick={save} disabled={saving}>{saving ? t('shared.saving') : t('family.goals.save')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
