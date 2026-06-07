import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { CreditCard, DollarSign, PlusCircle, CheckCircle, RefreshCcw, FileSpreadsheet } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Select } from '../../components/ui/Select';

export const PayrollManagement: React.FC = () => {
  const { employees, addPayslip, updateSalaryStructure } = useStore();

  // Salary Structure form
  const [selectedEmpId, setSelectedEmpId] = useState<string | null>(null);
  const [base, setBase] = useState(30000);
  const [bonus, setBonus] = useState(0);
  const [deductions, setDeductions] = useState(0);

  // Payslip generation form
  const [payEmpId, setPayEmpId] = useState<string | null>(null);
  const [month, setMonth] = useState('June 2026');
  const [payStatus, setPayStatus] = useState<'Paid' | 'Pending'>('Paid');
  const [successMsg, setSuccessMsg] = useState('');

  const handleUpdateStructure = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmpId) return;
    updateSalaryStructure(selectedEmpId, base, bonus, deductions);
    setSelectedEmpId(null);
  };

  const handleGeneratePayslip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payEmpId) return;
    
    const emp = employees.find(e => e.id === payEmpId);
    if (!emp) return;

    addPayslip(payEmpId, {
      month,
      baseSalary: emp.salary.base,
      bonus: emp.salary.bonus,
      deductions: emp.salary.deductions,
      netSalary: emp.salary.base + emp.salary.bonus - emp.salary.deductions,
      status: payStatus
    });

    setSuccessMsg(`Payslip generated successfully for ${emp.name}!`);
    setPayEmpId(null);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const openStructureModal = (emp: any) => {
    setSelectedEmpId(emp.id);
    setBase(emp.salary.base);
    setBonus(emp.salary.bonus);
    setDeductions(emp.salary.deductions);
  };

  // Compile monthly payouts total stats
  const totalBase = employees.reduce((sum, e) => sum + e.salary.base, 0);
  const totalBonus = employees.reduce((sum, e) => sum + e.salary.bonus, 0);
  const totalDeductions = employees.reduce((sum, e) => sum + e.salary.deductions, 0);
  const totalNet = totalBase + totalBonus - totalDeductions;

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex justify-between items-center flex-wrap gap-4 border-b border-slate-200/50 dark:border-darkBorder/40 pb-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white font-display flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-accentTeal" /> Payroll & Compensation
        </h3>
      </div>

      {successMsg && (
        <span className="text-xs text-emerald-500 font-bold border border-emerald-500/20 bg-emerald-500/10 py-2.5 rounded-lg flex items-center justify-center gap-1.5">
          <CheckCircle className="h-4 w-4" /> {successMsg}
        </span>
      )}

      {/* Monthly Payroll Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4 flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Base Workforce Commitment</span>
          <div className="text-xl font-black text-slate-800 dark:text-white font-display">₹{totalBase.toLocaleString()}</div>
        </Card>
        <Card className="p-4 flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monthly Bonus Disbursed</span>
          <div className="text-xl font-black text-slate-800 dark:text-white font-display">₹{totalBonus.toLocaleString()}</div>
        </Card>
        <Card className="p-4 flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Deductions Logged</span>
          <div className="text-xl font-black text-slate-800 dark:text-white font-display">₹{totalDeductions.toLocaleString()}</div>
        </Card>
        <Card className="p-4 flex flex-col gap-1.5 bg-gradient-to-tr from-accentIndigo/10 to-accentTeal/10 border border-accentIndigo/30">
          <span className="text-[10px] font-bold text-accentIndigo dark:text-accentTeal uppercase tracking-widest">Net Payroll Cost</span>
          <div className="text-xl font-black text-slate-800 dark:text-white font-display">₹{totalNet.toLocaleString()}</div>
        </Card>
      </div>

      {/* Payroll registry list table */}
      <Card className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100 dark:bg-darkBg/60 border-b border-slate-200 dark:border-darkBorder/40 font-bold uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4">Base Salary</th>
              <th className="px-6 py-4">Bonus</th>
              <th className="px-6 py-4">Deductions</th>
              <th className="px-6 py-4">Est. Net Monthly</th>
              <th className="px-6 py-4">Payslip Log</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/50 dark:divide-darkBorder/30 text-slate-700 dark:text-slate-300 font-medium">
            {employees.map((emp) => {
              const net = emp.salary.base + emp.salary.bonus - emp.salary.deductions;
              return (
                <tr key={emp.id} className="hover:bg-slate-50/50 dark:hover:bg-darkCard/10 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={emp.avatar} alt={emp.name} className="h-8 w-8 rounded-lg object-cover" />
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-slate-800 dark:text-white leading-tight">{emp.name}</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">{emp.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">₹{emp.salary.base}</td>
                  <td className="px-6 py-4 text-emerald-500 font-bold">+₹{emp.salary.bonus}</td>
                  <td className="px-6 py-4 text-red-500 font-bold">-₹{emp.salary.deductions}</td>
                  <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">₹{net}</td>
                  <td className="px-6 py-4">
                    <Badge variant="success">{emp.salary.history.length} Payslips Issued</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openStructureModal(emp)}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-darkCard dark:hover:bg-slate-800 text-slate-600 dark:text-slate-200 border border-slate-200 dark:border-darkBorder"
                        title="Configure Structure"
                      >
                        <RefreshCcw className="h-3.5 w-3.5" /> Adjust
                      </button>
                      <Button
                        variant="primary"
                        size="sm"
                        className="py-1 px-2 text-[10px]"
                        onClick={() => setPayEmpId(emp.id)}
                        leftIcon={<PlusCircle className="h-3.5 w-3.5" />}
                      >
                        Pay Slip
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* Adjust Structure dialog */}
      <Modal
        isOpen={selectedEmpId !== null}
        onClose={() => setSelectedEmpId(null)}
        title="Configure Salary Structure"
        size="md"
      >
        <form onSubmit={handleUpdateStructure} className="flex flex-col gap-4">
          <Input 
            label="Base Monthly Salary (₹)"
            type="number"
            value={base}
            onChange={(e) => setBase(parseInt(e.target.value))}
            required
          />
          <Input 
            label="Bonus Adjustments (₹)"
            type="number"
            value={bonus}
            onChange={(e) => setBonus(parseInt(e.target.value))}
          />
          <Input 
            label="Deductions / Penalties (₹)"
            type="number"
            value={deductions}
            onChange={(e) => setDeductions(parseInt(e.target.value))}
          />
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="secondary" type="button" onClick={() => setSelectedEmpId(null)}>Cancel</Button>
            <Button variant="primary" type="submit">Update Structure</Button>
          </div>
        </form>
      </Modal>

      {/* Generate Payslip dialog */}
      <Modal
        isOpen={payEmpId !== null}
        onClose={() => setPayEmpId(null)}
        title={`Issue digital payslip for ${employees.find(e => e.id === payEmpId)?.name}`}
        size="md"
      >
        <form onSubmit={handleGeneratePayslip} className="flex flex-col gap-4">
          <Input 
            label="Payslip Billing Month"
            placeholder="June 2026"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          />
          <Select 
            label="Disbursement Status"
            options={[
              { value: 'Paid', label: 'Disbursed (Paid)' },
              { value: 'Pending', label: 'Accrued (Pending)' }
            ]}
            value={payStatus}
            onChange={(e) => setPayStatus(e.target.value as any)}
          />
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="secondary" type="button" onClick={() => setPayEmpId(null)}>Cancel</Button>
            <Button variant="primary" type="submit">Issue Pay Record</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
