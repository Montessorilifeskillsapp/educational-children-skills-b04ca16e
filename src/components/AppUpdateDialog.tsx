import React from 'react';
import { Browser } from '@capacitor/browser';
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
  const { updateAvailable, latestVersion, storeUrl, dismiss } = useAppUpdateCheck();

  const openStore = async () => {
    try {
      await Browser.open({ url: storeUrl });
    } catch {
      window.open(storeUrl, '_blank');
    }
    dismiss();
  };

  return (
    <AlertDialog open={updateAvailable} onOpenChange={(open) => !open && dismiss()}>
      <AlertDialogContent className="max-w-sm rounded-[32px] border border-border/40 bg-card p-8 text-center shadow-2xl shadow-primary/10 sm:rounded-[32px]">
        <AlertDialogHeader className="items-center text-center sm:text-center">
          <AlertDialogTitle className="font-serif text-2xl font-semibold leading-tight text-primary">
            A new version is available
          </AlertDialogTitle>
          <AlertDialogDescription className="px-2 text-[15px] leading-relaxed text-muted-foreground">
            {latestVersion
              ? `Version ${latestVersion} of Montessori Life Skills is ready to install, with the latest activities and improvements.`
              : 'A newer version of Montessori Life Skills is ready to install.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-8 flex-col gap-3 sm:flex-col">
          <AlertDialogAction
            onClick={openStore}
            className="w-full rounded-2xl py-4 text-base font-medium shadow-sm transition-all active:scale-95"
          >
            Update now
          </AlertDialogAction>
          <AlertDialogCancel
            onClick={dismiss}
            className="mt-0 w-full rounded-2xl border-0 bg-transparent py-3 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground active:opacity-60 sm:mt-0"
          >
            Later
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AppUpdateDialog;
