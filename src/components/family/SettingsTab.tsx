import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuthContext } from '@/components/AuthProvider';
import { enablePush, pushMessage } from '@/lib/push';
import { call, db, DEFAULT_PREFS, Prefs } from './api';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const SettingsTab = ({ onManageProfiles }: { onManageProfiles: () => void }) => {
  const { toast } = useToast();
  const { user } = useAuthContext();
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [name, setName] = useState('');
  const [pushStatus, setPushStatus] = useState<string | null>(null);
  const [devices, setDevices] = useState(0);

  useEffect(() => {
    if (!user) return;
    db.from('notification_preferences').select('*').eq('user_id', user.id).maybeSingle().then(({ data }: { data: Prefs | null }) => {
      if (data) setPrefs({ ...DEFAULT_PREFS, ...data });
      else call({ action: 'prefs_save', prefs: DEFAULT_PREFS }).catch(() => {});
    });
    db.from('user_profiles').select('full_name').eq('user_id', user.id).maybeSingle().then(({ data }: { data: { full_name: string } | null }) => setName(data?.full_name ?? ''));
    db.from('push_tokens').select('id', { count: 'exact', head: true }).eq('user_id', user.id).then(({ count }: { count: number | null }) => setDevices(count ?? 0));
  }, [user]);

  const update = async (patch: Partial<Prefs>) => {
    const next = { ...prefs, ...patch };
    setPrefs(next);
    try { await call({ action: 'prefs_save', prefs: patch }); }
    catch (e) { toast({ title: 'Could not save setting', description: String(e), variant: 'destructive' }); }
  };

  const saveName = async () => {
    const { error } = await db.from('user_profiles').update({ full_name: name.trim().slice(0, 100) }).eq('user_id', user!.id);
    toast(error ? { title: 'Could not save name', variant: 'destructive' } : { title: 'Name saved' });
  };

  const turnOnPush = async () => {
    const r = await enablePush();
    setPushStatus(pushMessage[r.status]);
    if (r.status === 'registered') { setDevices((d) => d + 1); if (!prefs.push_enabled) update({ push_enabled: true }); }
  };

  const Row = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
    <div className="flex items-center justify-between gap-4 py-2">
      <div><div className="text-sm font-medium">{label}</div>{hint && <div className="text-xs text-muted-foreground">{hint}</div>}</div>
      <div className="flex items-center gap-2 shrink-0">{children}</div>
    </div>
  );

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Bell className="h-5 w-5" />Notifications</CardTitle></CardHeader>
        <CardContent className="divide-y divide-border/60">
          <Row label="Daily reminder" hint="A nudge to do today's activity">
            <Input type="time" step={3600} className="w-28" value={prefs.daily_reminder_time} disabled={!prefs.daily_reminder}
              onChange={(e) => update({ daily_reminder_time: `${e.target.value.slice(0, 2)}:00` })} aria-label="Reminder time" />
            <Switch checked={prefs.daily_reminder} onCheckedChange={(v) => update({ daily_reminder: v })} aria-label="Daily reminder" />
          </Row>
          <Row label="Weekly report" hint="Progress and goals for each child">
            <Select value={String(prefs.weekly_report_day)} onValueChange={(v) => update({ weekly_report_day: Number(v) })} disabled={!prefs.weekly_report}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>{DAYS.map((d, i) => <SelectItem key={d} value={String(i)}>{d}</SelectItem>)}</SelectContent>
            </Select>
            <Switch checked={prefs.weekly_report} onCheckedChange={(v) => update({ weekly_report: v })} aria-label="Weekly report" />
          </Row>
          <Row label="Goal alerts" hint="When a goal is reached or due within 3 days">
            <Switch checked={prefs.goal_alerts} onCheckedChange={(v) => update({ goal_alerts: v })} aria-label="Goal alerts" />
          </Row>
          <Row label="Planned activity reminders" hint="Before activities in your calendar">
            <Select value={String(prefs.activity_reminder_minutes)} onValueChange={(v) => update({ activity_reminder_minutes: Number(v) })} disabled={!prefs.activity_reminders}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>{[[30, '30 min before'], [60, '1 hour before'], [180, '3 hours before'], [1440, '1 day before']].map(([v, l]) => <SelectItem key={v} value={String(v)}>{l}</SelectItem>)}</SelectContent>
            </Select>
            <Switch checked={prefs.activity_reminders} onCheckedChange={(v) => update({ activity_reminders: v })} aria-label="Activity reminders" />
          </Row>
          <Row label="Time zone"><span className="text-sm text-muted-foreground">{prefs.timezone}</span>
            {prefs.timezone !== DEFAULT_PREFS.timezone && <Button size="sm" variant="outline" onClick={() => update({ timezone: DEFAULT_PREFS.timezone })}>Use {DEFAULT_PREFS.timezone}</Button>}
          </Row>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">How to reach you</CardTitle></CardHeader>
          <CardContent className="divide-y divide-border/60">
            <Row label="Email" hint={user?.email ?? ''}>
              <Switch checked={prefs.email_enabled} onCheckedChange={(v) => update({ email_enabled: v })} aria-label="Email notifications" />
            </Row>
            <Row label="Push notifications" hint={devices ? `On for ${devices} device${devices > 1 ? 's' : ''}` : 'Not on for any device yet'}>
              <Switch checked={prefs.push_enabled} onCheckedChange={(v) => update({ push_enabled: v })} aria-label="Push notifications" />
            </Row>
            <div className="pt-3 space-y-2">
              <Button variant="outline" onClick={turnOnPush}>Turn on push for this device</Button>
              {pushStatus && <p className="text-sm text-muted-foreground">{pushStatus}</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Account</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label htmlFor="acct-name">Your name</Label>
              <div className="flex gap-2"><Input id="acct-name" value={name} maxLength={100} onChange={(e) => setName(e.target.value)} /><Button onClick={saveName}>Save</Button></div>
            </div>
            <Button variant="outline" onClick={onManageProfiles}><Users className="h-4 w-4 mr-1" />Manage child profiles</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
