import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Truck, Palette, Sofa, Star, Phone, Mail, MapPin, ArrowRight, MessageCircle, Heart, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { cms, products, projects, testimonials, toggleWishlist, wishlist, addToCart, submitEnquiry } = useStore();
  const [activeBanner, setActiveBanner] = useState(0);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitDone, setIsSubmitDone] = useState(false);

  const featuredFurniture = products.slice(0, 3);
  const selectedProjects = projects.slice(0, 3);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    submitEnquiry({
      name: contactName,
      email: contactEmail,
      phone: contactPhone,
      serviceType: 'General',
      message: contactMessage
    });

    setIsSubmitDone(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactMessage('');
      setIsSubmitDone(false);
    }, 2500);
  };

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* 1. HERO SECTION WITH IMAGE SLIDER */}
      <section className="relative min-h-[80vh] md:h-[85vh] py-12 md:py-0 w-full overflow-hidden flex items-center">
        {/* Banner Images */}
        {cms.banners.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === activeBanner ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            } transition-transform duration-[4000ms]`}
          >
            <img src={img} alt="Hero Banner" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-slate-950/60 dark:bg-black/70 backdrop-blur-[1px]" />
          </div>
        ))}

        {/* Content Box */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 glow-indigo flex flex-col gap-6 animate-float">
            <Badge variant="purple" className="self-start uppercase tracking-widest text-[10px] py-1 px-3">
              Premium Integrated Services
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight font-display tracking-tight">
              {cms.heroTitle}
            </h1>
            <p className="text-base text-slate-200 dark:text-slate-300 leading-relaxed font-medium">
              {cms.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/furniture')}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Browse Furniture
              </Button>
              <Button
                variant="glass"
                size="lg"
                onClick={() => navigate('/tempo')}
                leftIcon={<Truck className="h-4 w-4" />}
              >
                Book Tempo Delivery
              </Button>
            </div>
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
          {cms.banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveBanner(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeBanner ? 'w-8 bg-accentTeal' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. CORE SERVICES SUMMARY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-10">
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
          <h2 className="text-3xl font-black tracking-tight font-display text-slate-800 dark:text-white">
            Unified Ecosystem Services
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Get transport bookings, designer office renovations, and retail furniture setups on demand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Logistics */}
          <Card hoverable className="p-8 flex flex-col gap-6 group">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-accentIndigo to-accentTeal text-white flex items-center justify-center shadow-md">
              <Truck className="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white font-display">Tempo Transport</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Reliable shifting logisitics for houses and offices. Book certified vehicles instantly with upfront pricing calculations.
              </p>
            </div>
            <Link to="/tempo" className="text-xs font-bold text-accentIndigo dark:text-accentTeal hover:underline mt-auto flex items-center gap-1">
              Book Vehicle <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Card>

          {/* Card 2: Interiors */}
          <Card hoverable className="p-8 flex flex-col gap-6 group">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-purple-500 to-accentIndigo text-white flex items-center justify-center shadow-md">
              <Palette className="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white font-display">Bespoke Interior Design</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Transform workspaces and apartments. From 3D blueprint visualizations to turn-key executions supervised by project designers.
              </p>
            </div>
            <Link to="/interior" className="text-xs font-bold text-accentIndigo dark:text-accentTeal hover:underline mt-auto flex items-center gap-1">
              Explore Gallery <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Card>

          {/* Card 3: Furniture */}
          <Card hoverable className="p-8 flex flex-col gap-6 group">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-accentTeal to-emerald-500 text-white flex items-center justify-center shadow-md">
              <Sofa className="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white font-display">Office & Home Furniture</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Curated designer catalogs with real-time stock availability, instant order processing, and customized shipment updates.
              </p>
            </div>
            <Link to="/furniture" className="text-xs font-bold text-accentIndigo dark:text-accentTeal hover:underline mt-auto flex items-center gap-1">
              Shop Store <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Card>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS STORE TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-10">
        <div className="flex items-end justify-between border-b border-slate-200/50 dark:border-darkBorder/40 pb-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-black text-slate-800 dark:text-white font-display">Featured Marketplace Creations</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Order from our hand-picked inventory with nationwide delivery services.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/furniture')}>
            View All Products
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredFurniture.map((item) => {
            const isWish = wishlist.some(w => w.id === item.id);
            return (
              <Card key={item.id} hoverable className="flex flex-col h-full relative group">
                {/* Wishlist toggle */}
                <button
                  onClick={() => toggleWishlist(item)}
                  className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-colors z-10 border ${
                    isWish
                      ? 'bg-red-500/20 border-red-500/35 text-red-500'
                      : 'bg-slate-900/40 border-white/10 text-white hover:text-red-400'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isWish ? 'fill-current' : ''}`} />
                </button>

                {/* Product Image */}
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.stock <= 2 && (
                    <Badge variant="warning" className="absolute bottom-3 left-3">
                      Only {item.stock} Left!
                    </Badge>
                  )}
                  {item.stock === 0 && (
                    <Badge variant="danger" className="absolute bottom-3 left-3">
                      Out of Stock
                    </Badge>
                  )}
                </div>

                {/* Details */}
                <Card.Content className="flex-grow flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accentIndigo dark:text-accentTeal">
                      {item.category}
                    </span>
                    <div className="flex items-center text-amber-500 text-xs gap-1">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span className="font-bold">{item.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-800 dark:text-white text-base hover:text-accentIndigo dark:hover:text-accentTeal transition-colors">
                    <Link to={`/furniture/${item.id}`}>{item.name}</Link>
                  </h3>
                  
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-4 border-t border-slate-100 dark:border-darkBorder/40 pt-4">
                    <span className="text-lg font-black text-slate-800 dark:text-slate-100">
                      ₹{item.price}
                    </span>
                    <Button 
                      variant="primary" 
                      size="sm"
                      disabled={item.stock === 0}
                      onClick={() => {
                        addToCart(item);
                        navigate('/cart');
                      }}
                    >
                      Buy Now
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 4. INTERIOR DESIGN PORTFOLIO SHOWCASE */}
      <section className="bg-slate-100 dark:bg-darkCard/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/50 dark:border-darkBorder/40 pb-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-black text-slate-800 dark:text-white font-display">Bespoke Renovation Showcases</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Award-winning layouts constructed by our professional architecture crews.</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/interior')}>
              View Complete Gallery
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {selectedProjects.map((p) => (
              <Card key={p.id} hoverable className="group overflow-hidden rounded-2xl flex flex-col h-full">
                <div className="h-60 overflow-hidden relative">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />
                  <Badge variant="purple" className="absolute top-4 left-4">
                    {p.category}
                  </Badge>
                </div>
                <Card.Content className="flex flex-col gap-2 flex-grow justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white font-display mb-1">{p.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{p.description}</p>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-bold text-slate-400 border-t border-slate-100 dark:border-darkBorder/40 pt-3 mt-3">
                    <span>CLIENT: <span className="text-slate-700 dark:text-slate-200">{p.client}</span></span>
                    <span>DURATION: <span className="text-slate-700 dark:text-slate-200">{p.duration}</span></span>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-10">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-1">
          <h2 className="text-2xl font-black text-slate-800 dark:text-white font-display">Client Satisfaction Reviews</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Discover what corporate managers and homeowners say about our team.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <Card key={test.id} className="p-6 flex flex-col justify-between border-t-4 border-t-accentIndigo gap-4">
              <p className="text-sm italic text-slate-600 dark:text-slate-300 leading-relaxed">
                "{test.review}"
              </p>
              <div className="flex items-center gap-3 border-t border-slate-100 dark:border-darkBorder/40 pt-4">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="h-10 w-10 rounded-full object-cover border border-slate-200 dark:border-darkBorder"
                />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 dark:text-white leading-tight">{test.name}</span>
                  <span className="text-[10px] text-slate-400 font-semibold">{test.role}</span>
                </div>
                <div className="ml-auto flex text-amber-500">
                  {Array.from({ length: test.rating }).map((_, idx) => (
                    <Star key={idx} className="h-3 w-3 fill-current" />
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 6. CONTACT INFORMATION FORM */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-10 shadow-xl border border-white/5 relative overflow-hidden">
          {/* Accent Background Glow */}
          <div className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-accentIndigo/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-accentTeal/10 blur-3xl pointer-events-none" />

          {/* Left: Contact Info details */}
          <div className="flex flex-col gap-6 relative z-10 text-left">
            <div className="flex flex-col gap-2">
              <Badge variant="purple" className="self-start text-[9px] uppercase tracking-wider py-1 px-2.5">
                Support Hub
              </Badge>
              <h2 className="text-2xl font-black text-slate-800 dark:text-white font-display">Connect With Our Specialists</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Have questions about custom cabinet fabrication, heavy cargo shifting, or freight rates? Write to us.
              </p>
            </div>

            <div className="flex flex-col gap-4 text-sm mt-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-accentIndigo/10 text-accentIndigo dark:text-accentTeal">
                  <Phone className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-700 dark:text-slate-300">Call Support</h5>
                  <p className="text-xs text-slate-500">{cms.contactPhone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-accentIndigo/10 text-accentIndigo dark:text-accentTeal">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-700 dark:text-slate-300">Email Correspondence</h5>
                  <p className="text-xs text-slate-500">{cms.contactEmail}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-accentIndigo/10 text-accentIndigo dark:text-accentTeal mt-0.5">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-700 dark:text-slate-300">Corporate Headquarters</h5>
                  <p className="text-xs text-slate-500 leading-tight">{cms.officeAddress}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2.5 mt-2">
              <a
                href={`tel:${cms.contactPhone}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-darkCard dark:hover:bg-slate-800 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-darkBorder transition-all"
              >
                <Phone className="h-3.5 w-3.5" /> Hotline Call
              </a>
              <a
                href={`https://wa.me/${cms.contactWhatsapp.replace(/\s+/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold text-xs text-white shadow-sm transition-all"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp Live Chat
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="relative z-10 flex flex-col">
            {isSubmitDone ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center gap-3">
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-full">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h4 className="font-bold text-lg text-slate-800 dark:text-white">Request Dispatched!</h4>
                <p className="text-xs text-slate-500">Our customer representative will call you in 15 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                <Input
                  label="Full Name"
                  placeholder="Enter your name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="name@example.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                  />
                  <Input
                    label="Phone Number"
                    placeholder="+91 90000 12345"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Detailed Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you are looking for..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    required
                    className="glass-input p-3 text-sm focus:outline-none resize-none"
                  />
                </div>
                <Button variant="primary" type="submit">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
