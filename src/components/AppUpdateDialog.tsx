import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppLauncher } from '@capacitor/app-launcher';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAppUpdateCheck } from '@/hooks/useAppUpdateCheck';

/**
 * Prompts native app users to update when Firebase reports a newer version.
 * Reappears on every app launch until the user updates.
 */
const AppUpdateDialog: React.FC = () => {
  const { t } = useTranslation();
  const { updateAvailable, latestVersion, storeUrl, nativeStoreUrl, dismiss } = useAppUpdateCheck();

  const openStore = async () => {
    // Leave the app entirely: open the native App Store / Play Store app,
    // falling back to the external system browser with the web store URL.
    try {
      const { completed } = await AppLauncher.openUrl({ url: nativeStoreUrl });
      if (!completed) throw new Error('not launched');
    } catch {
      try {
        await AppLauncher.openUrl({ url: storeUrl });
      } catch {
        window.open(storeUrl, '_system');
      }
    }
    dismiss();
  };

  return (
    <AlertDialog open={updateAvailable} onOpenChange={(open) => !open && dismiss()}>
      <AlertDialogContent className="max-w-sm rounded-[32px] border border-border/40 bg-card p-8 text-center shadow-2xl shadow-primary/10 sm:rounded-[32px]">
        <AlertDialogHeader className="items-center text-center sm:text-center">
          <AlertDialogTitle className="font-serif text-2xl font-semibold leading-tight text-primary">{t('pages.update.title')}</AlertDialogTitle>
          <AlertDialogDescription className="px-2 text-[15px] leading-relaxed text-muted-foreground">
            {latestVersion
              ? t('pages.update.bodyVersion', { version: latestVersion })
              : t('pages.update.body')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-8 flex-col gap-3 sm:flex-col">
          <AlertDialogAction
            onClick={openStore}
            className="w-full rounded-2xl py-4 text-base font-medium shadow-sm transition-all active:scale-95"
          >{t('pages.update.now')}</AlertDialogAction>
          <AlertDialogCancel
            onClick={dismiss}
            className="mt-0 w-full rounded-2xl border-0 bg-transparent py-3 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground active:opacity-60 sm:mt-0"
          >{t('pages.update.later')}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AppUpdateDialog;
