import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Users, Eye, Pencil, Trash2, CalendarDays, Search, History } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';

export const CustomerManagement: React.FC = () => {
  const { customers, editCustomer, deleteCustomer } = useStore();
  
  const [search, setSearch] = useState('');
  const [selectedCustId, setSelectedCustId] = useState<string | null>(null);
  
  // Edit customer forms
  const [editCustId, setEditCustId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const openEdit = (cust: any) => {
    setEditCustId(cust.id);
    setName(cust.name);
    setEmail(cust.email);
    setPhone(cust.phone);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCustId) return;
    editCustomer(editCustId, { name, email, phone });
    setEditCustId(null);
  };

  const selectedCust = customers.find(c => c.id === selectedCustId);

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex justify-between items-center flex-wrap gap-4 border-b border-slate-200/50 dark:border-darkBorder/40 pb-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white font-display flex items-center gap-2">
          <Users className="h-5 w-5 text-accentTeal" /> Client Account Registry
        </h3>
        
        {/* Search */}
        <div className="w-full sm:w-64">
          <Input 
            placeholder="Search accounts..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            leftIcon={<Search className="h-4 w-4" />}
            className="py-1.5"
          />
        </div>
      </div>

      {/* Main accounts Table */}
      <Card className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100 dark:bg-darkBg/60 border-b border-slate-200 dark:border-darkBorder/40 font-bold uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-6 py-4">Client Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Registration</th>
              <th className="px-6 py-4 text-center">Activities</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/50 dark:divide-darkBorder/30 text-slate-700 dark:text-slate-300 font-medium">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-slate-400">No client accounts found.</td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-darkCard/10 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-accentIndigo/10 text-accentIndigo flex items-center justify-center font-bold">
                      {c.name.charAt(0)}
                    </div>
                    <span className="font-bold text-slate-800 dark:text-white">{c.name}</span>
                  </td>
                  <td className="px-6 py-4">{c.email}</td>
                  <td className="px-6 py-4">{c.phone}</td>
                  <td className="px-6 py-4">{c.joinedDate}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedCustId(c.id)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-darkCard hover:bg-accentIndigo/10 dark:hover:bg-accentTeal/10 text-slate-500 hover:text-accentIndigo dark:hover:text-accentTeal transition-all border border-slate-200/50 dark:border-darkBorder/40"
                    >
                      <History className="h-3.5 w-3.5" /> View ({c.activityLogs.length})
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => openEdit(c)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-accentIndigo hover:bg-slate-100 dark:hover:bg-darkCard transition-all"
                        title="Edit Details"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteCustomer(c.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/5 transition-all"
                        title="Delete Profile"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      {/* Activity Drawer Modal */}
      <Modal
        isOpen={selectedCustId !== null}
        onClose={() => setSelectedCustId(null)}
        title={`${selectedCust?.name || 'Client'}'s Action Audit Logs`}
        size="md"
      >
        {selectedCust && (
          <div className="flex flex-col gap-4">
            <p className="text-xs text-slate-400">Chronological history of portal events triggered by the user.</p>
            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto custom-scrollbar pr-2">
              {selectedCust.activityLogs.slice().reverse().map((log: any, idx: number) => (
                <div key={idx} className="flex gap-3 items-start border-l-2 border-accentIndigo pl-4 relative py-1">
                  <div className="absolute h-2.5 w-2.5 rounded-full bg-accentIndigo -left-[6px] top-2" />
                  <div className="flex flex-col text-left text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{log.action}</span>
                    <span className="text-[10px] text-slate-400 font-semibold mt-0.5 flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" /> {log.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Customer Details Modal */}
      <Modal
        isOpen={editCustId !== null}
        onClose={() => setEditCustId(null)}
        title="Edit Client Contacts"
        size="md"
      >
        <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
          <Input 
            label="Client Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input 
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input 
            label="Phone Contact"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="secondary" type="button" onClick={() => setEditCustId(null)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Updates</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
