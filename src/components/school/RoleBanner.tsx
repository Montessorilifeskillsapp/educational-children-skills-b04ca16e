import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { ROLE_LABEL, type SchoolRole } from './api';

interface Props { role: SchoolRole; canRecord: boolean; previewing: boolean; onExitPreview: () => void }

export default function RoleBanner({ role, previewing, onExitPreview }: Props) {
  const { t } = useTranslation();
  if (!previewing) return null;
  return (
    <div role="status" className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 text-sm text-muted-foreground print:hidden">
      <span>{t('school.banner.preview', { role: ROLE_LABEL[role] })}</span>
      <Button size="sm" variant="ghost" className="text-foreground" onClick={onExitPreview}>{t('school.banner.back')}</Button>
    </div>
  );
}
