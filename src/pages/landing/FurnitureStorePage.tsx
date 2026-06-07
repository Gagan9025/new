import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, SlidersHorizontal, ArrowUpDown, RefreshCw, Package } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';

export const FurnitureStorePage: React.FC = () => {
  const navigate = useNavigate();
  const { products, cart, wishlist, toggleWishlist, addToCart } = useStore();

  // Filter states
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(75000);
  const [sortBy, setSortBy] = useState<string>('featured');

  const categories = ['All', 'Living Room', 'Bedroom', 'Office', 'Dining', 'Outdoor'];

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesPrice = item.price <= maxPrice;
        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // Default featured order
      });
  }, [products, search, selectedCategory, maxPrice, sortBy]);

  const handleReset = () => {
    setSearch('');
    setSelectedCategory('All');
    setMaxPrice(75000);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left">
      {/* Page Header */}
      <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
        <h1 className="text-3xl font-black text-slate-800 dark:text-white font-display">
          Premium Furniture Collection
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Discover hand-crafted contemporary seating, ergonomic workspaces, and masterbedroom bedding structures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-24 h-fit">
          <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-darkBorder/40 pb-3">
            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5 font-display text-sm uppercase tracking-wider">
              <SlidersHorizontal className="h-4 w-4 text-accentTeal" /> Filter Options
            </h3>
            <button 
              onClick={handleReset}
              className="text-xs font-semibold text-accentIndigo dark:text-accentTeal hover:underline flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" /> Reset
            </button>
          </div>

          {/* Search Box */}
          <div className="flex flex-col gap-1.5">
            <Input
              placeholder="Search catalog..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>

          {/* Category List */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Categories</h4>
            <div className="flex flex-wrap lg:flex-col gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-left text-xs font-bold rounded-lg transition-colors ${
                    selectedCategory === cat
                      ? 'bg-accentIndigo text-white'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-darkCard dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span>Max Price</span>
              <span className="text-accentTeal font-black">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="75000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full accent-accentTeal h-1.5 bg-slate-200 dark:bg-darkBorder rounded-lg cursor-pointer"
            />
          </div>

          {/* Sort Menu */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <ArrowUpDown className="h-3.5 w-3.5" /> Sort Criteria
            </h4>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="glass-input p-2 text-xs"
            >
              <option value="featured">Featured Creations</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated Products</option>
            </select>
          </div>
        </div>

        {/* Product Listing Grid */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400 border-b border-slate-200/50 dark:border-darkBorder/40 pb-3">
            <span>Showing {filteredProducts.length} items</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center justify-center gap-3">
              <Package className="h-10 w-10 text-slate-400" />
              <h4 className="font-bold text-slate-700 dark:text-slate-300">No products match your filters.</h4>
              <button onClick={handleReset} className="text-xs text-accentTeal font-bold underline">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((item) => {
                const isWish = wishlist.some(w => w.id === item.id);
                return (
                  <Card key={item.id} hoverable className="flex flex-col h-full relative group">
                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(item)}
                      className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-colors z-10 border ${
                        isWish
                          ? 'bg-red-500/20 border-red-500/35 text-red-500'
                          : 'bg-slate-900/40 border-white/10 text-white hover:text-red-400'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isWish ? 'fill-current' : ''}`} />
                    </button>

                    {/* Image Area */}
                    <div className="h-56 overflow-hidden relative bg-slate-100 dark:bg-darkCard">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {item.stock <= 2 && item.stock > 0 && (
                        <Badge variant="warning" className="absolute bottom-3 left-3">
                          Low Stock: {item.stock} left
                        </Badge>
                      )}
                      {item.stock === 0 && (
                        <Badge variant="danger" className="absolute bottom-3 left-3">
                          Sold Out
                        </Badge>
                      )}
                    </div>

                    {/* Details content */}
                    <Card.Content className="flex-grow flex flex-col justify-between p-5 gap-3">
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-accentIndigo dark:text-accentTeal">
                          <span>{item.category}</span>
                          <span className="text-slate-400 font-semibold lowercase">In Stock: {item.stock}</span>
                        </div>
                        <h4 className="font-bold text-slate-800 dark:text-white text-base hover:text-accentIndigo dark:hover:text-accentTeal transition-colors line-clamp-1">
                          <Link to={`/furniture/${item.id}`}>{item.name}</Link>
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-darkBorder/40">
                        <span className="text-base font-black text-slate-800 dark:text-slate-100">₹{item.price}</span>
                        <div className="flex gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="p-2"
                            disabled={item.stock === 0}
                            onClick={() => addToCart(item)}
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            disabled={item.stock === 0}
                            onClick={() => {
                              addToCart(item);
                              navigate('/cart');
                            }}
                          >
                            Buy
                          </Button>
                        </div>
                      </div>
                    </Card.Content>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
