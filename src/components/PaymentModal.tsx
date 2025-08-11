import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Lock, Shield, Plus } from 'lucide-react';
import { useCart } from './CartContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { PaymentService, SecureCardData } from '@/lib/payments';
import { PCIComplianceService } from '@/lib/pciCompliance';
import { TokenizationService } from '@/lib/tokenization';
import { StoredPaymentMethods } from './StoredPaymentMethods';
import { ThreeDSecureModal } from './ThreeDSecureModal';
import { ThreeDSecureResult } from '@/lib/threeDSecure';
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  planId?: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  planId 
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedToken, setSelectedToken] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'new' | 'stored'>('stored');
  const [show3DS, setShow3DS] = useState(false);
  const [currentToken, setCurrentToken] = useState<string>('');
  const [currentPaymentIntent, setCurrentPaymentIntent] = useState<string>('');
  const [cardData, setCardData] = useState<SecureCardData>({
    number: '',
    cvv: '',
    expiry: '',
    name: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { items, total, clearCart } = useCart();
  const { currentPlan, plans } = useSubscription();
  
  const selectedPlan = planId ? plans.find(p => p.id === planId) : currentPlan;
  const displayPrice = selectedPlan ? selectedPlan.price : total;

  const validateCardData = async () => {
    const newErrors: Record<string, string> = {};
    
    if (!cardData.number || cardData.number.replace(/\s/g, '').length < 13) {
      newErrors.number = 'Valid card number required';
    }
    
    if (!cardData.cvv || cardData.cvv.length < 3) {
      newErrors.cvv = 'Valid CVV required';
    }
    
    if (!cardData.expiry || !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(cardData.expiry)) {
      newErrors.expiry = 'Valid expiry date required (MM/YY)';
    }
    
    if (!cardData.name.trim()) {
      newErrors.name = 'Cardholder name required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate payment method selection
    if (paymentMethod === 'stored' && !selectedToken) {
      alert('Please select a stored payment method or add a new card');
      return;
    }
    
    if (paymentMethod === 'new' && !await validateCardData()) {
      return;
    }

    setLoading(true);
    try {
      await PCIComplianceService.logSecurityEvent('tokenized_payment_initiated', {
        planId: selectedPlan?.id || 'cart',
        amount: displayPrice,
        method: paymentMethod
      });

      const paymentIntent = await PaymentService.createPaymentIntent({
        planId: selectedPlan?.id || 'cart',
        amount: Math.round(displayPrice * 100),
        currency: 'usd'
      });

      // Determine token to use
      const tokenToUse = paymentMethod === 'stored' ? selectedToken : 
        (await TokenizationService.tokenizeCard(cardData)).token;

      // Store payment context for 3DS
      setCurrentToken(tokenToUse);
      setCurrentPaymentIntent(paymentIntent.id);

      // Initiate 3D Secure authentication
      setShow3DS(true);
      setLoading(false);
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please verify your card details and try again.');
      setLoading(false);
    }
  };

  const handle3DSAuthenticated = async (result: ThreeDSecureResult) => {
    try {
      setLoading(true);
      
      const success = await PaymentService.confirmPaymentWithToken(
        currentPaymentIntent,
        currentToken,
        result
      );
      
      if (success) {
        await PCIComplianceService.logSecurityEvent('payment_completed_successfully', {
          paymentIntentId: currentPaymentIntent,
          threeDSAuthenticated: true
        });
        
        if (!selectedPlan) clearCart();
        onSuccess();
        onClose();
      } else {
        throw new Error('Payment processing failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed after 3D Secure authentication.');
    } finally {
      setLoading(false);
      setShow3DS(false);
    }
  };

  const handle3DSFailed = () => {
    setShow3DS(false);
    setLoading(false);
    alert('3D Secure authentication failed. Please try again.');
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              PCI DSS Secure Payment
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-green-800">
                  <Lock className="w-4 h-4" />
                  <span>PCI DSS Level 1 Compliant - 3D Secure Enabled</span>
                </div>
              </CardContent>
            </Card>
          <Tabs value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'new' | 'stored')} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="stored" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Stored Cards
              </TabsTrigger>
              <TabsTrigger value="new" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Card
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stored" className="space-y-4">
              <StoredPaymentMethods 
                onSelectMethod={setSelectedToken}
                selectedToken={selectedToken}
              />
            </TabsContent>

            <TabsContent value="new" className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.number}
                  onChange={(e) => setCardData(prev => ({ 
                    ...prev, 
                    number: formatCardNumber(e.target.value) 
                  }))}
                  maxLength={19}
                  className={errors.number ? 'border-red-500' : ''}
                />
                {errors.number && <p className="text-sm text-red-500 mt-1">{errors.number}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length >= 2) {
                        value = value.substring(0, 2) + '/' + value.substring(2, 4);
                      }
                      setCardData(prev => ({ ...prev, expiry: value }));
                    }}
                    maxLength={5}
                    className={errors.expiry ? 'border-red-500' : ''}
                  />
                  {errors.expiry && <p className="text-sm text-red-500 mt-1">{errors.expiry}</p>}
                </div>
                
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    type="password"
                    value={cardData.cvv}
                    onChange={(e) => setCardData(prev => ({ 
                      ...prev, 
                      cvv: e.target.value.replace(/\D/g, '') 
                    }))}
                    maxLength={4}
                    className={errors.cvv ? 'border-red-500' : ''}
                  />
                  {errors.cvv && <p className="text-sm text-red-500 mt-1">{errors.cvv}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  value={cardData.name}
                  onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
              </div>
            </TabsContent>
          </Tabs>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Amount:</span>
                <span className="text-xl font-bold">${displayPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={loading}
              >
                {loading ? 'Processing...' : `Pay $${displayPrice.toFixed(2)}`}
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 justify-center">
              <Shield className="w-4 h-4" />
              <span>3D Secure • 256-bit SSL • PCI DSS compliant</span>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ThreeDSecureModal
        isOpen={show3DS}
        onClose={() => setShow3DS(false)}
        cardToken={currentToken}
        amount={displayPrice}
        currency="USD"
        onAuthenticated={handle3DSAuthenticated}
        onFailed={handle3DSFailed}
      />
    </>
  );
};

export default PaymentModal;