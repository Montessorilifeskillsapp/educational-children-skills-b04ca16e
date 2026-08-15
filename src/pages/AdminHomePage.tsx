import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { BarChart3, KeyRound, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/components/AuthProvider';
import LoadingSpinner from '@/components/LoadingSpinner';

const links = [
  {
    to: '/admin/access-codes',
    title: 'Access Codes',
    description: 'Create, share and revoke free full-access codes.',
    icon: KeyRound,
  },
  {
    to: '/admin/analytics',
    title: 'Analytics',
    description: 'Signup, paywall and subscription funnel stats.',
    icon: BarChart3,
  },
  {
    to: '/admin/leads',
    title: 'Leads',
    description: 'Captured emails and consultation enquiries.',
    icon: Users,
  },
];

const AdminHomePage = () => {
  const { user, loading: authLoading } = useAuthContext();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (authLoading) return;
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
  }, [user, authLoading]);

  if (authLoading || isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAdmin) return <Navigate to="/admin/verify" replace />;

  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Admin</h1>
        <p className="text-muted-foreground">Choose an admin area.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {links.map(({ to, title, description, icon: Icon }) => (
          <Link key={to} to={to} className="block">
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                <Icon className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">{title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{description}</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminHomePage;
