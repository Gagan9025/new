import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, LogOut, Menu, X, Truck, Sofa, Palette } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, cart, wishlist, logout } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishCount = wishlist.length;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!currentUser) return '/login';
    if (currentUser.role === 'Admin') return '/admin/dashboard';
    if (currentUser.role === 'Employee') return '/employee/dashboard';
    return '/customer/dashboard';
  };

  return (
    <nav className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/50 dark:border-darkBorder/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2.5 text-xl font-bold tracking-wider text-slate-800 dark:text-white font-display">
              <img src="/logo.png" alt="Royal's Company Logo" className="h-10 w-10 object-contain rounded-lg shadow-sm" />
              <span>ROYAL'S<span className="text-accentTeal font-light"> COMPANY</span></span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-accentIndigo dark:hover:text-accentTeal transition-colors">
              Home
            </Link>
            <Link to="/tempo" className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-accentIndigo dark:hover:text-accentTeal transition-colors">
              <Truck className="h-4 w-4" /> Tempo Transport
            </Link>
            <Link to="/furniture" className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-accentIndigo dark:hover:text-accentTeal transition-colors">
              <Sofa className="h-4 w-4" /> Furniture Store
            </Link>
            <Link to="/interior" className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-accentIndigo dark:hover:text-accentTeal transition-colors">
              <Palette className="h-4 w-4" /> Interior Design
            </Link>
          </div>

          {/* Right Action Icons */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-accentIndigo dark:hover:text-accentTeal transition-colors">
              <Heart className="h-5 w-5" />
              {wishCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {wishCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-accentIndigo dark:hover:text-accentTeal transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accentTeal text-[10px] font-bold text-darkBg">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            {currentUser ? (
              <div className="flex items-center gap-3">
                <Button 
                  variant="glass" 
                  size="sm"
                  onClick={() => navigate(getDashboardLink())}
                  leftIcon={<User className="h-4 w-4" />}
                >
                  {currentUser.role === 'Customer' ? 'My Account' : `${currentUser.role} Portal`}
                </Button>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => navigate('/login')}
                >
                  Log In
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={() => navigate('/register')}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-darkCard transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-slate-200/50 dark:border-darkBorder/45 px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-darkCard"
          >
            Home
          </Link>
          <Link
            to="/tempo"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-darkCard"
          >
            Tempo Transport
          </Link>
          <Link
            to="/furniture"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-darkCard"
          >
            Furniture Store
          </Link>
          <Link
            to="/interior"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-darkCard"
          >
            Interior Design
          </Link>
          <div className="h-px bg-slate-200 dark:bg-darkBorder/40 my-2" />
          <Link
            to="/wishlist"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-base font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-darkCard"
          >
            <span>Wishlist</span>
            <span className="bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">{wishCount}</span>
          </Link>
          <Link
            to="/cart"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-base font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-darkCard"
          >
            <span>Cart</span>
            <span className="bg-accentTeal text-darkBg rounded-full px-2 py-0.5 text-xs font-bold">{cartCount}</span>
          </Link>
          <div className="h-px bg-slate-200 dark:bg-darkBorder/40 my-2" />
          {currentUser ? (
            <div className="space-y-2">
              <Button 
                variant="glass" 
                className="w-full text-center" 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate(getDashboardLink());
                }}
              >
                Go to Dashboard
              </Button>
              <Button 
                variant="danger" 
                className="w-full text-center" 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="secondary" 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/login');
                }}
              >
                Log In
              </Button>
              <Button 
                variant="primary" 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/register');
                }}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
