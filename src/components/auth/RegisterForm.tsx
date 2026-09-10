import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { UserPlus, User, Mail, Key, AlertCircle } from 'lucide-react';

export const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all registration fields.');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await register({ name, email, password });
      navigate('/profile');
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-2xl bg-charcoal-900/90 border border-forest-800 shadow-2xl">
      <div className="text-center mb-8">
        <span className="text-3xl text-gold-400 font-serif font-bold">✝</span>
        <h2 className="font-serif text-3xl text-ivory-100 font-normal mt-2">Join the Custodians</h2>
        <p className="text-stone-400 text-xs font-sans mt-1">
          Create an account to preserve memorials, bookmark resting places, and suggest citations.
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
            Full Name
          </label>
          <div className="relative flex items-center">
            <User className="w-4 h-4 text-stone-500 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Evelyn Reed"
              required
              className="w-full bg-forest-950/90 border border-forest-800 rounded-lg pl-9 pr-3 py-2.5 text-sm text-ivory-100 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/80 transition-colors"
            />
          </div>
        </div>

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
              placeholder="evelyn@history.org"
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
              minLength={6}
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
          leftIcon={<UserPlus className="w-4 h-4" />}
        >
          Create Custodian Account
        </Button>
      </form>

      <div className="mt-6 text-center text-xs text-stone-400">
        Already have an account?{' '}
        <Link to="/login" className="text-gold-400 hover:text-gold-300 font-medium">
          Sign In
        </Link>
      </div>
    </div>
  );
};
