import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { ShoppingCart, UserCheck, Eye, RefreshCw, FileText, Printer, CheckCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';

export const OrderManagement: React.FC = () => {
  const { orders, employees, updateOrderStatus, assignOrderEmployee } = useStore();

  const [selectedOrdId, setSelectedOrdId] = useState<string | null>(null);
  const [invoiceOrdId, setInvoiceOrdId] = useState<string | null>(null);

  // Filter dispatch personnel (Delivery crew / drivers)
  const dispatchStaff = employees.filter(e => e.role === 'Delivery' || e.role === 'Driver');

  const selectedOrder = orders.find(o => o.id === selectedOrdId);
  const invoiceOrder = orders.find(o => o.id === invoiceOrdId);

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex justify-between items-center flex-wrap gap-4 border-b border-slate-200/50 dark:border-darkBorder/40 pb-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white font-display flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-accentTeal" /> Customer Order Processor
        </h3>
      </div>

      {/* Main orders table */}
      <Card className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100 dark:bg-darkBg/60 border-b border-slate-200 dark:border-darkBorder/40 font-bold uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Purchase Date</th>
              <th className="px-6 py-4">Total Amount</th>
              <th className="px-6 py-4">Current Status</th>
              <th className="px-6 py-4">Delivery Partner</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/50 dark:divide-darkBorder/30 text-slate-700 dark:text-slate-300 font-medium">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-slate-400">No client orders recorded.</td>
              </tr>
            ) : (
              orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/50 dark:hover:bg-darkCard/10 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">{ord.id}</td>
                  <td className="px-6 py-4">{ord.customerName}</td>
                  <td className="px-6 py-4">{ord.date}</td>
                  <td className="px-6 py-4 font-bold">₹{ord.totalAmount}</td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      ord.status === 'Delivered' ? 'success' :
                      ord.status === 'Cancelled' ? 'danger' :
                      ord.status === 'Shipped' ? 'info' : 'warning'
                    }>
                      {ord.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    {ord.assignedEmployeeName ? (
                      <span className="font-semibold text-accentIndigo dark:text-accentTeal">{ord.assignedEmployeeName}</span>
                    ) : (
                      <span className="text-slate-400 font-semibold">Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedOrdId(ord.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-darkCard dark:hover:bg-slate-800 text-slate-600 dark:text-slate-200 border border-slate-200 dark:border-darkBorder"
                        title="Update Dispatch Status"
                      >
                        <RefreshCw className="h-3.5 w-3.5" /> Dispatch
                      </button>
                      <Button
                        variant="primary"
                        size="sm"
                        className="py-1 px-2 text-[10px]"
                        onClick={() => setInvoiceOrdId(ord.id)}
                        leftIcon={<FileText className="h-3.5 w-3.5" />}
                      >
                        Invoice
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      {/* Dispatch Detail Modal */}
      <Modal
        isOpen={selectedOrdId !== null}
        onClose={() => setSelectedOrdId(null)}
        title={`Dispatch workflow for order ${selectedOrdId}`}
        size="md"
      >
        {selectedOrder && (
          <div className="flex flex-col gap-5 text-left text-xs">
            <div className="flex flex-col gap-1 border-b border-slate-100 dark:border-darkBorder/40 pb-3">
              <span className="font-bold text-slate-400 uppercase text-[9px]">Shipping Street Address</span>
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{selectedOrder.shippingAddress}</p>
            </div>

            {/* Select Status */}
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-slate-400 uppercase text-[9px]">Advance Dispatch Status</label>
              <select
                value={selectedOrder.status}
                onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value as any)}
                className="glass-input p-2.5 cursor-pointer"
              >
                <option value="Pending" className="bg-white dark:bg-darkCard">Pending Review</option>
                <option value="Packing" className="bg-white dark:bg-darkCard">Packing Warehouses</option>
                <option value="Shipped" className="bg-white dark:bg-darkCard">Shipped (In Transit)</option>
                <option value="Delivered" className="bg-white dark:bg-darkCard">Delivered Handover</option>
                <option value="Cancelled" className="bg-white dark:bg-darkCard">Cancelled Order</option>
              </select>
            </div>

            {/* Assign Driver */}
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-slate-400 uppercase text-[9px]">Assign Delivery Crew</label>
              <select
                value={selectedOrder.assignedEmployeeId || ''}
                onChange={(e) => assignOrderEmployee(selectedOrder.id, e.target.value)}
                className="glass-input p-2.5 cursor-pointer"
              >
                <option value="" className="bg-white dark:bg-darkCard">Select Delivery Partner</option>
                {dispatchStaff.map((staff) => (
                  <option key={staff.id} value={staff.id} className="bg-white dark:bg-darkCard">
                    {staff.name} ({staff.role})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-darkBorder/40">
              <Button variant="primary" onClick={() => setSelectedOrdId(null)}>Done</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Invoice Generator Modal */}
      <Modal
        isOpen={invoiceOrdId !== null}
        onClose={() => setInvoiceOrdId(null)}
        title="Digital Invoice Print-Out"
        size="lg"
      >
        {invoiceOrder && (
          <div className="flex flex-col gap-6 text-left p-4 bg-white text-slate-900 rounded-xl" id="print-area">
            {/* Invoice Header */}
            <div className="flex justify-between items-start gap-4">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-slate-800 tracking-wider">ROYAL'S COMPANY LOGISTICS</h2>
                <span className="text-[10px] text-slate-500 font-semibold mt-0.5">Corporate HQ, Noida, UP, India</span>
              </div>
              <div className="text-right">
                <h3 className="text-lg font-black text-slate-500">INVOICE</h3>
                <span className="text-xs font-bold text-slate-700">ID: {invoiceOrder.id}</span>
              </div>
            </div>

            <div className="h-px bg-slate-200" />

            {/* Billing coordinates */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-slate-400 uppercase text-[9px]">Bill To Client</span>
                <span className="font-bold text-slate-800">{invoiceOrder.customerName}</span>
                <span className="text-slate-500">{invoiceOrder.customerEmail}</span>
              </div>
              <div className="flex flex-col gap-0.5 text-right">
                <span className="font-bold text-slate-400 uppercase text-[9px]">Shipment Location</span>
                <span className="font-semibold text-slate-700 leading-tight">{invoiceOrder.shippingAddress}</span>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-y border-slate-200 font-bold uppercase tracking-wider text-slate-400 text-[10px]">
                <tr>
                  <th className="px-4 py-2">Item Name</th>
                  <th className="px-4 py-2 text-center">Qty</th>
                  <th className="px-4 py-2 text-right">Unit Rate</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {invoiceOrder.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-3 text-slate-800 font-bold">{item.name}</td>
                    <td className="px-4 py-3 text-center">{item.quantity}</td>
                    <td className="px-4 py-3 text-right">₹{item.price}</td>
                    <td className="px-4 py-3 text-right font-bold">₹{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-start gap-4">
              <div className="text-xs text-slate-400 font-semibold italic">
                * Payment method processed: {invoiceOrder.paymentMethod}
              </div>
              <div className="text-right text-xs flex flex-col gap-1 w-48 font-semibold text-slate-500">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-slate-800">₹{invoiceOrder.totalAmount}.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (0%):</span>
                  <span className="text-slate-800">₹0.00</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-slate-900 border-t border-slate-200 pt-1 mt-1">
                  <span>Grand Total:</span>
                  <span>₹{invoiceOrder.totalAmount}.00</span>
                </div>
              </div>
            </div>

            {/* Modal print buttons */}
            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-200">
              <Button variant="secondary" onClick={() => setInvoiceOrdId(null)}>Close</Button>
              <Button variant="primary" onClick={handlePrintInvoice} leftIcon={<Printer className="h-4 w-4" />}>
                Print Invoice
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
