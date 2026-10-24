import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { CAPABILITIES, Capability, resolvePolicies, schoolCall, SchoolPolicies } from './api';

const LABEL: Record<Capability, string> = {
  record_progress: 'Record progress and observation notes',
  edit_others_records: "Edit or delete other staff members' notes and reports",
  edit_roster: 'Add and edit students',
  delete_student: 'Delete students',
  plan: 'Plan lessons',
  send_report: 'Write and send parent reports',
};

/** School Admins decide what Teachers and Assistants may do. School Admins always keep full access. */
export default function StaffPolicies({ schoolId, policies, onSaved }: { schoolId: string; policies: unknown; onSaved: () => void }) {
  const { toast } = useToast();
  const [p, setP] = useState<SchoolPolicies>(() => resolvePolicies(policies));
  const [saving, setSaving] = useState(false);
  useEffect(() => { setP(resolvePolicies(policies)); }, [policies]);
  const dirty = JSON.stringify(p) !== JSON.stringify(resolvePolicies(policies));
  const toggle = (role: 'teacher' | 'assistant', c: Capability, v: boolean) => setP((x) => ({ ...x, [role]: { ...x[role], [c]: v } }));

  const save = async () => {
    setSaving(true);
    try { await schoolCall({ action: 'policies_save', school_id: schoolId, policies: p }); toast({ title: 'Staff permissions saved' }); onSaved(); }
    catch (e) { toast({ title: 'Could not save', description: (e as Error).message, variant: 'destructive' }); }
    finally { setSaving(false); }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">Staff permissions</CardTitle>
        <p className="text-sm text-muted-foreground">You decide what your staff can do. School Admins always have full access to every classroom, grade and report.</p>
      </CardHeader>
      <CardContent className="space-y-5">
        <label className="flex items-start justify-between gap-4">
          <span><span className="font-medium block">Staff can work in every classroom</span>
            <span className="text-sm text-muted-foreground">Off: Teachers and Assistants only see the classrooms you assign them.</span></span>
          <Switch checked={p.staff_scope === 'school'} onCheckedChange={(v) => setP((x) => ({ ...x, staff_scope: v ? 'school' : 'assigned' }))} />
        </label>
        <div className="grid md:grid-cols-[1fr_auto_auto] gap-x-6 gap-y-3 items-center">
          <span className="text-sm font-medium text-muted-foreground">Allowed to…</span>
          <span className="text-sm font-medium text-muted-foreground hidden md:block">Teachers</span>
          <span className="text-sm font-medium text-muted-foreground hidden md:block">Assistants</span>
          {CAPABILITIES.filter((c) => c !== 'edit_roster').map((c) => (
            <div key={c} className="contents">
              <span className="text-sm">{LABEL[c]}</span>
              <label className="flex items-center gap-2 text-sm"><Switch checked={p.teacher[c]} onCheckedChange={(v) => toggle('teacher', c, v)} aria-label={`Teachers: ${LABEL[c]}`} /><span className="md:hidden">Teachers</span></label>
              <label className="flex items-center gap-2 text-sm"><Switch checked={p.assistant[c]} onCheckedChange={(v) => toggle('assistant', c, v)} aria-label={`Assistants: ${LABEL[c]}`} /><span className="md:hidden">Assistants</span></label>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Button onClick={save} disabled={!dirty || saving}>{saving ? 'Saving…' : 'Save permissions'}</Button>
          {dirty && <Button variant="ghost" onClick={() => setP(resolvePolicies(policies))}>Discard</Button>}
        </div>
      </CardContent>
    </Card>
  );
}
