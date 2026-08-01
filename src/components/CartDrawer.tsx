import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 500 || items.length === 0 ? 0 : 25.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
    setTimeout(() => {
      onClearCart();
      setOrderComplete(false);
      setIsCheckingOut(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl relative">
        {/* Header */}
        <div className="p-4 border-b border-[#c6c6cd] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2 text-[#000000] font-bold text-lg">
            <ShoppingBag className="w-5 h-5" />
            <span>Your Order Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#45464d] hover:text-[#000000] hover:bg-[#f2f4f6] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {orderComplete ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-[#006c49]" />
            <h3 className="text-2xl font-bold text-[#000000]">Order Confirmed!</h3>
            <p className="text-sm text-[#45464d]">
              Thank you for purchasing on MarketForge. Your order PO is processing and a confirmation invoice has been sent to your business email.
            </p>
          </div>
        ) : isCheckingOut ? (
          <form onSubmit={handleCheckoutSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#000000] border-b border-[#c6c6cd] pb-2">Business Checkout</h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#45464d] block mb-1">Company / Organization</label>
                <input
                  required
                  type="text"
                  placeholder="Acme Corp LLC"
                  className="w-full p-2.5 border border-[#c6c6cd] rounded-lg text-sm outline-none focus:border-[#000000]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#45464d] block mb-1">Business Email</label>
                <input
                  required
                  type="email"
                  placeholder="procurement@acme.com"
                  className="w-full p-2.5 border border-[#c6c6cd] rounded-lg text-sm outline-none focus:border-[#000000]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#45464d] block mb-1">Shipping Address</label>
                <input
                  required
                  type="text"
                  placeholder="100 Logistics Way, Suite 400"
                  className="w-full p-2.5 border border-[#c6c6cd] rounded-lg text-sm outline-none focus:border-[#000000]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#45464d] block mb-1">Payment Method</label>
                <select className="w-full p-2.5 border border-[#c6c6cd] rounded-lg text-sm outline-none focus:border-[#000000]">
                  <option>Purchase Order (PO - Net 30)</option>
                  <option>Corporate Credit Card</option>
                  <option>Wire Transfer / ACH</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-[#c6c6cd] space-y-2 text-sm">
              <div className="flex justify-between font-bold text-base text-[#000000]">
                <span>Total Due:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                type="button"
                onClick={() => setIsCheckingOut(false)}
                className="flex-1 py-3 border border-[#c6c6cd] text-sm font-semibold rounded-lg hover:bg-[#f2f4f6]"
              >
                Back to Cart
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-[#000000] text-white text-sm font-semibold rounded-lg hover:bg-[#000000]/90"
              >
                Place Order
              </button>
            </div>
          </form>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <ShoppingBag className="w-12 h-12 text-[#76777d]" />
            <p className="text-base font-semibold text-[#000000]">Your shopping cart is empty.</p>
            <p className="text-xs text-[#45464d]">Explore featured inventory in the shop to add items.</p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#000000] text-white text-sm font-medium rounded-lg"
            >
              Browse Shop
            </button>
          </div>
        ) : (
          <>
            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3 bg-[#f7f9fb] p-3 rounded-xl border border-[#c6c6cd]">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-lg border border-[#c6c6cd] bg-white shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-[#000000] line-clamp-1">{product.title}</h4>
                      <span className="text-[11px] text-[#76777d]">Seller: {product.sellerName}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#c6c6cd] rounded bg-white h-7">
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                          className="px-2 text-[#45464d] hover:bg-[#f2f4f6] h-full"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-[#000000]">{quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          className="px-2 text-[#45464d] hover:bg-[#f2f4f6] h-full"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-[#000000]">
                          ${(product.price * quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-[#76777d] hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary & Checkout Footer */}
            <div className="p-4 border-t border-[#c6c6cd] bg-white space-y-3">
              <div className="space-y-1.5 text-xs text-[#45464d]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#000000]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Freight Shipping</span>
                  <span className="font-semibold text-[#000000]">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="font-semibold text-[#000000]">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#e0e3e5] text-base font-bold text-[#000000]">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                id="cart-checkout-btn"
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3 bg-[#000000] text-white font-semibold text-sm rounded-lg hover:bg-[#000000]/90 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
