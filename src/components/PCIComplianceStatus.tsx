import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { PCIComplianceService, PCIComplianceStatus } from '@/lib/pciCompliance';

const PCIComplianceStatusComponent: React.FC = () => {
  const [complianceStatus, setComplianceStatus] = useState<PCIComplianceStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComplianceStatus = async () => {
      try {
        const status = await PCIComplianceService.getComplianceStatus();
        setComplianceStatus(status);
      } catch (error) {
        console.error('Failed to load compliance status:', error);
      } finally {
        setLoading(false);
      }
    };

    loadComplianceStatus();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!complianceStatus) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            Unable to load compliance status
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Met':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'In Progress':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const metRequirements = complianceStatus.requirements.filter(r => r.status === 'Met').length;
  const totalRequirements = complianceStatus.requirements.length;
  const compliancePercentage = (metRequirements / totalRequirements) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          PCI DSS Compliance Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{complianceStatus.level}</div>
            <div className="text-sm text-gray-600">Compliance Level</div>
          </div>
          <Badge className={getStatusColor(complianceStatus.status)}>
            {complianceStatus.status}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Requirements Met</span>
            <span>{metRequirements}/{totalRequirements}</span>
          </div>
          <Progress value={compliancePercentage} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium">Last Audit</div>
            <div className="text-gray-600">{complianceStatus.lastAudit}</div>
          </div>
          <div>
            <div className="font-medium">Next Audit</div>
            <div className="text-gray-600">{complianceStatus.nextAudit}</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="font-medium text-sm">Key Requirements</div>
          <div className="space-y-1">
            {complianceStatus.requirements.slice(0, 6).map((req) => (
              <div key={req.id} className="flex items-center gap-2 text-sm">
                {getStatusIcon(req.status)}
                <span className="flex-1">{req.name}</span>
                <Badge variant="outline" className="text-xs">
                  {req.category}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PCIComplianceStatusComponent;