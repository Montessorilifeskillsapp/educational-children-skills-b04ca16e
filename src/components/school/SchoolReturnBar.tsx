import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SCHOOL_RETURN_KEY, hasSchoolReturn, schoolReturnTarget } from './navigation';

export { SCHOOL_RETURN_KEY } from './navigation';

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
  const location = useLocation();
  const [params] = useSearchParams();
  if (location.pathname.startsWith('/school') || location.pathname.startsWith('/admin') || location.pathname.startsWith('/auth')) return null;
  const active = params.get('from') === 'school' || hasSchoolReturn();
  if (!active) return null;
  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border px-4 py-2 print:hidden">
      <Button variant="ghost" size="sm" onClick={() => navigate(schoolReturnTarget())}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Return to School Portal
      </Button>
    </div>
  );
}
