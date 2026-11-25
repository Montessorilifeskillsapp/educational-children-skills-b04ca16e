import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { FunctionsHttpError } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Download, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { downloadBlob } from '@/lib/downloadBlob';

async function invoke(body: Record<string, unknown>) {
  const { data, error } = await supabase.functions.invoke('account-data', { body });
  if (error) {
    let code = '';
    if (error instanceof FunctionsHttpError) { try { code = (await error.context.json()).error ?? ''; } catch { /* ignore */ } }
    throw new Error(code || 'error');
  }
  return data;
}

/** GDPR/PIPL/DPDPA data-rights controls: download all family data, or erase the account. */
export const DataRightsCard = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [busy, setBusy] = useState<'export' | 'delete' | null>(null);
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState('');

  const exportData = async () => {
    setBusy('export');
    try {
      const { data } = await invoke({ action: 'export' });
      downloadBlob(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }), `montessori-life-skills-data-${new Date().toISOString().slice(0, 10)}.json`);
    } catch { toast({ title: t('family.rights.failed'), variant: 'destructive' }); }
    setBusy(null);
  };

  const erase = async () => {
    setBusy('delete');
    try {
      await invoke({ action: 'delete', confirm: 'DELETE' });
      await supabase.auth.signOut();
      window.location.assign('/');
    } catch (e) {
      const code = (e as Error).message;
      const key = code === 'active_subscription' ? 'family.rights.cancelFirst' : code === 'school_admin' ? 'family.rights.schoolAdmin' : 'family.rights.failed';
      toast({ title: t(key), variant: 'destructive' });
      setBusy(null); setOpen(false);
    }
  };

  return (
    <Card>
      <CardHeader><CardTitle className="text-lg">{t('family.rights.title')}</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{t('family.rights.intro')}</p>
        <Button variant="outline" onClick={exportData} disabled={busy !== null}><Download className="h-4 w-4 mr-1" />{t('family.rights.download')}</Button>
        <div>
          <Button variant="outline" className="text-destructive border-destructive/40" onClick={() => setOpen(true)} disabled={busy !== null}><Trash2 className="h-4 w-4 mr-1" />{t('family.rights.delete')}</Button>
        </div>
        <p className="text-xs text-muted-foreground">{t('family.rights.schoolNote')} <a href="/privacy-policy#your-rights" className="text-primary underline">{t('family.rights.policy')}</a></p>
      </CardContent>
      <AlertDialog open={open} onOpenChange={(v) => { setOpen(v); setConfirm(''); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('family.rights.confirmTitle')}</AlertDialogTitle>
            <AlertDialogDescription>{t('family.rights.confirmBody')}</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-1">
            <Label htmlFor="erase-confirm">{t('family.rights.typeDelete')}</Label>
            <Input id="erase-confirm" value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="off" />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('shared.cancel')}</AlertDialogCancel>
            <AlertDialogAction disabled={confirm !== 'DELETE' || busy !== null} onClick={(e) => { e.preventDefault(); erase(); }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">{t('family.rights.deleteForever')}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};
