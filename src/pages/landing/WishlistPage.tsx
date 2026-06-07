import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, addToCart } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left">
      <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
        <h1 className="text-3xl font-black text-slate-800 dark:text-white font-display">
          Your Saved Wishlist
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Monitor your saved chairs, sofas, and tables. Move them to your cart once ready to purchase.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center justify-center gap-4">
          <Heart className="h-12 w-12 text-slate-400" />
          <h3 className="font-bold text-slate-700 dark:text-slate-300">Your Wishlist is Empty</h3>
          <p className="text-xs text-slate-500 max-w-xs">
            Explore the catalog and tap the heart icon on any products to save them here.
          </p>
          <Button onClick={() => navigate('/furniture')} leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Go Shopping
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <Card key={item.id} hoverable className="flex flex-col h-full relative group">
              {/* Product image */}
              <div className="h-48 overflow-hidden relative bg-slate-100 dark:bg-darkCard">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => toggleWishlist(item)}
                  className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-md bg-red-500/20 border border-red-500/35 text-red-500"
                  title="Remove from Wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Product description content */}
              <Card.Content className="flex-grow flex flex-col justify-between p-4 gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-accentIndigo dark:text-accentTeal">
                    {item.category}
                  </span>
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm line-clamp-1">
                    <Link to={`/furniture/${item.id}`} className="hover:underline">{item.name}</Link>
                  </h4>
                  <span className="text-sm font-black text-slate-800 dark:text-slate-100">₹{item.price}</span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full text-center"
                    disabled={item.stock === 0}
                    onClick={() => {
                      addToCart(item);
                      toggleWishlist(item); // Remove from wishlist after cart move
                      navigate('/cart');
                    }}
                    leftIcon={<ShoppingCart className="h-3.5 w-3.5" />}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
