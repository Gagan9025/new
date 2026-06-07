import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import {
  FileText,
  Clock,
  CalendarDays,
  CreditCard,
  CheckCircle,
  Truck,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Inbox
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';

export const EmployeeDashboard: React.FC = () => {
  const {
    currentUser,
    employees,
    orders,
    enquiries,
    clockIn,
    clockOut,
    requestLeave,
    updateTaskStatus,
    updateOrderStatus,
    replyEnquiry
  } = useStore();

  const [activeSubTab, setActiveSubTab] = useState<'tasks' | 'orders' | 'attendance' | 'support'>('tasks');

  // Leave Form States
  const [leaveType, setLeaveType] = useState<'Sick Leave' | 'Casual Leave' | 'Earned Leave'>('Sick Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [leaveMsg, setLeaveMsg] = useState('');

  // Enquiry Reply States
  const [selectedEnqId, setSelectedEnqId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replyDone, setReplyDone] = useState('');

  const employee = employees.find(e => e.id === currentUser?.id);

  if (!currentUser || !employee) return null;

  // Filter assigned tasks, orders, and enquiries
  const tasks = employee.assignedTasks || [];
  const assignedOrders = orders.filter(o => o.assignedEmployeeId === currentUser.id);
  const employeeEnquiries = enquiries.filter(eq => {
    if (employee.role === 'Designer' && eq.serviceType === 'Interior') return true;
    if (employee.role === 'Driver' && eq.serviceType === 'Tempo') return true;
    if (employee.role === 'Support' && eq.serviceType === 'General') return true;
    return false;
  });

  const handleClockToggle = () => {
    if (employee.attendance.status === 'Present') {
      clockOut(currentUser.id);
    } else {
      clockIn(currentUser.id);
    }
  };

  const handleRequestLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason) return;

    requestLeave(currentUser.id, {
      type: leaveType,
      startDate,
      endDate,
      reason
    });

    setLeaveMsg('Leave request submitted to Admin!');
    setStartDate('');
    setEndDate('');
    setReason('');
    setTimeout(() => setLeaveMsg(''), 3000);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnqId || !replyText) return;

    replyEnquiry(selectedEnqId, replyText);
    setReplyDone('Reply dispatched to customer!');
    setReplyText('');
    setSelectedEnqId(null);
    setTimeout(() => setReplyDone(''), 3000);
  };

  // Calculate task completion rate
  const completedTasks = tasks.filter((t: any) => t.status === 'Completed').length;
  const taskRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 100;

  return (
    <div className="flex flex-col gap-8 text-left">
      {/* 1. Header Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-accentIndigo/10 blur-2xl pointer-events-none" />

        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
          <img
            src={employee.avatar}
            alt={employee.name}
            className="h-16 w-16 rounded-2xl object-cover border border-slate-200 dark:border-darkBorder"
          />
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white font-display">{employee.name}</h2>
            <p className="text-xs text-slate-400 font-semibold">{employee.email} | {employee.phone}</p>
            <div className="flex items-center gap-2 mt-1 justify-center md:justify-start">
              <Badge variant="purple">{employee.role}</Badge>
              <Badge variant={employee.attendance.status === 'Present' ? 'success' : 'default'}>
                {employee.attendance.status}
              </Badge>
            </div>
          </div>
        </div>

        {/* Action: Clock-In/Clock-Out Card */}
        <div className="flex flex-col sm:flex-row gap-4 items-center border border-slate-200/50 dark:border-darkBorder/40 rounded-2xl p-4 bg-slate-100/30 dark:bg-darkCard/20">
          <div className="flex flex-col items-center sm:items-start text-xs font-semibold text-slate-400">
            <span>Daily Attendance Tracker</span>
            {employee.attendance.status === 'Present' ? (
              <span className="text-emerald-500 font-bold mt-1">Clocked In @ {employee.attendance.clockIn}</span>
            ) : (
              <span className="text-slate-500 font-bold mt-1">Not Active Today</span>
            )}
          </div>
          <Button
            variant={employee.attendance.status === 'Present' ? 'danger' : 'primary'}
            size="sm"
            onClick={handleClockToggle}
          >
            {employee.attendance.status === 'Present' ? 'Clock Out' : 'Clock In Now'}
          </Button>
        </div>
      </div>

      {/* 2. Mini KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-5 flex items-center justify-between border-l-4 border-l-accentIndigo">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned Tasks</span>
            <div className="text-2xl font-black text-slate-800 dark:text-white font-display">{tasks.length}</div>
          </div>
          <Badge variant="purple">{taskRate}% Done</Badge>
        </Card>
        <Card className="p-5 flex items-center justify-between border-l-4 border-l-accentTeal">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned Orders</span>
            <div className="text-2xl font-black text-slate-800 dark:text-white font-display">{assignedOrders.length}</div>
          </div>
          <div className="p-2 rounded-lg bg-accentTeal/10 text-accentTeal"><Truck className="h-5 w-5" /></div>
        </Card>
        <Card className="p-5 flex items-center justify-between border-l-4 border-l-emerald-500">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Support Inbox</span>
            <div className="text-2xl font-black text-slate-800 dark:text-white font-display">{employeeEnquiries.length}</div>
          </div>
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500"><MessageSquare className="h-5 w-5" /></div>
        </Card>
        <Card className="p-5 flex items-center justify-between border-l-4 border-l-amber-500">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Take-Home Base</span>
            <div className="text-2xl font-black text-slate-800 dark:text-white font-display">₹{employee.salary.base}</div>
          </div>
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500"><CreditCard className="h-5 w-5" /></div>
        </Card>
      </div>

      {/* 3. Sub Tabs selectors */}
      <div className="flex gap-2 border-b border-slate-200/50 dark:border-darkBorder/40 pb-4 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveSubTab('tasks')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg border transition-all shrink-0 ${
            activeSubTab === 'tasks'
              ? 'border-accentTeal bg-accentTeal/10 text-accentTeal'
              : 'border-slate-200 dark:border-darkBorder text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-darkCard'
          }`}
        >
          <FileText className="h-4 w-4" /> Assigned Checklist ({tasks.length})
        </button>
        <button
          onClick={() => setActiveSubTab('orders')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg border transition-all shrink-0 ${
            activeSubTab === 'orders'
              ? 'border-accentTeal bg-accentTeal/10 text-accentTeal'
              : 'border-slate-200 dark:border-darkBorder text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-darkCard'
          }`}
        >
          <Truck className="h-4 w-4" /> Shipments & Dispatch ({assignedOrders.length})
        </button>
        <button
          onClick={() => setActiveSubTab('attendance')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg border transition-all shrink-0 ${
            activeSubTab === 'attendance'
              ? 'border-accentTeal bg-accentTeal/10 text-accentTeal'
              : 'border-slate-200 dark:border-darkBorder text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-darkCard'
          }`}
        >
          <CalendarDays className="h-4 w-4" /> Attendance & Leaves
        </button>
        <button
          onClick={() => setActiveSubTab('support')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg border transition-all shrink-0 ${
            activeSubTab === 'support'
              ? 'border-accentTeal bg-accentTeal/10 text-accentTeal'
              : 'border-slate-200 dark:border-darkBorder text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-darkCard'
          }`}
        >
          <MessageSquare className="h-4 w-4" /> Support Tickets ({employeeEnquiries.length})
        </button>
      </div>

      {/* 4. Tab contents details */}
      <div className="flex flex-col gap-6">
        
        {/* Checklist */}
        {activeSubTab === 'tasks' && (
          <div className="flex flex-col gap-4">
            {tasks.length === 0 ? (
              <Card className="p-8 text-center text-xs text-slate-500">No tasks assigned by Admin yet.</Card>
            ) : (
              tasks.map((t: any) => (
                <Card key={t.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-200/50 dark:border-darkBorder/35">
                  <div className="flex flex-col gap-1 text-left">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-800 dark:text-white">{t.title}</h4>
                      <Badge variant={t.status === 'Completed' ? 'success' : t.status === 'In Progress' ? 'info' : 'warning'}>
                        {t.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.description}</p>
                    <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">Due: {t.dueDate}</span>
                  </div>

                  {t.status !== 'Completed' && (
                    <div className="flex gap-2">
                      {t.status === 'Pending' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => updateTaskStatus(currentUser.id, t.id, 'In Progress')}
                        >
                          Start Work
                        </Button>
                      )}
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => updateTaskStatus(currentUser.id, t.id, 'Completed')}
                      >
                        Mark Completed
                      </Button>
                    </div>
                  )}
                </Card>
              ))
            )}
          </div>
        )}

        {/* Shipments / Orders */}
        {activeSubTab === 'orders' && (
          <div className="flex flex-col gap-4">
            {assignedOrders.length === 0 ? (
              <Card className="p-8 text-center text-xs text-slate-500">No shipments assigned to your route.</Card>
            ) : (
              assignedOrders.map((ord) => (
                <Card key={ord.id} className="p-5 flex flex-col gap-3 border border-slate-200/50 dark:border-darkBorder/35">
                  <div className="flex justify-between items-center gap-4 flex-wrap border-b border-slate-100 dark:border-darkBorder/30 pb-2">
                    <span className="text-sm font-bold text-slate-800 dark:text-white">Order: {ord.id}</span>
                    <Badge variant="warning">{ord.status}</Badge>
                  </div>
                  <div className="text-xs flex flex-col gap-1">
                    <div><span className="font-bold text-slate-400 uppercase text-[10px]">Client:</span> {ord.customerName}</div>
                    <div><span className="font-bold text-slate-400 uppercase text-[10px]">Address:</span> {ord.shippingAddress}</div>
                  </div>
                  
                  {/* Status Dispatch Toggles */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs font-semibold text-slate-400 mr-2">Dispatched Status Update:</span>
                    {ord.status === 'Pending' && (
                      <Button variant="secondary" size="sm" onClick={() => updateOrderStatus(ord.id, 'Packing')}>
                        Mark Packing
                      </Button>
                    )}
                    {ord.status === 'Packing' && (
                      <Button variant="secondary" size="sm" onClick={() => updateOrderStatus(ord.id, 'Shipped')}>
                        Dispatch Shipped
                      </Button>
                    )}
                    {ord.status === 'Shipped' && (
                      <Button variant="primary" size="sm" onClick={() => updateOrderStatus(ord.id, 'Delivered')}>
                        Complete Handover (Delivered)
                      </Button>
                    )}
                    {ord.status === 'Delivered' && (
                      <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" /> Delivered Successfully
                      </span>
                    )}
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Attendance & Leave logs */}
        {activeSubTab === 'attendance' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Form */}
            <Card className="lg:col-span-1 p-5 flex flex-col gap-4">
              <h4 className="font-bold text-sm text-slate-800 dark:text-white font-display uppercase tracking-wider">
                File Leave Request
              </h4>
              <form onSubmit={handleRequestLeave} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 text-xs text-left">
                  <label className="font-semibold text-slate-400">Leave Reason Category</label>
                  <select 
                    className="glass-input p-2.5 mt-1"
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value as any)}
                  >
                    <option value="Sick Leave" className="bg-white dark:bg-darkCard">Sick Leave</option>
                    <option value="Casual Leave" className="bg-white dark:bg-darkCard">Casual Leave</option>
                    <option value="Earned Leave" className="bg-white dark:bg-darkCard">Earned Leave</option>
                  </select>
                </div>
                <Input
                  label="From Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
                <Input
                  label="To Date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
                <div className="flex flex-col gap-1.5 text-left text-xs">
                  <label className="font-semibold text-slate-400">Reason Details</label>
                  <textarea
                    rows={3}
                    placeholder="Brief reason details..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    className="glass-input p-2 resize-none focus:outline-none"
                  />
                </div>
                {leaveMsg && (
                  <span className="text-xs text-emerald-500 font-bold border border-emerald-500/20 bg-emerald-500/10 py-2 rounded-lg flex items-center justify-center gap-1">
                    <CheckCircle className="h-4.5 w-4.5" /> {leaveMsg}
                  </span>
                )}
                <Button variant="primary" type="submit">
                  Submit Request
                </Button>
              </form>
            </Card>

            {/* List */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <h4 className="font-bold text-sm text-slate-800 dark:text-white font-display uppercase tracking-wider">
                My File History
              </h4>
              
              <div className="flex flex-col gap-4">
                {employee.leaves.length === 0 ? (
                  <Card className="p-6 text-center text-xs text-slate-500">No leave records filed.</Card>
                ) : (
                  employee.leaves.map((l: any) => (
                    <Card key={l.id} className="p-4 flex justify-between items-center border border-slate-200/50 dark:border-darkBorder/30">
                      <div className="flex flex-col gap-1 text-left text-xs">
                        <span className="font-bold text-slate-700 dark:text-slate-200">{l.type}</span>
                        <span className="text-slate-400">{l.startDate} to {l.endDate}</span>
                        <span className="italic text-slate-500">Reason: {l.reason}</span>
                      </div>
                      <Badge variant={l.status === 'Approved' ? 'success' : l.status === 'Rejected' ? 'danger' : 'warning'}>
                        {l.status}
                      </Badge>
                    </Card>
                  ))
                )}
              </div>

              {/* Salary Payslips History */}
              <h4 className="font-bold text-sm text-slate-800 dark:text-white font-display uppercase tracking-wider mt-4">
                Compensation & Digital Payslips
              </h4>
              <div className="flex flex-col gap-3">
                {employee.salary.history.length === 0 ? (
                  <Card className="p-6 text-center text-xs text-slate-500">No payslips issued yet.</Card>
                ) : (
                  employee.salary.history.map((pay: any) => (
                    <Card key={pay.id} className="p-4 flex items-center justify-between border border-slate-200/50 dark:border-darkBorder/30">
                      <div className="flex flex-col gap-0.5 text-left text-xs">
                        <span className="font-bold text-slate-700 dark:text-slate-200">{pay.month}</span>
                        <span className="text-slate-400">Issued: {pay.generatedDate}</span>
                      </div>
                      <div className="text-right text-xs">
                        <div className="font-black text-slate-800 dark:text-white">₹{pay.netSalary}</div>
                        <Badge variant="success" className="mt-1">Paid</Badge>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Support Tickets */}
        {activeSubTab === 'support' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Tickets List */}
            <div className="lg:col-span-1 flex flex-col gap-3">
              <h4 className="font-bold text-xs text-slate-400 uppercase tracking-widest">Client Tickets</h4>
              <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {employeeEnquiries.length === 0 ? (
                  <div className="text-xs text-slate-400 text-center py-6">No support tickets found.</div>
                ) : (
                  employeeEnquiries.map((eq) => (
                    <button
                      key={eq.id}
                      onClick={() => setSelectedEnqId(eq.id)}
                      className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                        selectedEnqId === eq.id
                          ? 'border-accentTeal bg-accentTeal/10'
                          : 'border-slate-200 dark:border-darkBorder/40 bg-white dark:bg-darkCard hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-center gap-2 text-xs">
                        <span className="font-bold text-slate-700 dark:text-slate-200">{eq.name}</span>
                        <Badge variant={eq.status === 'Resolved' ? 'success' : 'warning'}>{eq.status}</Badge>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-1">{eq.message}</p>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Answer Board */}
            <div className="lg:col-span-2">
              {replyDone && (
                <div className="mb-4 text-xs text-emerald-500 font-bold border border-emerald-500/20 bg-emerald-500/10 py-2 rounded-lg flex items-center justify-center gap-1.5">
                  <CheckCircle className="h-4.5 w-4.5" /> {replyDone}
                </div>
              )}

              {selectedEnqId ? (
                (() => {
                  const activeEnq = enquiries.find(eq => eq.id === selectedEnqId);
                  if (!activeEnq) return null;

                  return (
                    <Card className="p-6 flex flex-col gap-4">
                      <div className="flex justify-between items-start gap-4 border-b border-slate-100 dark:border-darkBorder/30 pb-3">
                        <div className="text-left flex flex-col gap-0.5">
                          <h4 className="font-bold text-base text-slate-800 dark:text-white font-display">{activeEnq.name}</h4>
                          <span className="text-[10px] text-slate-400 font-semibold">{activeEnq.email} | {activeEnq.phone}</span>
                        </div>
                        <Badge variant={activeEnq.status === 'Resolved' ? 'success' : 'warning'}>{activeEnq.status}</Badge>
                      </div>
                      
                      <div className="bg-slate-100/50 dark:bg-darkBg/50 border border-slate-200/50 dark:border-darkBorder/30 rounded-xl p-4 text-xs">
                        <span className="font-bold text-slate-400 uppercase text-[9px]">Enquiry message ({activeEnq.date}):</span>
                        <p className="text-slate-700 dark:text-slate-200 leading-relaxed mt-1">{activeEnq.message}</p>
                      </div>

                      {activeEnq.status === 'Resolved' && activeEnq.replyText && (
                        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 text-xs text-emerald-600 dark:text-emerald-400">
                          <span className="font-bold uppercase text-[9px]">Dispatched response:</span>
                          <p className="leading-relaxed mt-1">{activeEnq.replyText}</p>
                        </div>
                      )}

                      {activeEnq.status !== 'Resolved' && (
                        <form onSubmit={handleReplySubmit} className="flex flex-col gap-3 text-left">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Send Response Reply</label>
                          <textarea
                            rows={4}
                            placeholder="Draft reply dispatch text here..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            required
                            className="glass-input p-3 text-sm focus:outline-none resize-none"
                          />
                          <Button variant="primary" type="submit" className="w-fit self-end">
                            Dispatched Answer
                          </Button>
                        </form>
                      )}
                    </Card>
                  );
                })()
              ) : (
                <Card className="h-full flex flex-col items-center justify-center py-20 text-center gap-2 border border-dashed border-slate-300 dark:border-darkBorder/40">
                  <Inbox className="h-8 w-8 text-slate-400" />
                  <h4 className="font-bold text-slate-700 dark:text-slate-300">No active ticket open</h4>
                  <p className="text-xs text-slate-500">Select a support ticket from the sidebar deck to type replies.</p>
                </Card>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
