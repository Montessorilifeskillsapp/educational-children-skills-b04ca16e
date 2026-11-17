import { Globe, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LANGUAGES } from '@/i18n';
import { cn } from '@/lib/utils';

export default function LanguageSelector({ className, showLabel = false }: { className?: string; showLabel?: boolean }) {
  const { i18n, t } = useTranslation();
  const current = LANGUAGES.find((l) => l.code === i18n.resolvedLanguage) ?? LANGUAGES[0];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={cn('gap-1.5 px-2 text-muted-foreground hover:text-primary', className)} aria-label={`${t('common.language')}: ${current.label}`}>
          <Globe className="w-4 h-4" aria-hidden="true" />
          <span className="text-xs font-medium">{showLabel ? current.label : current.short}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[80] min-w-[10rem]">
        {LANGUAGES.map((l) => (
          <DropdownMenuItem key={l.code} lang={l.code} onSelect={() => void i18n.changeLanguage(l.code)} className="justify-between">
            {l.label}
            {l.code === current.code && <Check className="w-4 h-4 text-primary" aria-hidden="true" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
