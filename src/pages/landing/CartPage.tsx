import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowLeft, ArrowRight, ShieldCheck, MapPin, CreditCard } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, updateCartQty, removeFromCart, placeOrder, currentUser, customers } = useStore();

  const reactiveCustomer = customers.find(c => c.id === currentUser?.id);
  const [address, setAddress] = useState(reactiveCustomer?.addresses?.[0] || (currentUser?.details as any)?.addresses?.[0] || '');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [isOrdered, setIsOrdered] = useState(false);
  const [error, setError] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% mock tax
  const total = subtotal + tax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setError('Please log in to complete your checkout.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    if (!address) {
      setError('Please provide a delivery address.');
      return;
    }

    const res = placeOrder(address, paymentMethod);

    if (res.success) {
      setIsOrdered(true);
      setError('');
      setTimeout(() => {
        navigate('/customer/dashboard');
      }, 2500);
    } else {
      setError('Order failed. Some products might have gone out of stock.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left">
      <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
        <h1 className="text-3xl font-black text-slate-800 dark:text-white font-display">
          Your Shopping Cart
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Review your furniture items, specify shipping addresses, and confirm checkout details.
        </p>
      </div>

      {isOrdered ? (
        <Card className="max-w-lg mx-auto p-8 text-center flex flex-col items-center gap-4 py-16 animate-in zoom-in-95">
          <div className="h-16 w-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-500/20 shadow-md">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white font-display">Order Placed Successfully!</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
            We have registered your purchase. An invoice has been generated, and our dispatch team is prepping shipment.
          </p>
          <span className="text-xs font-semibold text-slate-400 mt-2">Redirecting to customer orders panel...</span>
        </Card>
      ) : cart.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center justify-center gap-4">
          <ShoppingCart className="h-12 w-12 text-slate-400" />
          <h3 className="font-bold text-slate-700 dark:text-slate-300">Your Cart is Empty</h3>
          <p className="text-xs text-slate-500 max-w-xs">
            Add premium Chesterfield sofas or ergonomic chairs to your cart to begin checkout.
          </p>
          <Button onClick={() => navigate('/furniture')} leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Go Shopping
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Items List */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white font-display border-b border-slate-200/50 dark:border-darkBorder/40 pb-2">
              Cart Items ({cart.length})
            </h3>
            
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <Card key={item.product.id} className="p-4 flex gap-4 items-center">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="h-20 w-20 object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="flex-grow flex flex-col gap-1 text-left min-w-0">
                    <span className="text-[10px] font-bold text-accentIndigo dark:text-accentTeal uppercase">
                      {item.product.category}
                    </span>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm truncate">
                      <Link to={`/furniture/${item.product.id}`} className="hover:underline">
                        {item.product.name}
                      </Link>
                    </h4>
                    <span className="text-xs font-bold text-slate-400">₹{item.product.price} each</span>
                  </div>

                  {/* Quantity control */}
                  <div className="flex items-center border border-slate-200 dark:border-darkBorder rounded-lg bg-slate-50 dark:bg-darkBg overflow-hidden shrink-0">
                    <button 
                      onClick={() => updateCartQty(item.product.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-slate-500 hover:bg-slate-200 dark:hover:bg-darkCard transition-colors font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 font-bold text-xs">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartQty(item.product.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-slate-500 hover:bg-slate-200 dark:hover:bg-darkCard transition-colors font-bold text-xs"
                      disabled={item.quantity >= item.product.stock}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors shrink-0"
                    title="Remove from Cart"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </Card>
              ))}
            </div>

            <div className="mt-4">
              <Link 
                to="/furniture" 
                className="inline-flex items-center gap-2 text-xs font-bold text-accentIndigo dark:text-accentTeal hover:underline"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Right Column: Checkout details */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white font-display border-b border-slate-200/50 dark:border-darkBorder/40 pb-2">
              Order Checkout
            </h3>

            <Card className="p-6 flex flex-col gap-5 border border-white/5">
              <form onSubmit={handleCheckout} className="flex flex-col gap-4">
                <Input
                  label="Shipping Street Address"
                  placeholder="Enter full shipping location"
                  leftIcon={<MapPin className="h-4 w-4" />}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Payment Gateway
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Credit Card', 'Cash on Delivery'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`py-2 px-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                          paymentMethod === method
                            ? 'border-accentTeal bg-accentTeal/10 text-accentTeal'
                            : 'border-slate-200 dark:border-darkBorder text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-darkCard'
                        }`}
                      >
                        <CreditCard className="h-3.5 w-3.5" /> {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-slate-200 dark:bg-darkBorder/40 my-2" />

                {/* Subtotal, tax, total */}
                <div className="flex flex-col gap-2 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-slate-700 dark:text-slate-200">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sales Tax (8%)</span>
                    <span className="text-slate-700 dark:text-slate-200">₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Charges</span>
                    <span className="text-emerald-500 font-bold">FREE</span>
                  </div>
                  <div className="h-px bg-slate-200 dark:bg-darkBorder/40 my-1" />
                  <div className="flex justify-between text-sm font-bold text-slate-800 dark:text-white">
                    <span>Grand Total</span>
                    <span className="text-lg text-accentTeal">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {error && (
                  <span className="text-xs text-red-500 font-bold text-center">{error}</span>
                )}

                <Button variant="primary" type="submit" className="w-full mt-2" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  {currentUser ? 'Place Order Now' : 'Log In & Check Out'}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
