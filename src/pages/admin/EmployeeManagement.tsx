import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { UserCheck, Plus, Pencil, Trash2, ShieldCheck, XCircle, Clock, CalendarDays } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';

export const EmployeeManagement: React.FC = () => {
  const { employees, addEmployee, editEmployee, deleteEmployee, updateLeaveStatus } = useStore();
  
  // Add Employee Form States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'Designer' | 'Driver' | 'Delivery' | 'Support'>('Designer');
  const [baseSalary, setBaseSalary] = useState(30000);

  // Edit Employee Form States
  const [editEmpId, setEditEmpId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editRole, setEditRole] = useState<'Admin' | 'Designer' | 'Driver' | 'Delivery' | 'Support'>('Designer');

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    
    addEmployee({
      name,
      email,
      phone: phone || '+91 90000 00000',
      role,
      baseSalary,
      avatar: `https://images.unsplash.com/photo-${role === 'Designer' ? '1534528741775-53994a69daeb' : '1507003211169-0a1dd7228f2d'}?w=150&auto=format&fit=crop&q=60`
    });

    setName('');
    setEmail('');
    setPhone('');
    setBaseSalary(30000);
    setIsAddOpen(false);
  };

  const openEdit = (emp: any) => {
    setEditEmpId(emp.id);
    setEditName(emp.name);
    setEditPhone(emp.phone);
    setEditRole(emp.role);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editEmpId) return;
    editEmployee(editEmpId, { name: editName, phone: editPhone, role: editRole });
    setEditEmpId(null);
  };

  // Compile all leaves pending approval
  const pendingLeaves = employees.reduce((list: any[], emp) => {
    emp.leaves.forEach(l => {
      if (l.status === 'Pending') {
        list.push({ empId: emp.id, empName: emp.name, leave: l });
      }
    });
    return list;
  }, []);

  return (
    <div className="flex flex-col gap-8 text-left">
      <div className="flex justify-between items-center flex-wrap gap-4 border-b border-slate-200/50 dark:border-darkBorder/40 pb-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white font-display flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-accentTeal" /> Employee Roster Directory
        </h3>
        
        <Button variant="primary" size="sm" onClick={() => setIsAddOpen(true)} leftIcon={<Plus className="h-4 w-4" />}>
          Add Employee
        </Button>
      </div>

      {/* Leave Approval Panel */}
      {pendingLeaves.length > 0 && (
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <CalendarDays className="h-4 w-4 text-amber-500" /> Pending Leave Approvals
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingLeaves.map((pl: any) => (
              <Card key={pl.leave.id} className="p-4 flex flex-col justify-between border-t-4 border-t-amber-500 bg-amber-500/5 gap-3">
                <div className="flex flex-col gap-1 text-xs">
                  <span className="font-bold text-slate-800 dark:text-white">{pl.empName}</span>
                  <span className="text-slate-400 font-semibold">{pl.leave.type}</span>
                  <span className="text-slate-500">{pl.leave.startDate} to {pl.leave.endDate}</span>
                  <p className="italic text-slate-400 mt-1">"{pl.leave.reason}"</p>
                </div>
                <div className="flex gap-2 justify-end mt-2">
                  <Button 
                    variant="danger" 
                    size="sm"
                    className="py-1 px-2.5 text-xs"
                    onClick={() => updateLeaveStatus(pl.empId, pl.leave.id, 'Rejected')}
                    leftIcon={<XCircle className="h-3.5 w-3.5" />}
                  >
                    Reject
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm"
                    className="py-1 px-2.5 text-xs bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => updateLeaveStatus(pl.empId, pl.leave.id, 'Approved')}
                    leftIcon={<ShieldCheck className="h-3.5 w-3.5" />}
                  >
                    Approve
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Workforce Roster table */}
      <Card className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100 dark:bg-darkBg/60 border-b border-slate-200 dark:border-darkBorder/40 font-bold uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4">Role Tier</th>
              <th className="px-6 py-4">Contact Phone</th>
              <th className="px-6 py-4">Take-Home Base</th>
              <th className="px-6 py-4">Shift Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/50 dark:divide-darkBorder/30 text-slate-700 dark:text-slate-300 font-medium">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-slate-50/50 dark:hover:bg-darkCard/10 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img src={emp.avatar} alt={emp.name} className="h-8 w-8 rounded-lg object-cover border border-slate-200 dark:border-darkBorder" />
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-slate-800 dark:text-white leading-tight">{emp.name}</span>
                    <span className="text-[10px] text-slate-400">{emp.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="purple">{emp.role}</Badge>
                </td>
                <td className="px-6 py-4">{emp.phone}</td>
                <td className="px-6 py-4">₹{emp.salary.base}/mo</td>
                <td className="px-6 py-4">
                  <Badge variant={emp.attendance.status === 'Present' ? 'success' : emp.attendance.status === 'On Leave' ? 'warning' : 'default'}>
                    {emp.attendance.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  {emp.role !== 'Admin' && (
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => openEdit(emp)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-accentIndigo hover:bg-slate-100 dark:hover:bg-darkCard transition-all"
                        title="Edit Details"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteEmployee(emp.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/5 transition-all"
                        title="Remove Employee"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Add Employee Dialog */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add New Employee"
        size="md"
      >
        <form onSubmit={handleAddEmployee} className="flex flex-col gap-4">
          <Input 
            label="Employee Name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input 
            label="Email Address"
            type="email"
            placeholder="name@tempo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input 
            label="Phone Contact"
            placeholder="+91 90000 12345"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Select 
            label="Role Assignment"
            options={[
              { value: 'Designer', label: 'Interior Designer' },
              { value: 'Driver', label: 'Logistics Driver' },
              { value: 'Delivery', label: 'Delivery Crew' },
              { value: 'Support', label: 'Customer Support Desk' }
            ]}
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
          />
          <Input 
            label="Monthly Base Salary (₹)"
            type="number"
            value={baseSalary}
            onChange={(e) => setBaseSalary(parseInt(e.target.value))}
            required
          />
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="secondary" type="button" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Submit Profile</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Employee Dialog */}
      <Modal
        isOpen={editEmpId !== null}
        onClose={() => setEditEmpId(null)}
        title="Edit Employee Profile"
        size="md"
      >
        <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
          <Input 
            label="Employee Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            required
          />
          <Input 
            label="Phone Contact"
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
            required
          />
          <Select 
            label="Role Tier"
            options={[
              { value: 'Designer', label: 'Interior Designer' },
              { value: 'Driver', label: 'Logistics Driver' },
              { value: 'Delivery', label: 'Delivery Crew' },
              { value: 'Support', label: 'Customer Support Desk' }
            ]}
            value={editRole}
            onChange={(e) => setEditRole(e.target.value as any)}
          />
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="secondary" type="button" onClick={() => setEditEmpId(null)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Updates</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
