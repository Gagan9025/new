import React, { useState, useMemo } from 'react';
import { Palette, Calendar, Layers, Clock, DollarSign, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';

export const InteriorDesignPage: React.FC = () => {
  const { projects, submitEnquiry } = useStore();

  const [selectedCat, setSelectedCat] = useState('All');
  
  // Consultation form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories = ['All', 'Living Room', 'Kitchen', 'Office', 'Bedroom', 'Commercial'];

  const filteredProjects = useMemo(() => {
    if (selectedCat === 'All') return projects;
    return projects.filter(p => p.category === selectedCat);
  }, [projects, selectedCat]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !details) return;

    submitEnquiry({
      name,
      email,
      phone,
      serviceType: 'Interior',
      message: `Interior Consultation Request:\nDetails: ${details}`
    });

    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setDetails('');
      setSubmitted(false);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left">
      {/* Page Header */}
      <div className="flex flex-col gap-2 mb-10 text-center max-w-2xl mx-auto">
        <Badge variant="purple" className="self-center">Design Studio</Badge>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white font-display">
          Bespoke Architectural Renovations
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Transforming residential flats and corporate workstations. Schedule site inspections with our project directors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Columns: Portfolio Gallery */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200/50 dark:border-darkBorder/40 pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-full border transition-all ${
                  selectedCat === cat
                    ? 'border-accentTeal bg-accentTeal/10 text-accentTeal'
                    : 'border-slate-200 dark:border-darkBorder text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-darkCard'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredProjects.map((proj) => (
              <Card key={proj.id} hoverable className="group flex flex-col h-full overflow-hidden">
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge variant="purple" className="absolute top-4 left-4">
                    {proj.category}
                  </Badge>
                </div>
                <Card.Content className="flex-grow flex flex-col justify-between gap-4 p-5">
                  <div className="flex flex-col gap-2">
                    <h4 className="font-bold text-slate-800 dark:text-white text-lg font-display">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 border-t border-slate-100 dark:border-darkBorder/40 pt-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Layers className="h-3.5 w-3.5 text-accentTeal" /> CLIENT: <span className="text-slate-700 dark:text-slate-200">{proj.client}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-accentTeal" /> TIMELINE: <span className="text-slate-700 dark:text-slate-200">{proj.duration}</span>
                    </span>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Request Consultation Form */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white font-display border-b border-slate-200/50 dark:border-darkBorder/40 pb-2 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-accentTeal" /> Schedule Design Consultation
          </h3>

          <Card className="p-6 border border-white/5 relative">
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center gap-3">
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-full">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white font-display">Consultation Logged!</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                  An interior coordinator will reach out to schedule a virtual blueprint walkthrough.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  label="Contact Name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  label="Phone Number"
                  placeholder="+91 99999 88888"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Project Requirements / Room Dimension
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Describe your layout requirements (e.g. 3BHK Kitchen Cabinets, Office soundproofing details, color preferences)..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    required
                    className="glass-input p-3 text-sm focus:outline-none resize-none"
                  />
                </div>

                <Button variant="primary" type="submit" className="w-full mt-2" rightIcon={<Send className="h-4 w-4" />}>
                  Book Consultation Visit
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
