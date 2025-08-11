import React, { createContext, useContext, useEffect, useState } from 'react';
import { MobileSecurityManager } from '../lib/mobileSecurity';

interface SecurityStatus {
  certificatePinningEnabled: boolean;
  codeSigningVerified: boolean;
  secureConnectionEstablished: boolean;
  lastSecurityCheck: Date | null;
}

interface MobileSecurityContextType {
  securityManager: MobileSecurityManager;
  securityStatus: SecurityStatus;
  validateConnection: (url: string) => Promise<boolean>;
  verifyAppIntegrity: () => Promise<boolean>;
}

const MobileSecurityContext = createContext<MobileSecurityContextType | undefined>(undefined);

export const useMobileSecurity = () => {
  const context = useContext(MobileSecurityContext);
  if (!context) {
    throw new Error('useMobileSecurity must be used within a MobileSecurityProvider');
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}

export const MobileSecurityProvider: React.FC<Props> = ({ children }) => {
  const [securityManager] = useState(() => new MobileSecurityManager());
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus>({
    certificatePinningEnabled: false,
    codeSigningVerified: false,
    secureConnectionEstablished: false,
    lastSecurityCheck: null,
  });

  useEffect(() => {
    initializeSecurity();
  }, []);

  const initializeSecurity = async () => {
    try {
      // Verify app integrity on startup
      const integrityVerified = await verifyAppIntegrity();
      
      setSecurityStatus(prev => ({
        ...prev,
        certificatePinningEnabled: true,
        codeSigningVerified: integrityVerified,
        lastSecurityCheck: new Date(),
      }));

      // Set up periodic security checks
      setInterval(performSecurityCheck, 300000); // Every 5 minutes
    } catch (error) {
      console.error('Security initialization failed:', error);
    }
  };

  const validateConnection = async (url: string): Promise<boolean> => {
    try {
      const hostname = new URL(url).hostname;
      
      // In a real mobile app, you would get the actual certificate
      // For web context, we simulate certificate validation
      const mockCertificate = `-----BEGIN CERTIFICATE-----
MIIBkTCB+wIJAKHHH4HHH4HHHMA0GCSqGSIb3DQEBCwUAMBQxEjAQBgNVBAMMCWxvY2FsaG9zdDAeFw0yMzEwMTAwMDAwMDBaFw0yNDEwMDkwMDAwMDBaMBQxEjAQBgNVBAMMCWxvY2FsaG9zdDBcMA0GCSqGSIb3DQEBAQUAA0sAMEgCQQDTgvwjlRHZ...
-----END CERTIFICATE-----`;

      const isValid = await securityManager.validateCertificate(hostname, mockCertificate);
      
      setSecurityStatus(prev => ({
        ...prev,
        secureConnectionEstablished: isValid,
        lastSecurityCheck: new Date(),
      }));

      return isValid;
    } catch (error) {
      console.error('Connection validation failed:', error);
      return false;
    }
  };

  const verifyAppIntegrity = async (): Promise<boolean> => {
    try {
      // In a real mobile app, this would verify the app signature
      // For web context, we simulate integrity verification
      const appManifest = JSON.stringify({
        name: 'Montessori Life Skills',
        version: '1.0.0',
        timestamp: Date.now(),
      });

      const mockSignature = 'base64EncodedSignature...';
      
      const isVerified = await securityManager.verifyCodeSignature(appManifest, mockSignature);
      
      return isVerified;
    } catch (error) {
      console.error('App integrity verification failed:', error);
      return false;
    }
  };

  const performSecurityCheck = async () => {
    try {
      const integrityCheck = await verifyAppIntegrity();
      
      setSecurityStatus(prev => ({
        ...prev,
        codeSigningVerified: integrityCheck,
        lastSecurityCheck: new Date(),
      }));
    } catch (error) {
      console.error('Periodic security check failed:', error);
    }
  };

  const contextValue: MobileSecurityContextType = {
    securityManager,
    securityStatus,
    validateConnection,
    verifyAppIntegrity,
  };

  return (
    <MobileSecurityContext.Provider value={contextValue}>
      {children}
    </MobileSecurityContext.Provider>
  );
};