import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import {
  Users,
  UserCheck,
  ShoppingCart,
  DollarSign,
  Truck,
  Package,
  AlertTriangle,
  FileCheck,
  MapPin,
  Clock
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  RevenueTrends,
  SalesByCategory,
  BookingPerformance,
  EmployeePerformanceChart
} from '../../components/charts/AnalyticsCharts';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { products, employees, customers, orders, bookings } = useStore();

  // Statistics
  const totalCustomers = customers.length;
  const totalEmployees = employees.length;
  const totalOrders = orders.length;
  const totalBookings = bookings.length;
  
  // Calculate total revenue from orders and bookings
  const orderRev = orders.filter(o => o.status === 'Delivered' || o.status === 'Pending' || o.status === 'Packing' || o.status === 'Shipped').reduce((sum, o) => sum + o.totalAmount, 0);
  const bookingRev = bookings.filter(b => b.status === 'Completed').reduce((sum, b) => sum + b.totalCost, 0);
  const totalRevenue = orderRev + bookingRev;

  // Alerts: Low stock items
  const lowStockProducts = products.filter(p => p.stock <= 2);

  // Alerts: Pending Leaves
  const pendingLeaves = employees.reduce((list: any[], emp) => {
    emp.leaves.forEach(l => {
      if (l.status === 'Pending') {
        list.push({ empId: emp.id, empName: emp.name, leave: l });
      }
    });
    return list;
  }, []);

  // Alerts: Pending Bookings needing Drivers
  const unassignedBookings = bookings.filter(b => b.status === 'Pending');

  return (
    <div className="flex flex-col gap-8 text-left">
      {/* 1. Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Revenue */}
        <Card className="p-5 flex items-center justify-between border-l-4 border-l-emerald-500">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Combined Revenue</span>
            <div className="text-2xl font-black text-slate-800 dark:text-white font-display">
              ₹{totalRevenue.toLocaleString()}
            </div>
            <span className="text-[10px] font-semibold text-emerald-500 mt-1">Orders + Shifting Fees</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
            <DollarSign className="h-6 w-6" />
          </div>
        </Card>

        {/* Card 2: Orders */}
        <Card className="p-5 flex items-center justify-between border-l-4 border-l-accentIndigo">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Furniture Sales Orders</span>
            <div className="text-2xl font-black text-slate-800 dark:text-white font-display">
              {totalOrders}
            </div>
            <span className="text-[10px] font-semibold text-accentIndigo dark:text-accentTeal mt-1">Marketplace Purchases</span>
          </div>
          <div className="p-3 rounded-xl bg-accentIndigo/10 text-accentIndigo">
            <ShoppingCart className="h-6 w-6" />
          </div>
        </Card>

        {/* Card 3: Bookings */}
        <Card className="p-5 flex items-center justify-between border-l-4 border-l-accentTeal">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tempo Bookings</span>
            <div className="text-2xl font-black text-slate-800 dark:text-white font-display">
              {totalBookings}
            </div>
            <span className="text-[10px] font-semibold text-accentTeal mt-1">Cargo Shifting Requests</span>
          </div>
          <div className="p-3 rounded-xl bg-accentTeal/10 text-accentTeal">
            <Truck className="h-6 w-6" />
          </div>
        </Card>

        {/* Card 4: Workforce */}
        <Card className="p-5 flex items-center justify-between border-l-4 border-l-purple-500">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Staff Members</span>
            <div className="text-2xl font-black text-slate-800 dark:text-white font-display">
              {totalEmployees}
            </div>
            <span className="text-[10px] font-semibold text-purple-500 mt-1">Drivers, Designers & Support</span>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
            <UserCheck className="h-6 w-6" />
          </div>
        </Card>
      </div>

      {/* 2. Urgent Operations Center / Notifications Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Low Stock Alerts */}
        <Card className="p-5 flex flex-col gap-4 border border-red-500/10 bg-red-500/5">
          <h4 className="text-sm font-bold text-red-500 flex items-center gap-1.5 uppercase tracking-wider font-display">
            <AlertTriangle className="h-4.5 w-4.5" /> Warehouse Stock Alerts
          </h4>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto custom-scrollbar">
            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-slate-400">All product counts are within safety parameters.</p>
            ) : (
              lowStockProducts.map((p) => (
                <div key={p.id} className="flex justify-between items-center text-xs p-2 bg-white/50 dark:bg-darkCard/30 border border-slate-200 dark:border-darkBorder/40 rounded-lg">
                  <span className="font-bold text-slate-700 dark:text-slate-200 truncate max-w-[150px]">{p.name}</span>
                  <Badge variant="danger">{p.stock} left</Badge>
                  <Button variant="primary" size="sm" onClick={() => navigate('/admin/inventory')} className="py-1 px-2 text-[10px]">
                    Restock
                  </Button>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Leave Requests alerts */}
        <Card className="p-5 flex flex-col gap-4 border border-amber-500/10 bg-amber-500/5">
          <h4 className="text-sm font-bold text-amber-500 flex items-center gap-1.5 uppercase tracking-wider font-display">
            <FileCheck className="h-4.5 w-4.5" /> Pending Leave Requests
          </h4>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto custom-scrollbar">
            {pendingLeaves.length === 0 ? (
              <p className="text-xs text-slate-400">No staff leaves pending review.</p>
            ) : (
              pendingLeaves.map((pl: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center text-xs p-2 bg-white/50 dark:bg-darkCard/30 border border-slate-200 dark:border-darkBorder/40 rounded-lg">
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-slate-700 dark:text-slate-200">{pl.empName}</span>
                    <span className="text-[10px] text-slate-400">{pl.leave.type} ({pl.leave.startDate})</span>
                  </div>
                  <Button variant="primary" size="sm" onClick={() => navigate('/admin/employees')} className="py-1 px-2 text-[10px]">
                    Review
                  </Button>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Driver Assignment Requests */}
        <Card className="p-5 flex flex-col gap-4 border border-accentTeal/10 bg-accentTeal/5">
          <h4 className="text-sm font-bold text-accentTeal flex items-center gap-1.5 uppercase tracking-wider font-display">
            <Truck className="h-4.5 w-4.5" /> Unassigned Bookings
          </h4>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto custom-scrollbar">
            {unassignedBookings.length === 0 ? (
              <p className="text-xs text-slate-400">All cargo bookings are assigned to drivers.</p>
            ) : (
              unassignedBookings.map((b) => (
                <div key={b.id} className="flex justify-between items-center text-xs p-2 bg-white/50 dark:bg-darkCard/30 border border-slate-200 dark:border-darkBorder/40 rounded-lg">
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-slate-700 dark:text-slate-200">{b.id}</span>
                    <span className="text-[10px] text-slate-400">{b.vehicleName} ({b.date})</span>
                  </div>
                  <Button variant="primary" size="sm" onClick={() => navigate('/admin/tempo')} className="py-1 px-2 text-[10px]">
                    Assign
                  </Button>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* 3. Recharts Analytics Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <RevenueTrends />
        </Card>
        <Card className="p-6">
          <SalesByCategory />
        </Card>
        <Card className="p-6">
          <BookingPerformance />
        </Card>
        <Card className="p-6">
          <EmployeePerformanceChart />
        </Card>
      </div>
    </div>
  );
};
