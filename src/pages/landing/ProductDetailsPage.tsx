import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Star, Heart, ShoppingCart, ShieldCheck, RefreshCcw, Truck } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, cart, wishlist, toggleWishlist, addToCart } = useStore();
  const [qty, setQty] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Product Not Found</h2>
        <p className="text-slate-500">The product you are looking for does not exist in our catalog.</p>
        <Button onClick={() => navigate('/furniture')}>Back to Store</Button>
      </div>
    );
  }

  const isWish = wishlist.some(w => w.id === product.id);
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left">
      {/* Back link */}
      <div className="mb-6">
        <Link 
          to="/furniture" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-accentIndigo dark:hover:text-accentTeal transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Catalog
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column: Product Image */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/50 dark:border-darkBorder/40 bg-white dark:bg-darkCard p-4">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-[300px] sm:h-[450px] object-cover rounded-2xl"
          />
          <button
            onClick={() => toggleWishlist(product)}
            className={`absolute top-8 right-8 p-3 rounded-full backdrop-blur-md transition-colors z-10 border shadow-md ${
              isWish
                ? 'bg-red-500/20 border-red-500/35 text-red-500'
                : 'bg-slate-900/40 border-white/10 text-white hover:text-red-400'
            }`}
          >
            <Heart className={`h-5 w-5 ${isWish ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Right Column: Details */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-accentIndigo dark:text-accentTeal">
                {product.category}
              </span>
              <div className="flex items-center text-amber-500 text-sm gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-300 dark:text-slate-700'}`} />
                ))}
                <span className="font-bold ml-1 text-slate-700 dark:text-slate-300">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl font-black text-slate-800 dark:text-white font-display leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mt-2">
              <span className="text-3xl font-black text-slate-800 dark:text-slate-100">₹{product.price}</span>
              <Badge variant={isOutOfStock ? 'danger' : product.stock <= 2 ? 'warning' : 'success'}>
                {isOutOfStock ? 'Out of Stock' : product.stock <= 2 ? `Only ${product.stock} Left!` : 'In Stock'}
              </Badge>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {product.description}
          </p>

          {/* Features Checklist */}
          <div className="flex flex-col gap-3 border-y border-slate-200/50 dark:border-darkBorder/40 py-5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Product Highlights</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
              {product.features.map((feat, index) => (
                <li key={index} className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity and Actions */}
          <div className="flex items-center gap-4 mt-2">
            {!isOutOfStock && (
              <div className="flex items-center border border-slate-200 dark:border-darkBorder rounded-xl bg-slate-50 dark:bg-darkBg overflow-hidden">
                <button 
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-2 text-slate-500 hover:bg-slate-200 dark:hover:bg-darkCard transition-colors font-bold text-sm"
                >
                  -
                </button>
                <span className="px-4 py-2 font-bold text-sm">{qty}</span>
                <button 
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  className="px-3 py-2 text-slate-500 hover:bg-slate-200 dark:hover:bg-darkCard transition-colors font-bold text-sm"
                  disabled={qty >= product.stock}
                >
                  +
                </button>
              </div>
            )}

            <Button
              variant="primary"
              size="lg"
              className="flex-grow justify-center"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              leftIcon={<ShoppingCart className="h-5 w-5" />}
            >
              {isOutOfStock ? 'Sold Out' : 'Buy Now'}
            </Button>
          </div>

          {/* Additional details */}
          <div className="grid grid-cols-3 gap-4 mt-2 text-center">
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-100/50 dark:bg-darkCard/20 border border-slate-200/50 dark:border-darkBorder/40">
              <Truck className="h-4 w-4 text-accentTeal mb-1" />
              <span className="text-[10px] font-bold text-slate-400">FAST SHIFT</span>
              <span className="text-[9px] font-semibold text-slate-700 dark:text-slate-200">1-2 Days Delivery</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-100/50 dark:bg-darkCard/20 border border-slate-200/50 dark:border-darkBorder/40">
              <ShieldCheck className="h-4 w-4 text-accentTeal mb-1" />
              <span className="text-[10px] font-bold text-slate-400">WARRANTY</span>
              <span className="text-[9px] font-semibold text-slate-700 dark:text-slate-200">5-Year Quality Care</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-100/50 dark:bg-darkCard/20 border border-slate-200/50 dark:border-darkBorder/40">
              <RefreshCcw className="h-4 w-4 text-accentTeal mb-1" />
              <span className="text-[10px] font-bold text-slate-400">RETURNS</span>
              <span className="text-[9px] font-semibold text-slate-700 dark:text-slate-200">30-Day Exchange</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
