import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { CheckCircle, Download, Mail } from 'lucide-react';

interface CheckoutSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails?: {
    orderId: string;
    items: Array<{ name: string; quantity: number; price: number }>;
    total: number;
  };
}

export const CheckoutSuccess: React.FC<CheckoutSuccessProps> = ({ 
  isOpen, 
  onClose, 
  orderDetails 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-6 w-6" />
            Payment Successful!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-center">
          <p className="text-gray-600">
            Thank you for your purchase! Your order has been confirmed.
          </p>
          
          {orderDetails && (
            <div className="bg-gray-50 p-4 rounded-lg text-left">
              <h3 className="font-medium mb-2">Order Summary</h3>
              <p className="text-sm text-gray-600 mb-2">
                Order ID: {orderDetails.orderId}
              </p>
              <div className="space-y-1">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${orderDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
            <Button variant="outline" className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Email Receipt
            </Button>
          </div>
          
          <Button onClick={onClose} className="w-full">
            Continue Shopping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};