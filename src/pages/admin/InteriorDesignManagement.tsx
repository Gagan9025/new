import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Palette, Plus, Pencil, Trash2, CalendarDays, HelpCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';

export const InteriorDesignManagement: React.FC = () => {
  const { projects, enquiries, addProject, editProject, deleteProject, replyEnquiry } = useStore();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Living Room' | 'Kitchen' | 'Office' | 'Bedroom' | 'Commercial'>('Living Room');
  const [client, setClient] = useState('');
  const [duration, setDuration] = useState('2 Months');
  const [cost, setCost] = useState(5000);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  // Consultation reply
  const [replyEnqId, setReplyEnqId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    addProject({
      title,
      category,
      client: client || 'Private Client',
      duration: duration || '2 Months',
      cost,
      description,
      image: image || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=60'
    });

    setTitle('');
    setClient('');
    setDuration('2 Months');
    setCost(5000);
    setDescription('');
    setImage('');
    setIsAddOpen(false);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyEnqId || !replyText) return;
    replyEnquiry(replyEnqId, replyText);
    setReplyText('');
    setReplyEnqId(null);
  };

  // Filter interior design consultation enquiries
  const designEnquiries = enquiries.filter(eq => eq.serviceType === 'Interior');

  return (
    <div className="flex flex-col gap-8 text-left">
      <div className="flex justify-between items-center flex-wrap gap-4 border-b border-slate-200/50 dark:border-darkBorder/40 pb-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white font-display flex items-center gap-2">
          <Palette className="h-5 w-5 text-accentTeal" /> Interior Design Studio Management
        </h3>
        
        <Button variant="primary" size="sm" onClick={() => setIsAddOpen(true)} leftIcon={<Plus className="h-4 w-4" />}>
          Upload Portfolio
        </Button>
      </div>

      {/* Consultation Requests Section */}
      {designEnquiries.length > 0 && (
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <HelpCircle className="h-4.5 w-4.5 text-accentTeal" /> Client Consultation Requests
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {designEnquiries.map((eq) => (
              <Card key={eq.id} className="p-5 flex flex-col justify-between border-l-4 border-l-accentIndigo gap-3">
                <div className="flex flex-col gap-1 text-xs text-left">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-800 dark:text-white">{eq.name}</span>
                    <Badge variant={eq.status === 'Resolved' ? 'success' : 'warning'}>{eq.status}</Badge>
                  </div>
                  <span className="text-[10px] text-slate-400">{eq.email} | {eq.phone}</span>
                  <p className="text-slate-500 mt-2 leading-relaxed whitespace-pre-line">{eq.message}</p>
                  {eq.status === 'Resolved' && eq.replyText && (
                    <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-2.5 mt-2 text-emerald-600 dark:text-emerald-400">
                      <strong>Answer:</strong> {eq.replyText}
                    </div>
                  )}
                </div>

                {eq.status !== 'Resolved' && (
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="w-fit self-end text-xs"
                    onClick={() => setReplyEnqId(eq.id)}
                  >
                    Reply & Resolve
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Portfolio Gallery grid list */}
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Active Studio Portfolios</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <Card key={proj.id} className="flex flex-col h-full overflow-hidden">
            <img src={proj.image} alt={proj.title} className="h-44 w-full object-cover" />
            <Card.Content className="flex-grow flex flex-col justify-between p-4 gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-wider text-accentIndigo dark:text-accentTeal">
                  <span>{proj.category}</span>
                  <span>Est. Cost: ₹{proj.cost}</span>
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white text-base leading-tight font-display">{proj.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{proj.description}</p>
              </div>

              <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 border-t border-slate-100 dark:border-darkBorder/40 pt-3 mt-1">
                <span>Client: {proj.client}</span>
                <button 
                  onClick={() => deleteProject(proj.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors p-1"
                  title="Remove Project"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* Upload Portfolio Dialog */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Upload Portfolio Creation"
        size="lg"
      >
        <form onSubmit={handleAddProject} className="flex flex-col gap-4">
          <Input 
            label="Renovation Project Title"
            placeholder="E.g. Nordic Minimalist Living Sanctuary"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="grid grid-cols-3 gap-3">
            <Input 
              label="Client Name"
              placeholder="Private Residence"
              value={client}
              onChange={(e) => setClient(e.target.value)}
            />
            <Input 
              label="Duration Shifting"
              placeholder="3 Months"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <Input 
              label="Project Cost (₹)"
              type="number"
              value={cost}
              onChange={(e) => setCost(parseInt(e.target.value))}
            />
          </div>
          <Select 
            label="Layout Category"
            options={[
              { value: 'Living Room', label: 'Living Rooms' },
              { value: 'Kitchen', label: 'Culinary Kitchens' },
              { value: 'Office', label: 'Corporate Workspaces' },
              { value: 'Bedroom', label: 'Bedroom Sanctuaries' },
              { value: 'Commercial', label: 'Retail Shops & Cafes' }
            ]}
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
          />
          <Input 
            label="Portfolio Image URL"
            placeholder="https://images.unsplash.com/..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <div className="flex flex-col gap-1.5 text-left text-xs">
            <label className="font-semibold text-slate-400">Design Specification Overview</label>
            <textarea
              rows={4}
              placeholder="Describe biophilic layout configurations, timber finishes used, color parameters..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="glass-input p-2.5 resize-none focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="secondary" type="button" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Publish Portfolio</Button>
          </div>
        </form>
      </Modal>

      {/* Answer Request Dialog */}
      <Modal
        isOpen={replyEnqId !== null}
        onClose={() => setReplyEnqId(null)}
        title="Send Consultation Reply"
        size="md"
      >
        <form onSubmit={handleReplySubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 text-left text-xs">
            <label className="font-bold text-slate-400 uppercase text-[9px]">Enquiry Message Details</label>
            <p className="bg-slate-50 dark:bg-darkBg/60 border border-slate-200 dark:border-darkBorder/40 p-3 rounded-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {enquiries.find(e => e.id === replyEnqId)?.message}
            </p>
          </div>
          <div className="flex flex-col gap-1.5 text-left text-xs">
            <label className="font-semibold text-slate-400">Send Response Reply</label>
            <textarea
              rows={4}
              placeholder="Write response message..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              required
              className="glass-input p-2.5 resize-none focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="secondary" type="button" onClick={() => setReplyEnqId(null)}>Cancel</Button>
            <Button variant="primary" type="submit">Send Response</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
