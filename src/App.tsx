import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';

// Layouts
import { RootLayout } from './layouts/RootLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Public Landing Pages
import { LandingPage } from './pages/landing/LandingPage';
import { TempoBookingPage } from './pages/landing/TempoBookingPage';
import { FurnitureStorePage } from './pages/landing/FurnitureStorePage';
import { ProductDetailsPage } from './pages/landing/ProductDetailsPage';
import { CartPage } from './pages/landing/CartPage';
import { WishlistPage } from './pages/landing/WishlistPage';
import { InteriorDesignPage } from './pages/landing/InteriorDesignPage';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// Customer Portal
import { CustomerDashboard } from './pages/customer/CustomerDashboard';

// Employee Portal
import { EmployeeDashboard } from './pages/employee/EmployeeDashboard';

// Admin Portal
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CustomerManagement } from './pages/admin/CustomerManagement';
import { EmployeeManagement } from './pages/admin/EmployeeManagement';
import { PayrollManagement } from './pages/admin/PayrollManagement';
import { InventoryManagement } from './pages/admin/InventoryManagement';
import { OrderManagement } from './pages/admin/OrderManagement';
import { TempoBookingManagement } from './pages/admin/TempoBookingManagement';
import { InteriorDesignManagement } from './pages/admin/InteriorDesignManagement';
import { CMSManagement } from './pages/admin/CMSManagement';

function App() {
  const { isDarkMode } = useStore();

  // Load and apply dark theme on load
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Site */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="tempo" element={<TempoBookingPage />} />
          <Route path="furniture" element={<FurnitureStorePage />} />
          <Route path="furniture/:id" element={<ProductDetailsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="interior" element={<InteriorDesignPage />} />
          
          {/* Authentication Pages */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Private Portals (Unified Dashboard Layout) */}
        <Route path="/customer" element={<DashboardLayout />}>
          <Route path="dashboard" element={<CustomerDashboard />} />
        </Route>

        <Route path="/employee" element={<DashboardLayout />}>
          <Route path="dashboard" element={<EmployeeDashboard />} />
        </Route>

        <Route path="/admin" element={<DashboardLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="customers" element={<CustomerManagement />} />
          <Route path="employees" element={<EmployeeManagement />} />
          <Route path="payroll" element={<PayrollManagement />} />
          <Route path="inventory" element={<InventoryManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="tempo" element={<TempoBookingManagement />} />
          <Route path="interior" element={<InteriorDesignManagement />} />
          <Route path="cms" element={<CMSManagement />} />
        </Route>

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
