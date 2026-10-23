import { Button } from '@/components/ui/button';
import { ROLE_LABEL, type SchoolRole } from './api';

interface Props { role: SchoolRole; canRecord: boolean; previewing: boolean; onExitPreview: () => void }

export default function RoleBanner({ role, previewing, onExitPreview }: Props) {
  if (!previewing) return null;
  return (
    <div role="status" className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 text-sm text-muted-foreground print:hidden">
      <span>{ROLE_LABEL[role]} preview · Read only</span>
      <Button size="sm" variant="ghost" className="text-foreground" onClick={onExitPreview}>Back to School Admin</Button>
    </div>
  );
}
