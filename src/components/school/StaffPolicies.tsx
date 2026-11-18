import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { CAPABILITIES, Capability, resolvePolicies, schoolCall, SchoolPolicies } from './api';
import { useSettingsDraft } from './useSettingsDraft';


/** School Admins decide what Teachers and Assistants may do. School Admins always keep full access. */
export default function StaffPolicies({ schoolId, policies, onSaved }: { schoolId: string; policies: unknown; onSaved: () => void }) {
  const { toast } = useToast();
  const { t } = useTranslation();
  const label = (c: Capability) => t(`school.po.${c}`);
  const { draft: p, setDraft: setP, acknowledge, dirty, discard } = useSettingsDraft<SchoolPolicies>(schoolId, resolvePolicies(policies));
  const [saving, setSaving] = useState(false);
  const toggle = (role: 'teacher' | 'assistant', c: Capability, v: boolean) => setP((x) => ({ ...x, [role]: { ...x[role], [c]: v } }));

  const save = async () => {
    setSaving(true);
    const submitted = p;
    try { await schoolCall({ action: 'policies_save', school_id: schoolId, policies: submitted }); acknowledge(submitted); toast({ title: t('school.po.saved') }); onSaved(); }
    catch (e) { toast({ title: t('shared.couldNotSave'), description: (e as Error).message, variant: 'destructive' }); }
    finally { setSaving(false); }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">{t('school.po.title')}</CardTitle>
        <p className="text-sm text-muted-foreground">{t('school.po.desc')}</p>
      </CardHeader>
      <CardContent className="space-y-5">
        <label className="flex items-start justify-between gap-4">
          <span><span className="font-medium block">{t('school.po.every')}</span>
            <span className="text-sm text-muted-foreground">{t('school.po.everyOff')}</span></span>
          <Switch checked={p.staff_scope === 'school'} onCheckedChange={(v) => setP((x) => ({ ...x, staff_scope: v ? 'school' : 'assigned' }))} />
        </label>
        <div className="grid md:grid-cols-[1fr_auto_auto] gap-x-6 gap-y-3 items-center">
          <span className="text-sm font-medium text-muted-foreground">{t('school.po.allowed')}</span>
          <span className="text-sm font-medium text-muted-foreground hidden md:block">{t('school.po.teachers')}</span>
          <span className="text-sm font-medium text-muted-foreground hidden md:block">{t('school.po.assistants')}</span>
          {CAPABILITIES.filter((c) => c !== 'edit_roster').map((c) => (
            <div key={c} className="contents">
              <span className="text-sm">{label(c)}</span>
              <label className="flex items-center gap-2 text-sm"><Switch checked={p.teacher[c]} onCheckedChange={(v) => toggle('teacher', c, v)} aria-label={`${t('school.po.teachers')}: ${label(c)}`} /><span className="md:hidden">{t('school.po.teachers')}</span></label>
              <label className="flex items-center gap-2 text-sm"><Switch checked={p.assistant[c]} onCheckedChange={(v) => toggle('assistant', c, v)} aria-label={`${t('school.po.assistants')}: ${label(c)}`} /><span className="md:hidden">{t('school.po.assistants')}</span></label>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Button onClick={save} disabled={!dirty || saving}>{saving ? t('shared.saving') : t('school.po.save')}</Button>
          {dirty && <Button variant="ghost" onClick={discard}>{t('school.po.discard')}</Button>}
        </div>
      </CardContent>
    </Card>
  );
}
