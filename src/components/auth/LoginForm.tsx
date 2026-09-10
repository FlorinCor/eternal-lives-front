import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { LogIn, Key, Mail, AlertCircle } from 'lucide-react';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoUser = (role: 'user' | 'admin') => {
    if (role === 'admin') {
      setEmail('admin@eternallives.org');
      setPassword('archivist123');
    } else {
      setEmail('visitor@eternallives.org');
      setPassword('pilgrim123');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-2xl bg-charcoal-900/90 border border-forest-800 shadow-2xl">
      <div className="text-center mb-8">
        <span className="text-3xl text-gold-400 font-serif font-bold">✝</span>
        <h2 className="font-serif text-3xl text-ivory-100 font-normal mt-2">Enter the Sanctuary</h2>
        <p className="text-stone-400 text-xs font-sans mt-1">
          Access your personal saved memorials and historical contributions.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3.5 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-sans">
            Email Address
          </label>
          <div className="relative flex items-center">
            <Mail className="w-4 h-4 text-stone-500 absolute left-3 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="archivist@eternallives.org"
              required
              className="w-full bg-forest-950/90 border border-forest-800 rounded-lg pl-9 pr-3 py-2.5 text-sm text-ivory-100 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/80 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-sans">
            Password
          </label>
          <div className="relative flex items-center">
            <Key className="w-4 h-4 text-stone-500 absolute left-3 pointer-events-none" />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-forest-950/90 border border-forest-800 rounded-lg pl-9 pr-3 py-2.5 text-sm text-ivory-100 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/80 transition-colors"
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="gold"
          size="lg"
          isLoading={loading}
          className="w-full mt-2 font-serif tracking-wider"
          leftIcon={<LogIn className="w-4 h-4" />}
        >
          Sign In
        </Button>
      </form>

      {/* Quick Demo Logins for easy evaluation */}
      <div className="mt-6 pt-6 border-t border-forest-800/80 text-center">
        <p className="text-[11px] uppercase tracking-wider text-stone-500 mb-2.5">
          Quick Demonstration Profiles
        </p>
        <div className="flex items-center justify-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fillDemoUser('user')}
            className="text-xs"
          >
            Visitor Demo
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fillDemoUser('admin')}
            className="text-xs text-gold-300 border-gold-600/40"
          >
            Admin Demo
          </Button>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-stone-400">
        Don't have an archival account?{' '}
        <Link to="/register" className="text-gold-400 hover:text-gold-300 font-medium">
          Create one now
        </Link>
      </div>
    </div>
  );
};
