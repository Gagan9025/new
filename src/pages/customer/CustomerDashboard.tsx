import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { ShoppingBag, Truck, MapPin, Settings, Heart, AlertCircle, CheckCircle, Bell, Plus, Trash2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';

export const CustomerDashboard: React.FC = () => {
  const { currentUser, customers, orders, bookings, editCustomer, logCustomerActivity } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'bookings' | 'addresses' | 'settings'>('orders');

  const customer = customers.find(c => c.id === currentUser?.id);

  // Address editing states
  const [newAddress, setNewAddress] = useState('');
  const [isAddingAddr, setIsAddingAddr] = useState(false);

  // Profile forms
  const [name, setName] = useState(customer?.name || currentUser?.name || '');
  const [phone, setPhone] = useState(customer?.phone || '');
  const [profileMsg, setProfileMsg] = useState('');

  if (!currentUser || !customer) return null;

  // Filter orders and bookings for this specific customer
  const customerOrders = orders.filter(o => o.customerId === currentUser.id);
  const customerBookings = bookings.filter(b => b.customerId === currentUser.id);
  const addresses = customer.addresses || [];

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    editCustomer(currentUser.id, { name, phone });
    setProfileMsg('Profile updated successfully!');
    logCustomerActivity(currentUser.id, 'Updated profile contacts');
    setTimeout(() => setProfileMsg(''), 3000);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress) return;
    const nextAddresses = [...addresses, newAddress];
    editCustomer(currentUser.id, { addresses: nextAddresses });
    logCustomerActivity(currentUser.id, `Added shipping location: ${newAddress}`);
    setNewAddress('');
    setIsAddingAddr(false);
  };

  const handleDeleteAddress = (idx: number) => {
    const nextAddresses = addresses.filter((_: any, i: number) => i !== idx);
    editCustomer(currentUser.id, { addresses: nextAddresses });
    logCustomerActivity(currentUser.id, `Deleted saved address index: ${idx}`);
  };

  return (
    <div className="flex flex-col gap-8 text-left">
      {/* 1. Profile banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-accentIndigo/10 blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-accentIndigo to-accentTeal flex items-center justify-center text-white text-2xl font-black shadow-md">
            {customer.name.charAt(0)}
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white font-display">{customer.name}</h2>
            <p className="text-xs text-slate-400 font-semibold">{customer.email}</p>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Joined: {customer.joinedDate || '2026-06-01'}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-black text-accentIndigo dark:text-accentTeal">{customerOrders.length}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Orders</div>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-darkBorder/40" />
          <div className="text-center">
            <div className="text-2xl font-black text-accentIndigo dark:text-accentTeal">{customerBookings.length}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cargo Bookings</div>
          </div>
        </div>
      </div>

      {/* 2. Navigation tab chips */}
      <div className="flex gap-2 border-b border-slate-200/50 dark:border-darkBorder/40 pb-4 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg border transition-all shrink-0 ${
            activeTab === 'orders'
              ? 'border-accentTeal bg-accentTeal/10 text-accentTeal'
              : 'border-slate-200 dark:border-darkBorder text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-darkCard'
          }`}
        >
          <ShoppingBag className="h-4 w-4" /> My Orders
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg border transition-all shrink-0 ${
            activeTab === 'bookings'
              ? 'border-accentTeal bg-accentTeal/10 text-accentTeal'
              : 'border-slate-200 dark:border-darkBorder text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-darkCard'
          }`}
        >
          <Truck className="h-4 w-4" /> Logistics Bookings
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg border transition-all shrink-0 ${
            activeTab === 'addresses'
              ? 'border-accentTeal bg-accentTeal/10 text-accentTeal'
              : 'border-slate-200 dark:border-darkBorder text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-darkCard'
          }`}
        >
          <MapPin className="h-4 w-4" /> Saved Addresses
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg border transition-all shrink-0 ${
            activeTab === 'settings'
              ? 'border-accentTeal bg-accentTeal/10 text-accentTeal'
              : 'border-slate-200 dark:border-darkBorder text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-darkCard'
          }`}
        >
          <Settings className="h-4 w-4" /> Profile Settings
        </button>
      </div>

      {/* 3. Tab Contents */}
      <div className="flex flex-col gap-6">
        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="flex flex-col gap-4">
            {customerOrders.length === 0 ? (
              <Card className="p-8 text-center flex flex-col items-center justify-center gap-3 py-16">
                <ShoppingBag className="h-10 w-10 text-slate-400" />
                <h4 className="font-bold text-slate-700 dark:text-slate-300">No Orders Placed</h4>
                <p className="text-xs text-slate-500">Buy designer sofas or platform beds in our store.</p>
              </Card>
            ) : (
              customerOrders.map((ord) => (
                <Card key={ord.id} className="overflow-hidden border border-slate-200/50 dark:border-darkBorder/40">
                  <Card.Header className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Order ID</span>
                      <span className="text-sm font-bold text-slate-800 dark:text-white">{ord.id}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Order Date</span>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{ord.date}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Amount</span>
                      <span className="text-sm font-black text-slate-800 dark:text-white">₹{ord.totalAmount.toFixed(2)}</span>
                    </div>
                    <div>
                      <Badge variant={
                        ord.status === 'Delivered' ? 'success' :
                        ord.status === 'Cancelled' ? 'danger' :
                        ord.status === 'Shipped' ? 'info' : 'warning'
                      }>
                        {ord.status}
                      </Badge>
                    </div>
                  </Card.Header>

                  <Card.Content className="flex flex-col gap-4 p-5">
                    {/* Item list */}
                    <div className="flex flex-col gap-3">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-center">
                          <img src={item.image} alt={item.name} className="h-12 w-12 object-cover rounded-lg flex-shrink-0" />
                          <div className="flex-grow text-left">
                            <h5 className="font-bold text-sm text-slate-800 dark:text-white line-clamp-1">{item.name}</h5>
                            <span className="text-xs text-slate-400">Qty: {item.quantity} × ₹{item.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="h-px bg-slate-100 dark:bg-darkBorder/30 my-1" />

                    <div className="flex flex-col sm:flex-row justify-between text-xs text-slate-400 font-semibold gap-2">
                      <span>Shipping Address: <span className="text-slate-700 dark:text-slate-200">{ord.shippingAddress}</span></span>
                      {ord.assignedEmployeeName && (
                        <span>Delivery Partner: <span className="text-accentTeal font-bold">{ord.assignedEmployeeName}</span></span>
                      )}
                    </div>
                  </Card.Content>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="flex flex-col gap-4">
            {customerBookings.length === 0 ? (
              <Card className="p-8 text-center flex flex-col items-center justify-center gap-3 py-16">
                <Truck className="h-10 w-10 text-slate-400" />
                <h4 className="font-bold text-slate-700 dark:text-slate-300">No Logistics Requests</h4>
                <p className="text-xs text-slate-500">Book our shifting vehicles to relocate your furniture cargo.</p>
              </Card>
            ) : (
              customerBookings.map((bkg) => (
                <Card key={bkg.id} className="overflow-hidden border border-slate-200/50 dark:border-darkBorder/40">
                  <Card.Header className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Booking ID</span>
                      <span className="text-sm font-bold text-slate-800 dark:text-white">{bkg.id}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vehicle Model</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-white">{bkg.vehicleName}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Schedule</span>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{bkg.date} @ {bkg.time}</span>
                    </div>
                    <div>
                      <Badge variant={
                        bkg.status === 'Completed' ? 'success' :
                        bkg.status === 'Cancelled' ? 'danger' :
                        bkg.status === 'In Transit' ? 'info' : 'warning'
                      }>
                        {bkg.status}
                      </Badge>
                    </div>
                  </Card.Header>

                  <Card.Content className="flex flex-col gap-3 p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Pickup Location</span>
                        <p className="text-slate-700 dark:text-slate-200 leading-tight">{bkg.pickupAddress}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Drop Location</span>
                        <p className="text-slate-700 dark:text-slate-200 leading-tight">{bkg.dropAddress}</p>
                      </div>
                    </div>

                    <div className="h-px bg-slate-100 dark:bg-darkBorder/30 my-1" />

                    <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-semibold gap-2">
                      <span>Trip Distance: <span className="text-slate-700 dark:text-slate-200">{bkg.distanceKm} km</span></span>
                      <span>Total Shifting Cost: <span className="text-accentTeal font-bold">₹{bkg.totalCost}</span></span>
                      {bkg.assignedDriverName && (
                        <span>Assigned Driver: <span className="text-accentIndigo font-bold">{bkg.assignedDriverName}</span></span>
                      )}
                    </div>
                  </Card.Content>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Saved Addresses</h3>
              <Button variant="primary" size="sm" onClick={() => setIsAddingAddr(!isAddingAddr)} leftIcon={<Plus className="h-4 w-4" />}>
                Add Address
              </Button>
            </div>

            {isAddingAddr && (
              <Card className="p-4 border border-white/10">
                <form onSubmit={handleAddAddress} className="flex gap-3">
                  <Input 
                    placeholder="Enter full street address"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    required
                  />
                  <Button variant="primary" type="submit">Save</Button>
                </form>
              </Card>
            )}

            {addresses.length === 0 ? (
              <Card className="p-8 text-center text-xs text-slate-500">No addresses saved. Add one to checkout quickly.</Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr: string, idx: number) => (
                  <Card key={idx} className="p-4 flex justify-between items-center border border-slate-200/50 dark:border-darkBorder/30">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="h-4 w-4 text-accentTeal mt-0.5 shrink-0" />
                      <span className="text-xs text-slate-700 dark:text-slate-200 leading-tight">{addr}</span>
                    </div>
                    <button 
                      onClick={() => handleDeleteAddress(idx)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1"
                      title="Delete Address"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <Card className="p-6 max-w-lg">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Edit Profile details</h3>
            <form onSubmit={handleProfileUpdate} className="flex flex-col gap-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              {profileMsg && (
                <span className="text-xs text-emerald-500 font-bold border border-emerald-500/20 bg-emerald-500/10 py-2 rounded-lg flex items-center justify-center gap-1.5">
                  <CheckCircle className="h-4 w-4" /> {profileMsg}
                </span>
              )}

              <Button variant="primary" type="submit" className="w-fit self-end">
                Save Profile
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};
