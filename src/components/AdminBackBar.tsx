import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Persistent escape hatch for admin screens.
 * Native WebViews have no browser chrome, so every admin page needs an
 * explicit way back to the app.
 */
const AdminBackBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminHome = location.pathname === '/admin';

  return (
    <div className="flex items-center gap-2 mb-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => (isAdminHome ? navigate('/') : navigate('/admin'))}
        className="gap-1.5"
      >
        <ArrowLeft className="w-4 h-4" />
        {isAdminHome ? 'Back to app' : 'Admin'}
      </Button>
      {!isAdminHome && (
        <Button asChild variant="ghost" size="sm" className="gap-1.5">
          <Link to="/">
            <Home className="w-4 h-4" />
            Home
          </Link>
        </Button>
      )}
    </div>
  );
};

export default AdminBackBar;
