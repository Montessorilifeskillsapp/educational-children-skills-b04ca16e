import React from 'react';
import { Shield, ShieldCheck, ShieldAlert, Wifi, WifiOff } from 'lucide-react';
import { useMobileSecurity } from './MobileSecurityProvider';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export const SecurityStatusIndicator: React.FC = () => {
  const { securityStatus } = useMobileSecurity();

  const getSecurityLevel = () => {
    const { certificatePinningEnabled, codeSigningVerified, secureConnectionEstablished } = securityStatus;
    
    if (certificatePinningEnabled && codeSigningVerified && secureConnectionEstablished) {
      return { level: 'high', color: 'bg-green-500', icon: ShieldCheck, text: 'Secure' };
    } else if (certificatePinningEnabled && codeSigningVerified) {
      return { level: 'medium', color: 'bg-yellow-500', icon: Shield, text: 'Protected' };
    } else {
      return { level: 'low', color: 'bg-red-500', icon: ShieldAlert, text: 'Vulnerable' };
    }
  };

  const security = getSecurityLevel();
  const SecurityIcon = security.icon;

  return (
    <TooltipProvider>
      <div className="flex items-center space-x-2">
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${security.color}`} />
              <SecurityIcon className="w-4 h-4 text-gray-600" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <Card className="w-64">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Security Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs">Certificate Pinning</span>
                  <Badge variant={securityStatus.certificatePinningEnabled ? "default" : "destructive"}>
                    {securityStatus.certificatePinningEnabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Code Signing</span>
                  <Badge variant={securityStatus.codeSigningVerified ? "default" : "destructive"}>
                    {securityStatus.codeSigningVerified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Secure Connection</span>
                  {securityStatus.secureConnectionEstablished ? (
                    <Wifi className="w-4 h-4 text-green-500" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-red-500" />
                  )}
                </div>
                {securityStatus.lastSecurityCheck && (
                  <div className="text-xs text-gray-500 pt-1 border-t">
                    Last check: {securityStatus.lastSecurityCheck.toLocaleTimeString()}
                  </div>
                )}
              </CardContent>
            </Card>
          </TooltipContent>
        </Tooltip>
        <span className="text-xs text-gray-600">{security.text}</span>
      </div>
    </TooltipProvider>
  );
};