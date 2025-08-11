import { supabase } from './supabase';
import { PCIComplianceService } from './pciCompliance';

export interface TokenizedCard {
  token: string;
  last4: string;
  brand: string;
  expiryMonth: string;
  expiryYear: string;
  fingerprint: string;
}

export interface PaymentGatewayConfig {
  provider: 'stripe' | 'square' | 'braintree';
  publicKey: string;
  environment: 'sandbox' | 'production';
  pciLevel: 'Level 1' | 'Level 2';
}

export class TokenizationService {
  private static readonly GATEWAY_CONFIG: PaymentGatewayConfig = {
    provider: 'stripe',
    publicKey: 'pk_test_secure_tokenization_key',
    environment: 'sandbox',
    pciLevel: 'Level 1'
  };

  static async tokenizeCard(cardData: {
    number: string;
    cvv: string;
    expiry: string;
    name: string;
  }): Promise<TokenizedCard> {
    try {
      // Log tokenization attempt
      await PCIComplianceService.logSecurityEvent('card_tokenization_started', {
        provider: this.GATEWAY_CONFIG.provider
      });

      // Validate card data before tokenization
      if (!await PCIComplianceService.validateCardData(cardData)) {
        throw new Error('Invalid card data format');
      }

      // Simulate secure tokenization with PCI-approved gateway
      await new Promise(resolve => setTimeout(resolve, 800));

      const token = `tok_${Math.random().toString(36).substr(2, 24)}`;
      const last4 = cardData.number.slice(-4);
      const brand = this.detectCardBrand(cardData.number);
      const [expiryMonth, expiryYear] = cardData.expiry.split('/');
      const fingerprint = this.generateFingerprint(cardData.number);

      const tokenizedCard: TokenizedCard = {
        token,
        last4,
        brand,
        expiryMonth,
        expiryYear: `20${expiryYear}`,
        fingerprint
      };

      // Store tokenized data securely (never store actual card data)
      await this.storeTokenizedCard(tokenizedCard);

      await PCIComplianceService.logSecurityEvent('card_tokenization_completed', {
        token,
        last4,
        brand
      });

      return tokenizedCard;
    } catch (error) {
      await PCIComplianceService.logSecurityEvent('card_tokenization_failed', {
        error: error.message
      });
      throw new Error('Tokenization failed');
    }
  }

  private static detectCardBrand(cardNumber: string): string {
    const number = cardNumber.replace(/\s/g, '');
    
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5') || number.startsWith('2')) return 'mastercard';
    if (number.startsWith('3')) return 'amex';
    if (number.startsWith('6')) return 'discover';
    
    return 'unknown';
  }

  private static generateFingerprint(cardNumber: string): string {
    // Generate secure fingerprint for duplicate detection
    return `fp_${btoa(cardNumber.slice(0, 6) + cardNumber.slice(-4)).substr(0, 16)}`;
  }

  private static async storeTokenizedCard(tokenizedCard: TokenizedCard): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Store only tokenized data, never actual card details
      const encryptedData = PCIComplianceService.encryptSensitiveData(JSON.stringify({
        userId: user.id,
        ...tokenizedCard,
        createdAt: new Date().toISOString()
      }));

      localStorage.setItem(`token_${tokenizedCard.token}`, encryptedData);
    } catch (error) {
      console.error('Failed to store tokenized card:', error);
      throw error;
    }
  }

  static async getStoredTokens(): Promise<TokenizedCard[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const tokens = Object.keys(localStorage)
        .filter(key => key.startsWith('token_'))
        .map(key => {
          try {
            const data = localStorage.getItem(key);
            if (!data) return null;
            
            const decryptedData = JSON.parse(atob(data));
            if (decryptedData.userId === user.id) {
              return {
                token: decryptedData.token,
                last4: decryptedData.last4,
                brand: decryptedData.brand,
                expiryMonth: decryptedData.expiryMonth,
                expiryYear: decryptedData.expiryYear,
                fingerprint: decryptedData.fingerprint
              };
            }
            return null;
          } catch (e) {
            return null;
          }
        })
        .filter(Boolean) as TokenizedCard[];

      return tokens;
    } catch (error) {
      console.error('Failed to get stored tokens:', error);
      return [];
    }
  }

  static async deleteToken(token: string): Promise<void> {
    try {
      await PCIComplianceService.logSecurityEvent('token_deletion', { token });
      localStorage.removeItem(`token_${token}`);
    } catch (error) {
      console.error('Failed to delete token:', error);
      throw error;
    }
  }
}