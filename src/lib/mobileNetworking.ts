import { MobileSecurityManager } from './mobileSecurity';

export interface SecureRequestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: string;
  timeout?: number;
  validateCertificate?: boolean;
}

export class SecureNetworkManager {
  private securityManager: MobileSecurityManager;
  private defaultTimeout = 30000; // 30 seconds

  constructor(securityManager: MobileSecurityManager) {
    this.securityManager = securityManager;
  }

  async secureRequest(config: SecureRequestConfig): Promise<Response> {
    const { url, method, headers = {}, body, timeout = this.defaultTimeout, validateCertificate = true } = config;

    // Certificate pinning validation
    if (validateCertificate) {
      const hostname = new URL(url).hostname;
      const isValidCert = await this.validateServerCertificate(hostname);
      if (!isValidCert) {
        throw new Error('Certificate pinning validation failed');
      }
    }

    // Add security headers
    const secureHeaders = {
      ...headers,
      'X-Requested-With': 'XMLHttpRequest',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    };

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        method,
        headers: secureHeaders,
        body,
        signal: controller.signal,
        credentials: 'same-origin',
        mode: 'cors',
      });

      clearTimeout(timeoutId);

      // Validate response integrity
      await this.validateResponseIntegrity(response.clone());

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private async validateServerCertificate(hostname: string): Promise<boolean> {
    try {
      // In a real mobile app, this would extract the actual certificate from the TLS handshake
      // For web context, we simulate certificate validation
      const mockCertificate = await this.getMockCertificate(hostname);
      return await this.securityManager.validateCertificate(hostname, mockCertificate);
    } catch (error) {
      console.error('Certificate validation error:', error);
      return false;
    }
  }

  private async getMockCertificate(hostname: string): Promise<string> {
    // In production, this would be the actual certificate from the server
    return `-----BEGIN CERTIFICATE-----
MIIBkTCB+wIJAKHHH4HHH4HHHMA0GCSqGSIb3DQEBCwUAMBQxEjAQBgNVBAMMCWxvY2FsaG9zdDAeFw0yMzEwMTAwMDAwMDBaFw0yNDEwMDkwMDAwMDBaMBQxEjAQBgNVBAMMCWxvY2FsaG9zdDBcMA0GCSqGSIb3DQEBAQUAA0sAMEgCQQDTgvwjlRHZ...
-----END CERTIFICATE-----`;
  }

  private async validateResponseIntegrity(response: Response): Promise<void> {
    // Check for expected security headers
    const securityHeaders = [
      'strict-transport-security',
      'x-content-type-options',
      'x-frame-options',
    ];

    for (const header of securityHeaders) {
      if (!response.headers.get(header)) {
        console.warn(`Missing security header: ${header}`);
      }
    }

    // Validate content type
    const contentType = response.headers.get('content-type');
    if (contentType && !this.isAllowedContentType(contentType)) {
      throw new Error(`Disallowed content type: ${contentType}`);
    }
  }

  private isAllowedContentType(contentType: string): boolean {
    const allowedTypes = [
      'application/json',
      'text/html',
      'text/plain',
      'application/javascript',
      'text/css',
      'image/',
    ];

    return allowedTypes.some(type => contentType.startsWith(type));
  }

  // Secure API wrapper methods
  async secureGet(url: string, headers?: Record<string, string>): Promise<Response> {
    return this.secureRequest({ url, method: 'GET', headers });
  }

  async securePost(url: string, body: string, headers?: Record<string, string>): Promise<Response> {
    return this.secureRequest({ 
      url, 
      method: 'POST', 
      body, 
      headers: { 'Content-Type': 'application/json', ...headers } 
    });
  }
}