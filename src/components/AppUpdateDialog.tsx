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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>A new version is available</AlertDialogTitle>
          <AlertDialogDescription>
            {latestVersion
              ? `Version ${latestVersion} of Montessori Life Skills is ready to install, with the latest activities and improvements.`
              : 'A newer version of Montessori Life Skills is ready to install.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={dismiss}>Later</AlertDialogCancel>
          <AlertDialogAction onClick={openStore}>Update now</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AppUpdateDialog;
