import { useContext } from 'react';
import { useMobileSecurity } from '../components/MobileSecurityProvider';
import { SecureNetworkManager } from '../lib/mobileNetworking';

export const useSecureNetworking = () => {
  const { securityManager, validateConnection } = useMobileSecurity();
  
  const secureNetworkManager = new SecureNetworkManager(securityManager);

  const makeSecureRequest = async (url: string, options?: RequestInit) => {
    // Validate connection before making request
    const isConnectionValid = await validateConnection(url);
    if (!isConnectionValid) {
      throw new Error('Certificate pinning validation failed');
    }

    return secureNetworkManager.secureRequest({
      url,
      method: (options?.method as any) || 'GET',
      headers: options?.headers as Record<string, string>,
      body: options?.body as string,
    });
  };

  const secureGet = (url: string, headers?: Record<string, string>) => {
    return secureNetworkManager.secureGet(url, headers);
  };

  const securePost = (url: string, body: string, headers?: Record<string, string>) => {
    return secureNetworkManager.securePost(url, body, headers);
  };

  return {
    makeSecureRequest,
    secureGet,
    securePost,
    validateConnection,
  };
};

export const useCodeSigning = () => {
  const { securityManager, verifyAppIntegrity } = useMobileSecurity();

  const verifySignature = async (payload: string, signature: string) => {
    return securityManager.verifyCodeSignature(payload, signature);
  };

  const checkAppIntegrity = async () => {
    return verifyAppIntegrity();
  };

  return {
    verifySignature,
    checkAppIntegrity,
  };
};