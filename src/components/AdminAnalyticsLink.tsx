import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';

const AdminAnalyticsLink: React.FC = () => {
  const { user } = useAuthContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    const checkAdmin = async () => {
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();
      setIsAdmin(!!data);
    };

    checkAdmin();
  }, [user]);

  if (!isAdmin || pathname.startsWith('/school')) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 items-end">
      <Link to="/admin/access-codes" aria-label="Platform Access Codes">
        <Button size="sm" variant="outline" className="shadow-lg bg-background/90 backdrop-blur border-destructive/40">
          <KeyRound className="w-4 h-4 mr-2" />
          Platform Access Codes
        </Button>
      </Link>
      <Link to="/admin" aria-label="Platform Admin (App Owner)">
        <Button size="sm" variant="outline" className="shadow-lg bg-background/90 backdrop-blur border-destructive/40">
          <BarChart3 className="w-4 h-4 mr-2" />
          Platform Admin (App Owner)
        </Button>
      </Link>
    </div>
  );

};

export default AdminAnalyticsLink;

