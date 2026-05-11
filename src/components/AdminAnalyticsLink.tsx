import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminAnalyticsLink: React.FC = () => (
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

export default AdminAnalyticsLink;
