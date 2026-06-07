import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Truck, UserCheck, RefreshCw, MapPin } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';

export const TempoBookingManagement: React.FC = () => {
  const { bookings, employees, assignBookingDriver, updateBookingStatus } = useStore();

  const [selectedBkgId, setSelectedBkgId] = useState<string | null>(null);

  // Filter employees with role 'Driver'
  const drivers = employees.filter(e => e.role === 'Driver');

  const selectedBooking = bookings.find(b => b.id === selectedBkgId);

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex justify-between items-center flex-wrap gap-4 border-b border-slate-200/50 dark:border-darkBorder/40 pb-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white font-display flex items-center gap-2">
          <Truck className="h-5 w-5 text-accentTeal" /> Tempo Booking Dispatcher
        </h3>
      </div>

      {/* Main bookings table */}
      <Card className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100 dark:bg-darkBg/60 border-b border-slate-200 dark:border-darkBorder/40 font-bold uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-6 py-4">Booking ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Vehicle Model</th>
              <th className="px-6 py-4">Trip Schedule</th>
              <th className="px-6 py-4">Est. Fare</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Assigned Driver</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/50 dark:divide-darkBorder/30 text-slate-700 dark:text-slate-300 font-medium">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-slate-400">No cargo bookings filed.</td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/50 dark:hover:bg-darkCard/10 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">{b.id}</td>
                  <td className="px-6 py-4 flex flex-col text-left">
                    <span className="font-bold text-slate-800 dark:text-white leading-tight">{b.customerName}</span>
                    <span className="text-[10px] text-slate-400">{b.customerPhone}</span>
                  </td>
                  <td className="px-6 py-4">{b.vehicleName}</td>
                  <td className="px-6 py-4">{b.date} @ {b.time}</td>
                  <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">₹{b.totalCost}</td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      b.status === 'Completed' ? 'success' :
                      b.status === 'Cancelled' ? 'danger' :
                      b.status === 'In Transit' ? 'info' : 'warning'
                    }>
                      {b.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    {b.assignedDriverName ? (
                      <span className="font-semibold text-accentIndigo dark:text-accentTeal">{b.assignedDriverName}</span>
                    ) : (
                      <span className="text-slate-400 font-semibold">Driver Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedBkgId(b.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-darkCard dark:hover:bg-slate-800 text-slate-600 dark:text-slate-200 border border-slate-200 dark:border-darkBorder"
                    >
                      <RefreshCw className="h-3.5 w-3.5" /> Dispatch Driver
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      {/* Booking Dispatch Modal */}
      <Modal
        isOpen={selectedBkgId !== null}
        onClose={() => setSelectedBkgId(null)}
        title={`Logistics Dispatch for Booking ${selectedBkgId}`}
        size="md"
      >
        {selectedBooking && (
          <div className="flex flex-col gap-4 text-left text-xs">
            <div className="flex flex-col gap-2 bg-slate-50 dark:bg-darkBg/50 border border-slate-200/50 dark:border-darkBorder/40 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accentTeal mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[9px]">Pickup Coordinates</span>
                  <p className="text-slate-700 dark:text-slate-200 leading-tight mt-0.5">{selectedBooking.pickupAddress}</p>
                </div>
              </div>
              <div className="h-px bg-slate-200 dark:bg-darkBorder/30 my-1" />
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accentIndigo mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[9px]">Drop Coordinates</span>
                  <p className="text-slate-700 dark:text-slate-200 leading-tight mt-0.5">{selectedBooking.dropAddress}</p>
                </div>
              </div>
            </div>

            {/* Select Status */}
            <div className="flex flex-col gap-1.5 mt-2">
              <label className="font-bold text-slate-400 uppercase text-[9px]">Shifting Journey Status</label>
              <select
                value={selectedBooking.status}
                onChange={(e) => updateBookingStatus(selectedBooking.id, e.target.value as any)}
                className="glass-input p-2.5 cursor-pointer"
              >
                <option value="Pending" className="bg-white dark:bg-darkCard">Pending Review</option>
                <option value="Assigned" className="bg-white dark:bg-darkCard">Assigned Driver</option>
                <option value="In Transit" className="bg-white dark:bg-darkCard">In Transit (Shipping)</option>
                <option value="Completed" className="bg-white dark:bg-darkCard">Trip Completed</option>
                <option value="Cancelled" className="bg-white dark:bg-darkCard">Trip Cancelled</option>
              </select>
            </div>

            {/* Assign Driver */}
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-slate-400 uppercase text-[9px]">Assign Driver Shifter</label>
              <select
                value={selectedBooking.assignedDriverId || ''}
                onChange={(e) => assignBookingDriver(selectedBooking.id, e.target.value)}
                className="glass-input p-2.5 cursor-pointer"
              >
                <option value="" className="bg-white dark:bg-darkCard">Select Driver Partner</option>
                {drivers.map((drv) => (
                  <option key={drv.id} value={drv.id} className="bg-white dark:bg-darkCard">
                    {drv.name} ({drv.phone})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-darkBorder/40">
              <Button variant="primary" onClick={() => setSelectedBkgId(null)}>Done</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
