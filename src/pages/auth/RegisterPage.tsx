import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, User, Phone, MapPin, KeyRound, ShieldAlert, CheckCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { registerCustomer } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [err, setErr] = useState('');
  const [done, setDone] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !address) {
      setErr('Please provide all details.');
      return;
    }

    const res = registerCustomer(name, email, phone, address);
    if (res) {
      setDone(true);
      setErr('');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setErr('Email address already registered.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative">
      <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-accentIndigo/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-accentTeal/10 blur-3xl pointer-events-none" />

      <Card className="max-w-md w-full p-8 border border-white/10 relative z-10 flex flex-col gap-6 text-left">
        <div className="text-center flex flex-col gap-1.5">
          <Badge variant="purple" className="self-center">Customer Registration</Badge>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white font-display">
            Create Customer Profile
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign up to buy furniture, manage cart wishlists, and book cargo services.
          </p>
        </div>

        {done ? (
          <div className="py-8 text-center flex flex-col items-center gap-3">
            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-full">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h4 className="font-bold text-slate-800 dark:text-white">Account Created!</h4>
            <p className="text-xs text-slate-500">Redirecting to login portal...</p>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <Input
              label="Full Name"
              placeholder="Enter your name"
              leftIcon={<User className="h-4 w-4" />}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              leftIcon={<Mail className="h-4 w-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Phone Number"
              placeholder="+91 98765 43210"
              leftIcon={<Phone className="h-4 w-4" />}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <Input
              label="Default Delivery Address"
              placeholder="Street name, City, Zip"
              leftIcon={<MapPin className="h-4 w-4" />}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            {err && (
              <span className="text-xs text-red-500 font-bold text-center border border-red-500/20 bg-red-500/10 py-2 rounded-lg flex items-center justify-center gap-1.5">
                <ShieldAlert className="h-4 w-4" /> {err}
              </span>
            )}

            <Button variant="primary" type="submit" className="w-full mt-2" leftIcon={<KeyRound className="h-4 w-4" />}>
              Register Account
            </Button>
          </form>
        )}

        <div className="text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-accentTeal hover:underline font-bold">
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
};
