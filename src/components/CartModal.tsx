import React, { useState } from 'react';
import { useCart } from './CartContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import PaymentModal from './PaymentModal';
import { CheckoutSuccess } from './CheckoutSuccess';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const handleCheckout = () => {
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    // Create order details
    const orderId = `ORD-${Date.now()}`;
    setOrderDetails({
      orderId,
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: totalPrice
    });
    
    setShowPayment(false);
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setOrderDetails(null);
    onClose();
  };

  return (
    <>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart ({items.length} items)
          </DialogTitle>
        </DialogHeader>
        
        {items.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  {item.category && (
                    <Badge variant="secondary" className="mt-1">
                      {item.category}
                    </Badge>
                  )}
                  <p className="text-sm text-gray-600 mt-1">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="text-right">
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">
                  Total: ${totalPrice.toFixed(2)}
                </span>
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Continue Shopping
                </Button>
                <Button onClick={handleCheckout} className="flex-1">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>

    <PaymentModal
      isOpen={showPayment}
      onClose={() => setShowPayment(false)}
      onSuccess={handlePaymentSuccess}
    />

    <CheckoutSuccess
      isOpen={showSuccess}
      onClose={handleSuccessClose}
      orderDetails={orderDetails}
    />
  </>
  );
};