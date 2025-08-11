import { Shield, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const SSLStatus = () => {
  const isSecure = window.location.protocol === 'https:';
  const isDevelopment = import.meta.env.DEV;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          {isSecure ? (
            <ShieldCheck className="h-4 w-4 text-green-600" />
          ) : (
            <Shield className="h-4 w-4 text-yellow-600" />
          )}
          Connection Security
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Protocol:</span>
          <Badge variant={isSecure ? "default" : "secondary"}>
            {window.location.protocol.toUpperCase()}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Environment:</span>
          <Badge variant={isDevelopment ? "outline" : "default"}>
            {isDevelopment ? "Development" : "Production"}
          </Badge>
        </div>

        {!isSecure && !isDevelopment && (
          <div className="flex items-start gap-2 p-2 bg-yellow-50 rounded-md">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
            <p className="text-xs text-yellow-800">
              This connection is not secure. Consider using HTTPS.
            </p>
          </div>
        )}

        {isSecure && (
          <div className="flex items-start gap-2 p-2 bg-green-50 rounded-md">
            <ShieldCheck className="h-4 w-4 text-green-600 mt-0.5" />
            <p className="text-xs text-green-800">
              Your connection is secure and encrypted.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};