import { useNavigate, useSearchParams } from 'react-router-dom';
import { schoolReturnTarget } from '@/components/school/navigation';

/**
 * Syncs the selected activity with the ?activity= URL parameter so individual
 * activities are deep-linkable (e.g. from the School Portal) and the browser
 * back button steps out of an activity instead of leaving the section.
 */
export function useActivityParam(): [string, (id: string) => void] {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const activity = params.get('activity') ?? '';
  const setActivity = (id: string) => {
    if (!id && params.get('from') === 'school') {
      navigate(schoolReturnTarget());
      return;
    }
    setParams(
      (p) => {
        const n = new URLSearchParams(p);
        if (id) n.set('activity', id);
        else n.delete('activity');
        return n;
      },
      { replace: true }
    );
  };
  return [activity, setActivity];
}
