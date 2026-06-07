import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Phone, MessageCircle, Mail, Send, X, HelpCircle } from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const RootLayout: React.FC = () => {
  const { cms, submitEnquiry } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState<'General' | 'Tempo' | 'Furniture' | 'Interior'>('General');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    submitEnquiry({
      name,
      email,
      phone,
      serviceType: type,
      message
    });

    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSubmitted(false);
      setIsOpen(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-darkBg text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Header Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
        {/* Expanded Contact Widget */}
        {isOpen && (
          <div className="glass-panel p-5 rounded-2xl w-80 shadow-2xl border border-white/10 flex flex-col gap-4 animate-in slide-in-from-bottom-5 duration-300">
            <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-darkBorder/40 pb-2">
              <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4 text-accentTeal" /> Quick Consultation
              </h4>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${cms.contactPhone}`}
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-accentIndigo hover:bg-accentIndigo/90 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors text-center"
              >
                <Phone className="h-3.5 w-3.5" /> Call Now
              </a>
              <a
                href={`https://wa.me/${cms.contactWhatsapp.replace(/\s+/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors text-center"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
            </div>

            <div className="text-center text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Or Send Enquiry Form
            </div>

            {/* Simple Inline Form */}
            {submitted ? (
              <div className="text-center py-4 text-emerald-500 font-bold text-xs">
                Enquiry Sent Successfully!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <Input 
                  placeholder="Your Name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  className="py-1 px-2.5 text-xs"
                />
                <Input 
                  type="email" 
                  placeholder="Your Email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="py-1 px-2.5 text-xs"
                />
                <select 
                  className="glass-input py-1 px-2 text-xs"
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                >
                  <option value="General" className="bg-white dark:bg-darkCard">General Enquiry</option>
                  <option value="Tempo" className="bg-white dark:bg-darkCard">Tempo Logistics</option>
                  <option value="Furniture" className="bg-white dark:bg-darkCard">Furniture Purchase</option>
                  <option value="Interior" className="bg-white dark:bg-darkCard">Interior Renovation</option>
                </select>
                <textarea
                  placeholder="Write your request..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={2}
                  className="glass-input py-1 px-2.5 text-xs focus:outline-none resize-none"
                />
                <Button variant="primary" size="sm" type="submit" className="py-1.5" rightIcon={<Send className="h-3 w-3" />}>
                  Submit Request
                </Button>
              </form>
            )}
          </div>
        )}

        {/* FAB Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-12 w-12 rounded-full bg-gradient-to-tr from-accentIndigo to-accentTeal hover:from-accentIndigo/90 hover:to-accentTeal/90 text-white flex items-center justify-center shadow-xl glow-indigo hover:scale-105 active:scale-95 transition-all duration-300"
          title="Contact Customer Support"
        >
          {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
};
