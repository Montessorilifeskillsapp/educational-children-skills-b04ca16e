import { useState, useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Download, Smartphone, Share, MoreVertical, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const InstallPage = () => {
  const { t } = useTranslation();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua));

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setIsInstalled(true);
    setDeferredPrompt(null);
  };

  if (isInstalled) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-lg mx-auto text-center py-16 px-4">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{t('pages.install.installedTitle')}</h1>
          <p className="text-muted-foreground">{t('pages.install.installedBody')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto py-12 px-4 space-y-8">
        <div className="text-center space-y-3">
          <Smartphone className="w-16 h-16 mx-auto text-primary" />
          <h1 className="text-3xl font-bold text-foreground">{t('pages.install.title')}</h1>
          <p className="text-muted-foreground">{t('pages.install.body')}</p>
        </div>

        {deferredPrompt && (
          <div className="text-center">
            <Button size="lg" onClick={handleInstall} className="gap-2">
              <Download className="w-5 h-5" />{t('pages.install.installNow')}</Button>
          </div>
        )}

        {isIOS && (
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h2 className="font-semibold text-lg text-foreground">{t('pages.install.iosTitle')}</h2>
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">1</span>
                  <span><Trans i18nKey="pages.install.ios1" components={{ b: <strong />, icon: <Share className="inline w-4 h-4 text-primary" /> }} /></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">2</span>
                  <span><Trans i18nKey="pages.install.ios2" components={{ b: <strong />, icon: <Plus className="inline w-4 h-4 text-primary" /> }} /></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">3</span>
                  <span><Trans i18nKey="pages.install.ios3" components={{ b: <strong /> }} /></span>
                </li>
              </ol>
            </CardContent>
          </Card>
        )}

        {!isIOS && !deferredPrompt && (
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h2 className="font-semibold text-lg text-foreground">{t('pages.install.androidTitle')}</h2>
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">1</span>
                  <span><Trans i18nKey="pages.install.and1" components={{ b: <strong />, icon: <MoreVertical className="inline w-4 h-4 text-primary" /> }} /></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">2</span>
                  <span><Trans i18nKey="pages.install.and2" components={{ b: <strong /> }} /></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">3</span>
                  <span><Trans i18nKey="pages.install.and3" components={{ b: <strong /> }} /></span>
                </li>
              </ol>
            </CardContent>
          </Card>
        )}

        <div className="text-center text-xs text-muted-foreground">{t('pages.install.footer')}</div>
      </div>
    </div>
  );
};

export default InstallPage;
