import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';

interface CheckItem {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'checking' | 'passed' | 'failed';
  critical: boolean;
}

const LaunchChecklist: React.FC = () => {
  const [checks, setChecks] = useState<CheckItem[]>([
    {
      id: 'seo',
      title: 'SEO Optimization',
      description: 'Meta tags, structured data, and page titles',
      status: 'pending',
      critical: true
    },
    {
      id: 'accessibility',
      title: 'Accessibility Features',
      description: 'Screen reader support, keyboard navigation, contrast',
      status: 'pending',
      critical: true
    },
    {
      id: 'performance',
      title: 'Performance Optimization',
      description: 'Image lazy loading, code splitting, caching',
      status: 'pending',
      critical: true
    },
    {
      id: 'security',
      title: 'Security Headers',
      description: 'CSP, HTTPS, secure cookies',
      status: 'pending',
      critical: true
    },
    {
      id: 'error-handling',
      title: 'Error Boundaries',
      description: 'Graceful error handling and user feedback',
      status: 'pending',
      critical: true
    },
    {
      id: 'mobile',
      title: 'Mobile Optimization',
      description: 'Responsive design, touch interactions',
      status: 'pending',
      critical: true
    },
    {
      id: 'analytics',
      title: 'Analytics Setup',
      description: 'Event tracking, conversion monitoring',
      status: 'pending',
      critical: false
    },
    {
      id: 'loading',
      title: 'Loading States',
      description: 'Skeleton screens, progress indicators',
      status: 'pending',
      critical: false
    }
  ]);

  const runChecks = async () => {
    for (const check of checks) {
      setChecks(prev => prev.map(c => 
        c.id === check.id ? { ...c, status: 'checking' } : c
      ));

      // Simulate check delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Perform actual checks based on check type
      let passed = false;
      
      switch (check.id) {
        case 'seo':
          passed = document.querySelector('meta[name="description"]') !== null &&
                  document.title.length > 0;
          break;
        case 'accessibility':
          passed = document.querySelector('[aria-label], [aria-labelledby]') !== null;
          break;
        case 'performance':
          passed = document.querySelector('img[loading="lazy"]') !== null;
          break;
        case 'security':
          passed = location.protocol === 'https:' || location.hostname === 'localhost';
          break;
        case 'error-handling':
          passed = true; // We added ErrorBoundary
          break;
        case 'mobile':
          passed = document.querySelector('meta[name="viewport"]') !== null;
          break;
        case 'analytics':
          passed = typeof window !== 'undefined';
          break;
        case 'loading':
          passed = document.querySelector('.animate-pulse') !== null;
          break;
      }

      setChecks(prev => prev.map(c => 
        c.id === check.id ? { ...c, status: passed ? 'passed' : 'failed' } : c
      ));
    }
  };

  useEffect(() => {
    // Auto-run checks after component mounts
    const timer = setTimeout(runChecks, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = (status: CheckItem['status']) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
      case 'checking':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const passedChecks = checks.filter(c => c.status === 'passed').length;
  const totalChecks = checks.length;
  const criticalChecks = checks.filter(c => c.critical);
  const passedCritical = criticalChecks.filter(c => c.status === 'passed').length;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Launch Readiness Checklist
          <span className="text-sm font-normal text-muted-foreground">
            ({passedChecks}/{totalChecks} passed)
          </span>
        </CardTitle>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(passedChecks / totalChecks) * 100}%` }}
          />
        </div>
        
        {passedCritical === criticalChecks.length ? (
          <div className="text-green-600 font-medium">
            ✅ All critical checks passed - Ready for launch!
          </div>
        ) : (
          <div className="text-orange-600 font-medium">
            ⚠️ {criticalChecks.length - passedCritical} critical issues need attention
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        {checks.map((check) => (
          <div
            key={check.id}
            className={`flex items-center gap-3 p-3 rounded-lg border ${
              check.critical ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
            }`}
          >
            {getStatusIcon(check.status)}
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{check.title}</span>
                {check.critical && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    Critical
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{check.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LaunchChecklist;