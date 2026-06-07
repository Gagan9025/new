import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const Footer: React.FC = () => {
  const { cms } = useStore();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 dark:border-darkBorder/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Intro */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5 text-xl font-bold tracking-wider text-white font-display">
              <img src="/logo.png" alt="Royal's Company Logo" className="h-10 w-10 object-contain rounded-lg bg-white/10 p-0.5" />
              <span>ROYAL'S<span className="text-accentTeal font-light"> COMPANY</span></span>
            </Link>
            <p className="text-sm text-slate-400">
              An enterprise platform connecting logistics, interior designs, and premium furniture retail.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Portals</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="hover:text-accentTeal transition-colors">Customer Portal</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-accentTeal transition-colors">Employee Portal</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-accentTeal transition-colors">Admin Console</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tempo" className="hover:text-accentTeal transition-colors">Tempo Logistics</Link>
              </li>
              <li>
                <Link to="/furniture" className="hover:text-accentTeal transition-colors">Furniture Store</Link>
              </li>
              <li>
                <Link to="/interior" className="hover:text-accentTeal transition-colors">Bespoke Interior Design</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accentTeal" />
                <span>{cms.contactPhone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accentTeal" />
                <span>{cms.contactEmail}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accentTeal mt-0.5" />
                <span className="leading-tight">{cms.officeAddress}</span>
              </li>
              <li className="flex items-center gap-2 mt-2">
                <a 
                  href={`https://wa.me/${cms.contactWhatsapp.replace(/\s+/g, '')}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors text-xs"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-slate-800 my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Royal's Company. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
