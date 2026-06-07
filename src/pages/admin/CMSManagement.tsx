import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Settings, Save, CheckCircle, Image, PhoneCall } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const CMSManagement: React.FC = () => {
  const { cms, updateCMS } = useStore();

  // CMS inputs states
  const [heroTitle, setHeroTitle] = useState(cms.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(cms.heroSubtitle);
  const [phone, setPhone] = useState(cms.contactPhone);
  const [email, setEmail] = useState(cms.contactEmail);
  const [whatsapp, setWhatsapp] = useState(cms.contactWhatsapp);
  const [address, setAddress] = useState(cms.officeAddress);
  const [banners, setBanners] = useState(cms.banners.join(', '));
  const [msg, setMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const bannerUrls = banners.split(',').map(url => url.trim()).filter(url => url.length > 0);

    updateCMS({
      heroTitle,
      heroSubtitle,
      contactPhone: phone,
      contactEmail: email,
      contactWhatsapp: whatsapp,
      officeAddress: address,
      banners: bannerUrls.length > 0 ? bannerUrls : cms.banners
    });

    setMsg('Homepage configurations updated successfully!');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex justify-between items-center border-b border-slate-200/50 dark:border-darkBorder/40 pb-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white font-display flex items-center gap-2">
          <Settings className="h-5 w-5 text-accentTeal" /> Homepage Content Management (CMS)
        </h3>
      </div>

      {msg && (
        <span className="text-xs text-emerald-500 font-bold border border-emerald-500/20 bg-emerald-500/10 py-2.5 rounded-lg flex items-center justify-center gap-1.5 animate-pulse">
          <CheckCircle className="h-4 w-4" /> {msg}
        </span>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Columns: Text configurations */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="p-6 flex flex-col gap-5 border border-white/5">
            <h4 className="font-bold text-sm text-slate-800 dark:text-white font-display uppercase tracking-wider">
              Hero Banner Section Configs
            </h4>
            
            <Input 
              label="Hero Title Headline"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              required
            />

            <div className="flex flex-col gap-1.5 text-left text-xs">
              <label className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Hero Subtitle Paragraph
              </label>
              <textarea
                rows={4}
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                required
                className="glass-input p-3 resize-none focus:outline-none text-slate-800 dark:text-slate-200"
              />
            </div>
          </Card>

          {/* Banner Images Slider Urls */}
          <Card className="p-6 flex flex-col gap-4 border border-white/5">
            <h4 className="font-bold text-sm text-slate-800 dark:text-white font-display uppercase tracking-wider flex items-center gap-1">
              <Image className="h-4.5 w-4.5 text-accentTeal" /> Banner Slider Images
            </h4>
            <div className="flex flex-col gap-1.5 text-left text-xs">
              <label className="font-semibold text-slate-400">Comma Separated Image URLs</label>
              <textarea
                rows={4}
                value={banners}
                onChange={(e) => setBanners(e.target.value)}
                required
                className="glass-input p-3 resize-none focus:outline-none text-slate-800 dark:text-slate-200 font-mono text-[11px]"
              />
            </div>
            <span className="text-[10px] text-slate-400">
              * Enter high-resolution Unsplash image URLs to change the slider background on the landing page.
            </span>
          </Card>
        </div>

        {/* Right Column: Contact Details Configs */}
        <div className="flex flex-col gap-6">
          <Card className="p-6 flex flex-col gap-5 border border-white/5">
            <h4 className="font-bold text-sm text-slate-800 dark:text-white font-display uppercase tracking-wider flex items-center gap-1">
              <PhoneCall className="h-4.5 w-4.5 text-accentTeal" /> Corporate Contact Info
            </h4>

            <Input 
              label="Support Phone Hotline"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <Input 
              label="Support Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input 
              label="WhatsApp API Contact"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
            />
            
            <div className="flex flex-col gap-1.5 text-left text-xs">
              <label className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Corporate HQ Street Address
              </label>
              <textarea
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="glass-input p-3 resize-none focus:outline-none text-slate-800 dark:text-slate-200"
              />
            </div>

            <Button variant="primary" type="submit" className="w-full mt-2" leftIcon={<Save className="h-4 w-4" />}>
              Save CMS Settings
            </Button>
          </Card>
        </div>
      </form>
    </div>
  );
};
