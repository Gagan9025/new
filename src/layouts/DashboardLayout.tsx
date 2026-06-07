import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowLeft, UserCheck, ShieldAlert, ChevronRight } from 'lucide-react';
import { Sidebar } from '../components/common/Sidebar';
import { useStore } from '../store/useStore';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { Button } from '../components/ui/Button';

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Auto redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-3">
          <ShieldAlert className="h-12 w-12 text-rose-500 animate-pulse" />
          <p className="text-sm font-semibold">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Generate dynamic page title based on path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('admin/dashboard')) return 'Master Console Overview';
    if (path.includes('admin/customers')) return 'Customer Accounts Manager';
    if (path.includes('admin/employees')) return 'Employee Directory Manager';
    if (path.includes('admin/payroll')) return 'Payroll & Compensation';
    if (path.includes('admin/inventory')) return 'Product Inventory Warehouse';
    if (path.includes('admin/orders')) return 'Customer Order Processor';
    if (path.includes('admin/tempo')) return 'Tempo Dispatch Center';
    if (path.includes('admin/interior')) return 'Interior Renovation Projects';
    if (path.includes('admin/cms')) return 'Content Management System';
    
    if (path.includes('employee/dashboard')) return 'Employee Workstation';
    if (path.includes('customer/dashboard')) return 'Customer Dashboard';
    
    return 'User Workspace';
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-darkBg overflow-hidden transition-colors duration-300">
      {/* Sidebar for Desktop */}
      <div className="hidden md:block h-full">
        <Sidebar />
      </div>

      {/* Sidebar Drawer for Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs" 
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative flex-shrink-0 w-64 h-full bg-white dark:bg-darkBg z-10 animate-in slide-in-from-left duration-300">
            {/* Close Button Inside Sidebar Drawer */}
            <div className="absolute top-4 right-4 z-20">
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <Sidebar onLinkClick={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Right Column (Header + Body scroll) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 glass-panel border-b border-slate-200/50 dark:border-darkBorder/40 flex items-center justify-between px-4 sm:px-6 z-10">
          <div className="flex items-center gap-3">
            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-darkCard md:hidden transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            {/* Page Title & Back to Landing */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                <Link to="/" className="hover:text-accentIndigo dark:hover:text-accentTeal flex items-center gap-1">
                  <ArrowLeft className="h-3 w-3" /> Home
                </Link>
                <ChevronRight className="h-3 w-3" />
                <span className="truncate">{currentUser.role} Portal</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white leading-tight font-display">
                {getPageTitle()}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden sm:flex flex-col items-end text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-200">{currentUser.name}</span>
              <span className="text-slate-400 font-semibold uppercase tracking-widest text-[9px]">{currentUser.role}</span>
            </div>
          </div>
        </header>

        {/* Dashboard Pages Content */}
        <main className="flex-grow overflow-y-auto p-4 sm:p-6 custom-scrollbar bg-slate-50/50 dark:bg-darkBg/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
