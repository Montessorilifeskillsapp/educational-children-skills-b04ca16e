import { useState, useEffect, useRef } from "react";
import { Download, X, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const INSTALL_BANNER_DISMISSED_KEY = "pwa-install-banner-dismissed";

const InstallBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const navigate = useNavigate();
  const installButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  // Expose banner height as --banner-h so the fixed header can sit below it
  // and the hero padding can compensate, preventing overlap at all breakpoints.
  useEffect(() => {
    const el = bannerRef.current;
    const root = document.documentElement;
    if (!isVisible || !el) {
      root.style.setProperty('--banner-h', '0px');
      return;
    }
    const setVar = () => {
      root.style.setProperty('--banner-h', `${Math.ceil(el.getBoundingClientRect().height)}px`);
      window.dispatchEvent(new Event('banner-resize'));
    };
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener('resize', setVar);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', setVar);
      root.style.setProperty('--banner-h', '0px');
      window.dispatchEvent(new Event('banner-resize'));
    };
  }, [isVisible]);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    if (localStorage.getItem(INSTALL_BANNER_DISMISSED_KEY) === "true") return;

    const ua = navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua);
    setIsIOS(ios);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(INSTALL_BANNER_DISMISSED_KEY, "true");
    // Restore focus to whatever was focused before the banner appeared
    previouslyFocusedRef.current?.focus?.();
  };

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsVisible(false);
      }
      setDeferredPrompt(null);
    } else {
      navigate("/install");
    }
  };

  // Focus management + keyboard dismiss (Escape)
  useEffect(() => {
    if (!isVisible) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    // Move focus to the primary action so screen readers announce the banner
    installButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleDismiss();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isVisible]);

  if (!isVisible) return null;

  const description = isIOS
    ? "Install for quick access like a real app"
    : "Install app for offline access";

  return (
    <div
      ref={bannerRef}
      role="region"
      aria-label="Install app banner"
      aria-live="polite"
      className="fixed top-0 left-0 right-0 z-[60] p-3 animate-fade-in"
      style={{ paddingTop: 'calc(env(safe-area-inset-top) + 0.75rem)' }}
    >
      <div className="max-w-md mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-primary/15 p-4 flex items-center gap-3">
        <div
          aria-hidden="true"
          className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shrink-0"
        >
          <Smartphone className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p id="install-banner-title" className="text-sm font-semibold text-slate-800 truncate">
            Add to Home Screen
          </p>
          <p id="install-banner-desc" className="text-xs text-slate-500 truncate">
            {description}
          </p>
        </div>
        <Button
          ref={installButtonRef}
          size="sm"
          onClick={handleInstall}
          aria-label={`Install app: ${description}`}
          aria-describedby="install-banner-desc"
          className="bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent text-white shrink-0 rounded-xl gap-1 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary0"
        >
          <Download aria-hidden="true" className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Install</span>
        </Button>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss install banner (Escape)"
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary0"
        >
          <X aria-hidden="true" className="w-4 h-4 text-slate-400" />
        </button>
      </div>
    </div>
  );
};

export default InstallBanner;
