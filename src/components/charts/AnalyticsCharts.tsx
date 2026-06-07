import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// Mock charts data
const revenueData = [
  { month: 'Jan', revenue: 4500, bookings: 1200, sales: 3300 },
  { month: 'Feb', revenue: 5200, bookings: 1500, sales: 3700 },
  { month: 'Mar', revenue: 6100, bookings: 1900, sales: 4200 },
  { month: 'Apr', revenue: 5800, bookings: 1700, sales: 4100 },
  { month: 'May', revenue: 7300, bookings: 2400, sales: 4900 },
  { month: 'Jun', revenue: 8900, bookings: 3100, sales: 5800 }
];

const categoryData = [
  { name: 'Living Room', value: 45 },
  { name: 'Bedroom', value: 25 },
  { name: 'Office', value: 18 },
  { name: 'Dining', value: 12 }
];

const COLORS = ['#6366F1', '#06B6D4', '#8B5CF6', '#10B981'];

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ title, children }) => (
  <div className="w-full flex flex-col gap-4">
    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</h4>
    <div className="h-72 w-full flex items-center justify-center">
      {children}
    </div>
  </div>
);

export const RevenueTrends: React.FC = () => {
  return (
    <ChartContainer title="Revenue Trends (INR)">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800" />
          <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
          <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Area type="monotone" dataKey="sales" name="Furniture Sales" stroke="#6366F1" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
          <Area type="monotone" dataKey="bookings" name="Tempo Bookings" stroke="#06B6D4" strokeWidth={2} fillOpacity={1} fill="url(#colorBookings)" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export const SalesByCategory: React.FC = () => {
  return (
    <ChartContainer title="Sales Share By Category (%)">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {categoryData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export const BookingPerformance: React.FC = () => {
  const data = [
    { type: 'Mahindra Bolero', count: 48 },
    { type: 'Garuda Tractor', count: 36 },
    { type: 'Garuda JCB', count: 20 }
  ];

  return (
    <ChartContainer title="Tempo Service Booking Requests">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800" />
          <XAxis dataKey="type" stroke="#94A3B8" fontSize={11} tickLine={false} />
          <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
          />
          <Bar dataKey="count" name="Bookings" radius={[4, 4, 0, 0]}>
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6366F1' : '#06B6D4'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export const EmployeePerformanceChart: React.FC = () => {
  const data = [
    { name: 'Rajesh (Driver)', tasks: 12, comp: 90 },
    { name: 'Aisha (Designer)', tasks: 8, comp: 85 },
    { name: 'Arjun (Support)', tasks: 24, comp: 98 }
  ];

  return (
    <ChartContainer title="Employee Task Completion Rate (%)">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800" />
          <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
          <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} domain={[0, 100]} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
          />
          <Bar dataKey="comp" name="Completion %" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
