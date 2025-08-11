import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, Shield, CheckCircle, XCircle } from 'lucide-react';
import { ThreeDSecureService, ThreeDSecureChallenge, ThreeDSecureResult } from '../lib/threeDSecure';

interface ThreeDSecureModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardToken: string;
  amount: number;
  currency?: string;
  onAuthenticated: (result: ThreeDSecureResult) => void;
  onFailed: () => void;
}

export function ThreeDSecureModal({
  isOpen,
  onClose,
  cardToken,
  amount,
  currency = 'USD',
  onAuthenticated,
  onFailed
}: ThreeDSecureModalProps) {
  const [challenge, setChallenge] = useState<ThreeDSecureChallenge | null>(null);
  const [authCode, setAuthCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'initiating' | 'challenge' | 'authenticating' | 'completed'>('initiating');

  useEffect(() => {
    if (isOpen && cardToken) {
      initiate3DS();
    }
  }, [isOpen, cardToken]);

  const initiate3DS = async () => {
    try {
      setLoading(true);
      setError(null);
      setStep('initiating');

      const challengeData = await ThreeDSecureService.initiate3DSecure(
        cardToken,
        amount,
        currency
      );

      setChallenge(challengeData);
      setStep('challenge');
    } catch (err) {
      setError('Failed to initiate 3D Secure authentication');
      onFailed();
    } finally {
      setLoading(false);
    }
  };

  const handleAuthenticate = async () => {
    if (!challenge) return;

    try {
      setLoading(true);
      setError(null);
      setStep('authenticating');

      const result = await ThreeDSecureService.authenticate3DSecure(
        challenge.id,
        authCode
      );

      if (result.authenticated) {
        setStep('completed');
        setTimeout(() => {
          onAuthenticated(result);
          onClose();
        }, 1500);
      } else {
        setError('Authentication failed. Please try again.');
        onFailed();
      }
    } catch (err) {
      setError('Authentication process failed');
      onFailed();
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (step) {
      case 'initiating':
        return (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Initiating secure authentication...</p>
          </div>
        );

      case 'challenge':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">3D Secure Authentication</h3>
              <p className="text-gray-600 text-sm">
                For your security, please complete the authentication process
              </p>
            </div>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Transaction: {currency} {amount.toFixed(2)} - Additional verification required
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Authentication Code
                </label>
                <Input
                  type="text"
                  placeholder="Enter code from your bank"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  maxLength={6}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Check your mobile banking app or SMS for the verification code
                </p>
              </div>

              <Button 
                onClick={handleAuthenticate}
                disabled={!authCode || loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Authenticating...
                  </>
                ) : (
                  'Verify & Continue'
                )}
              </Button>
            </div>
          </div>
        );

      case 'authenticating':
        return (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Verifying authentication...</p>
          </div>
        );

      case 'completed':
        return (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Authentication Successful
            </h3>
            <p className="text-gray-600">Processing your payment...</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Secure Payment Verification
          </DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {renderContent()}

        {step === 'challenge' && (
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}