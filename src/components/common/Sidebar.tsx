import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  CreditCard,
  Package,
  ShoppingCart,
  Truck,
  Palette,
  Settings,
  LogOut,
  MapPin,
  CalendarDays,
  FileSpreadsheet,
  HeadphonesIcon
} from 'lucide-react';
import { useStore } from '../../store/useStore';

interface SidebarProps {
  onLinkClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLinkClick }) => {
  const navigate = useNavigate();
  const { currentUser, logout } = useStore();

  if (!currentUser) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
    if (onLinkClick) onLinkClick();
  };

  const getMenuLinks = () => {
    const role = currentUser.role;

    if (role === 'Admin') {
      return [
        { to: '/admin/dashboard', label: 'Master Analytics', icon: LayoutDashboard },
        { to: '/admin/customers', label: 'Customers', icon: Users },
        { to: '/admin/employees', label: 'Employees', icon: UserCheck },
        { to: '/admin/payroll', label: 'Payroll & Payslips', icon: CreditCard },
        { to: '/admin/inventory', label: 'Inventory (Products)', icon: Package },
        { to: '/admin/orders', label: 'Furniture Orders', icon: ShoppingCart },
        { to: '/admin/tempo', label: 'Tempo Bookings', icon: Truck },
        { to: '/admin/interior', label: 'Interior Design', icon: Palette },
        { to: '/admin/cms', label: 'CMS Portal', icon: Settings }
      ];
    } else if (role === 'Employee') {
      return [
        { to: '/employee/dashboard', label: 'Overview', icon: LayoutDashboard },
        { to: '/employee/dashboard#tasks', label: 'My Assigned Tasks', icon: FileSpreadsheet },
        { to: '/employee/dashboard#orders', label: 'Assigned Orders', icon: ShoppingCart },
        { to: '/employee/dashboard#inventory', label: 'View Inventory', icon: Package },
        { to: '/employee/dashboard#support', label: 'Customer Support', icon: HeadphonesIcon }
      ];
    } else {
      // Customer
      return [
        { to: '/customer/dashboard', label: 'My Profile', icon: LayoutDashboard },
        { to: '/customer/dashboard#orders', label: 'My Orders', icon: ShoppingCart },
        { to: '/customer/dashboard#bookings', label: 'Booking History', icon: Truck },
        { to: '/customer/dashboard#addresses', label: 'Saved Addresses', icon: MapPin },
        { to: '/customer/dashboard#settings', label: 'Profile Settings', icon: Settings }
      ];
    }
  };

  const menuItems = getMenuLinks();

  return (
    <aside className="w-64 glass-panel border-r border-slate-200/50 dark:border-darkBorder/40 h-full flex flex-col justify-between py-6">
      <div className="flex flex-col gap-6">
        {/* User Badge */}
        <div className="px-6 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-accentIndigo to-accentTeal flex items-center justify-center text-white font-bold shadow-sm">
            {currentUser.name.charAt(0)}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate leading-tight">
              {currentUser.name}
            </span>
            <span className="text-xs font-semibold text-accentIndigo dark:text-accentTeal mt-0.5">
              {currentUser.role}
            </span>
          </div>
        </div>

        <div className="h-px bg-slate-200/50 dark:bg-darkBorder/40 mx-4" />

        {/* Links */}
        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            
            // Handle Hash nav link navigation helper
            const isHash = item.to.includes('#');

            return isHash ? (
              <a
                key={idx}
                href={item.to}
                onClick={onLinkClick}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-darkCard hover:text-accentIndigo dark:hover:text-accentTeal transition-all duration-200"
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </a>
            ) : (
              <NavLink
                key={idx}
                to={item.to}
                onClick={onLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-accentIndigo/10 to-accentTeal/10 border-l-4 border-accentIndigo text-accentIndigo dark:text-accentTeal'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-darkCard hover:text-accentIndigo dark:hover:text-accentTeal'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="px-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all duration-200"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
