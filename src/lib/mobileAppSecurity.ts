// Mobile App Security Configuration for PWA and WebView contexts
export interface MobileSecurityConfig {
  certificatePinning: {
    enabled: boolean;
    domains: string[];
    backupPins: string[];
  };
  codeIntegrity: {
    enabled: boolean;
    publicKeys: string[];
    algorithms: string[];
  };
  networkSecurity: {
    enforceHttps: boolean;
    allowedDomains: string[];
    blockedDomains: string[];
  };
}

export const MOBILE_SECURITY_CONFIG: MobileSecurityConfig = {
  certificatePinning: {
    enabled: true,
    domains: [
      'api.montessori-life-skills.com',
      'cdn.montessori-life-skills.com',
      'auth.montessori-life-skills.com'
    ],
    backupPins: [
      'sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'sha256/BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB='
    ]
  },
  codeIntegrity: {
    enabled: true,
    publicKeys: [
      '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...\n-----END PUBLIC KEY-----'
    ],
    algorithms: ['RS256', 'ES256']
  },
  networkSecurity: {
    enforceHttps: true,
    allowedDomains: [
      'montessori-life-skills.com',
      'supabase.co',
      'stripe.com'
    ],
    blockedDomains: [
      'malicious-site.com',
      'phishing-site.net'
    ]
  }
};

export class MobileAppSecurityManager {
  private config: MobileSecurityConfig;

  constructor(config: MobileSecurityConfig = MOBILE_SECURITY_CONFIG) {
    this.config = config;
  }

  // Content Security Policy for mobile webviews
  generateCSP(): string {
    const allowedDomains = this.config.networkSecurity.allowedDomains
      .map(domain => `https://*.${domain}`)
      .join(' ');

    return [
      "default-src 'self'",
      `connect-src 'self' ${allowedDomains}`,
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "media-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ');
  }

  // Security headers for mobile requests
  getSecurityHeaders(): Record<string, string> {
    return {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
      'Content-Security-Policy': this.generateCSP()
    };
  }

  // Validate domain against whitelist
  isDomainAllowed(domain: string): boolean {
    if (this.config.networkSecurity.blockedDomains.includes(domain)) {
      return false;
    }

    return this.config.networkSecurity.allowedDomains.some(allowedDomain => 
      domain === allowedDomain || domain.endsWith(`.${allowedDomain}`)
    );
  }

  // Check if URL uses HTTPS
  isSecureUrl(url: string): boolean {
    if (!this.config.networkSecurity.enforceHttps) {
      return true;
    }

    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  }

  // Validate request before sending
  validateRequest(url: string): { valid: boolean; reason?: string } {
    try {
      const urlObj = new URL(url);
      
      if (!this.isSecureUrl(url)) {
        return { valid: false, reason: 'HTTPS required' };
      }

      if (!this.isDomainAllowed(urlObj.hostname)) {
        return { valid: false, reason: 'Domain not allowed' };
      }

      return { valid: true };
    } catch {
      return { valid: false, reason: 'Invalid URL' };
    }
  }
}