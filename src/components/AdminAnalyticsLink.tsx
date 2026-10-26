import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { BarChart3, KeyRound, School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { schoolCall, type Membership } from '@/components/school/api';
import { cacheMemberships, preloadPortal, setPortalOwner } from '@/components/school/portalCache';
import { fetchSchoolData } from '@/components/school/useSchoolData';
import { hasSchoolReturn } from '@/components/school/navigation';

const AdminAnalyticsLink: React.FC = () => {
  const { user } = useAuthContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSchoolStaff, setIsSchoolStaff] = useState(false);
  const { pathname } = useLocation();
  const [params] = useSearchParams();

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [user]);

  useEffect(() => {
    setIsSchoolStaff(false);
    setPortalOwner(user?.id ?? null);
    if (!user) return;
    let cancelled = false;
    let warmed = false;
    const refresh = async () => {
      if (!navigator.onLine) return;
      try {
        // Accepts matching pending invitations server-side, then returns memberships.
        const r = await schoolCall<{ memberships: Membership[] }>({ action: 'me' });
        if (cancelled) return;
        const ms = r.memberships ?? [];
        cacheMemberships(user.id, ms);
        setIsSchoolStaff(!!ms.length);
        // Get the portal ready in the background so opening it is instant.
        if (ms.length && !warmed) {
          warmed = true;
          void preloadPortal();
          void fetchSchoolData(ms[0].school_id).catch(() => {});
        }
      } catch { /* keep current state */ }
    };
    void refresh();
    window.addEventListener('focus', refresh);
    window.addEventListener('online', refresh);
    return () => {
      cancelled = true;
      window.removeEventListener('focus', refresh);
      window.removeEventListener('online', refresh);
    };
  }, [user?.id]);

  if (pathname.startsWith('/school') || pathname.startsWith('/auth')) return null;
  // The Return to School Portal bar already occupies this corner.
  const returnBarShown = params.get('from') === 'school' || hasSchoolReturn();
  const showSchool = isSchoolStaff && !returnBarShown;
  if (!isAdmin && !showSchool) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 items-end print:hidden">
      {showSchool && (
        <Link to="/school" aria-label="School Portal">
          <Button size="sm" className="shadow-lg">
            <School className="w-4 h-4 mr-2" />
            School Portal
          </Button>
        </Link>
      )}
      {isAdmin && (
        <>
          <Link to="/admin/access-codes" aria-label="Access Codes">
            <Button size="sm" variant="outline" className="shadow-lg bg-background/90 backdrop-blur border-destructive/40">
              <KeyRound className="w-4 h-4 mr-2" />
              Access Codes
            </Button>
          </Link>
          <Link to="/admin" aria-label="Admin">
            <Button size="sm" variant="outline" className="shadow-lg bg-background/90 backdrop-blur border-destructive/40">
              <BarChart3 className="w-4 h-4 mr-2" />
              Admin
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default AdminAnalyticsLink;
