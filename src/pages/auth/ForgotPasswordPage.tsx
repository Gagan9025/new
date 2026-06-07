import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ShieldCheck, ArrowLeft, KeySquare } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative">
      <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-accentIndigo/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-accentTeal/10 blur-3xl pointer-events-none" />

      <Card className="max-w-md w-full p-8 border border-white/10 relative z-10 flex flex-col gap-6 text-left">
        <div className="text-center flex flex-col gap-1.5">
          <Badge variant="purple" className="self-center">Security Center</Badge>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white font-display">
            Recover Your Password
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Submit your registered email address and we'll dispatch a secure authorization token.
          </p>
        </div>

        {done ? (
          <div className="py-8 text-center flex flex-col items-center gap-3">
            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-full">
              <ShieldCheck className="h-10 w-10" />
            </div>
            <h4 className="font-bold text-slate-800 dark:text-white">Recovery Link Sent!</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Please inspect your email inbox for instructions to verify and reset password.
            </p>
            <Link to="/login" className="text-xs text-accentTeal hover:underline font-bold mt-4 flex items-center gap-1.5 justify-center">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Log In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              leftIcon={<Mail className="h-4 w-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button variant="primary" type="submit" className="w-full mt-2" leftIcon={<KeySquare className="h-4 w-4" />}>
              Send Security Token
            </Button>
          </form>
        )}

        {!done && (
          <div className="text-center text-xs">
            <Link to="/login" className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-bold flex items-center gap-1 justify-center">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Log In
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
};
