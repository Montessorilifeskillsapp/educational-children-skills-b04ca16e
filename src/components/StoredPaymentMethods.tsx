import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CreditCard, Trash2, Shield } from 'lucide-react';
import { PaymentService } from '../lib/payments';
import { TokenizedCard } from '../lib/tokenization';

interface StoredPaymentMethodsProps {
  onSelectMethod?: (token: string) => void;
  selectedToken?: string;
}

export function StoredPaymentMethods({ onSelectMethod, selectedToken }: StoredPaymentMethodsProps) {
  const [paymentMethods, setPaymentMethods] = useState<TokenizedCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  const loadPaymentMethods = async () => {
    try {
      const methods = await PaymentService.getStoredPaymentMethods();
      setPaymentMethods(methods);
    } catch (error) {
      console.error('Failed to load payment methods:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (token: string) => {
    try {
      await PaymentService.deletePaymentMethod(token);
      setPaymentMethods(prev => prev.filter(method => method.token !== token));
    } catch (error) {
      console.error('Failed to delete payment method:', error);
    }
  };

  const getBrandIcon = (brand: string) => {
    const brandColors = {
      visa: 'text-blue-600',
      mastercard: 'text-red-600',
      amex: 'text-green-600',
      discover: 'text-orange-600'
    };
    return brandColors[brand as keyof typeof brandColors] || 'text-gray-600';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Stored Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[1, 2].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Stored Payment Methods
          <Badge variant="secondary" className="ml-2">
            PCI Tokenized
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {paymentMethods.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No saved payment methods
          </p>
        ) : (
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.token}
                className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedToken === method.token
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onSelectMethod?.(method.token)}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className={`h-5 w-5 ${getBrandIcon(method.brand)}`} />
                  <div>
                    <div className="font-medium">
                      {method.brand.toUpperCase()} •••• {method.last4}
                    </div>
                    <div className="text-sm text-gray-500">
                      Expires {method.expiryMonth}/{method.expiryYear}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(method.token);
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}