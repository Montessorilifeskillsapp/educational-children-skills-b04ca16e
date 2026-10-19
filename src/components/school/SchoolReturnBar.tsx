import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SCHOOL_RETURN_KEY = 'school-return-url';

export function rememberSchoolReturn(url: string) {
  try {
    sessionStorage.setItem(SCHOOL_RETURN_KEY, url);
  } catch {
    /* storage unavailable */
  }
}

/**
 * Shown at the top of an activity page opened from the School Portal
 * (?from=school). Returns staff to the exact portal spot they came from.
 */
export default function SchoolReturnBar() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  if (params.get('from') !== 'school') return null;
  let target = '/school';
  try {
    target = sessionStorage.getItem(SCHOOL_RETURN_KEY) || '/school';
  } catch {
    /* storage unavailable */
  }
  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border px-4 py-2 print:hidden">
      <Button variant="ghost" size="sm" onClick={() => navigate(target)}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Return to School Portal
      </Button>
    </div>
  );
}
