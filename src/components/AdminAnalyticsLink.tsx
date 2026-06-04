import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';

const AdminAnalyticsLink: React.FC = () => {
  const { user } = useAuthContext();
  const [isAdmin, setIsAdmin] = useState(false);

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

  if (!isAdmin) return null;

  return (
    <Link
      to="/admin/analytics"
      className="fixed bottom-4 right-4 z-50"
      aria-label="Admin Analytics"
    >
      <Button size="sm" variant="outline" className="shadow-lg bg-background/90 backdrop-blur border-destructive/40">
        <BarChart3 className="w-4 h-4 mr-2" />
        Admin
      </Button>
    </Link>
  );
};

export default AdminAnalyticsLink;

