import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, UserCheck, ShieldAlert, KeyRound, LayoutGrid } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, currentUser } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Customer' | 'Employee' | 'Admin'>('Customer');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErr('Please fill in your email address.');
      return;
    }

    setLoading(true);
    setErr('');

    setTimeout(() => {
      const success = login(email, role);
      setLoading(false);
      if (success) {
        if (role === 'Admin') navigate('/admin/dashboard');
        else if (role === 'Employee') navigate('/employee/dashboard');
        else navigate('/customer/dashboard');
      } else {
        if (role === 'Employee') {
          setErr('Employee email not found. Use rajesh@tempo.com or aisha@tempo.com.');
        } else if (role === 'Admin') {
          setErr('Admin email invalid. Must contain "admin" (e.g. admin@tempo.com).');
        } else {
          setErr('Login failed. Please check credentials.');
        }
      }
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-accentIndigo/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-accentTeal/10 blur-3xl pointer-events-none" />

      <Card className="max-w-md w-full p-8 border border-white/10 relative z-10 flex flex-col gap-6 text-left">
        <div className="text-center flex flex-col gap-1.5">
          <Badge variant="purple" className="self-center">Portal Authentication</Badge>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white font-display">
            Sign In to Your Portal
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select your account privilege tier to enter the dashboard workstation.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-darkBg border border-slate-200/50 dark:border-darkBorder/40">
          {(['Customer', 'Employee', 'Admin'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setRole(r);
                setErr('');
                // Autofill demo emails to make testing incredibly easy for user
                if (r === 'Admin') setEmail('admin@tempo.com');
                else if (r === 'Employee') setEmail('aisha@tempo.com');
                else setEmail('gagan@gmail.com');
              }}
              className={`py-2 rounded-lg text-xs font-bold transition-all ${
                role === r
                  ? 'bg-white dark:bg-darkCard text-accentIndigo dark:text-accentTeal shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            leftIcon={<Mail className="h-4 w-4" />}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErr('');
            }}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock className="h-4 w-4" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Demo Pass: Any characters</span>
            <Link to="/forgot-password" className="text-accentTeal hover:underline font-bold">
              Forgot Password?
            </Link>
          </div>

          {err && (
            <span className="text-xs text-red-500 font-bold text-center border border-red-500/20 bg-red-500/10 py-2 rounded-lg flex items-center justify-center gap-1.5">
              <ShieldAlert className="h-4 w-4" /> {err}
            </span>
          )}

          <Button 
            variant="primary" 
            type="submit" 
            className="w-full mt-2" 
            isLoading={loading}
            leftIcon={<KeyRound className="h-4 w-4" />}
          >
            Authenticate Portal
          </Button>
        </form>

        {role === 'Customer' && (
          <div className="text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-accentTeal hover:underline font-bold">
              Create Profile
            </Link>
          </div>
        )}

        {/* Demo Quick Logins helper box to guide the user */}
        <div className="p-3.5 rounded-xl border border-slate-200/50 dark:border-darkBorder/30 bg-slate-100/30 dark:bg-darkCard/20 flex flex-col gap-2 text-xs">
          <span className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1">
            <LayoutGrid className="h-3.5 w-3.5 text-accentTeal" /> Quick Demo Credentials:
          </span>
          <div className="flex flex-col gap-1 text-slate-400 font-semibold leading-relaxed">
            <div><span className="text-slate-600 dark:text-slate-300">Customer:</span> gagan@gmail.com</div>
            <div><span className="text-slate-600 dark:text-slate-300">Employee:</span> aisha@tempo.com (Designer) / rajesh@tempo.com (Driver)</div>
            <div><span className="text-slate-600 dark:text-slate-300">Admin:</span> admin@tempo.com</div>
          </div>
        </div>
      </Card>
    </div>
  );
};
