import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { useContributions } from '../hooks/useContributions';
import { SEO } from '../components/common/SEO';
import { User, Shield, Heart, Feather, Calendar, LogOut, Compass } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const { favorites } = useFavorites();
  const { data: contributions = [] } = useContributions();
  const navigate = useNavigate();

  const userContributions = contributions.filter(
    c => c.userEmail === user?.email || c.submittedBy === user?.name
  );

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <SEO
        title="Custodian Profile — Eternal Lives Archive"
        description="View your archival profile, bookmarks, and historical memorial submissions."
      />

      <div className="min-h-screen bg-forest-950 pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Hero Card */}
          <div className="bg-charcoal-900/90 border border-forest-800/80 rounded-2xl p-8 sm:p-10 shadow-2xl mb-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              <div className="w-24 h-24 rounded-full bg-forest-900 border-2 border-gold-500/60 flex items-center justify-center text-gold-400 font-serif text-3xl font-bold shadow-gold-glow">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-2">
                  <h1 className="font-serif text-3xl text-ivory-100 font-normal">
                    {user?.name || 'Historical Custodian'}
                  </h1>
                  {isAdmin ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs uppercase tracking-widest font-sans font-medium text-gold-300 bg-gold-950/60 border border-gold-600/50 rounded-full">
                      <Shield className="w-3.5 h-3.5 text-gold-400" />
                      Archivist Administrator
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs uppercase tracking-widest font-sans text-forest-200 bg-forest-900/80 border border-forest-700/60 rounded-full">
                      <User className="w-3.5 h-3.5 text-forest-400" />
                      Sanctuary Custodian
                    </span>
                  )}
                </div>

                <p className="text-sm text-stone-400 font-sans mb-4">{user?.email}</p>

                <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-stone-500 font-sans">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-forest-500" />
                    Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  leftIcon={<LogOut className="w-4 h-4 text-red-400" />}
                  className="text-xs text-red-300 hover:text-red-200 border-red-900/60 hover:bg-red-950/40"
                >
                  Sign Out
                </Button>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="gold" size="sm" className="w-full text-xs">
                      Admin Panel
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-forest-800/80">
              <Link
                to="/favorites"
                className="p-4 rounded-xl bg-forest-950/60 border border-forest-900 hover:border-gold-500/40 transition-colors"
              >
                <div className="flex items-center gap-2 text-rose-400 text-xs font-sans mb-1">
                  <Heart className="w-4 h-4" />
                  <span>Saved Memorials</span>
                </div>
                <div className="font-serif text-2xl text-ivory-100 font-medium">
                  {favorites.length}
                </div>
              </Link>

              <Link
                to="/contribute"
                className="p-4 rounded-xl bg-forest-950/60 border border-forest-900 hover:border-gold-500/40 transition-colors"
              >
                <div className="flex items-center gap-2 text-gold-400 text-xs font-sans mb-1">
                  <Feather className="w-4 h-4" />
                  <span>Suggestions Made</span>
                </div>
                <div className="font-serif text-2xl text-ivory-100 font-medium">
                  {userContributions.length}
                </div>
              </Link>

              <Link
                to="/explore"
                className="col-span-2 sm:col-span-1 p-4 rounded-xl bg-forest-950/60 border border-forest-900 hover:border-gold-500/40 transition-colors"
              >
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-sans mb-1">
                  <Compass className="w-4 h-4" />
                  <span>Sanctuary Status</span>
                </div>
                <div className="font-serif text-sm text-ivory-200 pt-1">Active Custodian</div>
              </Link>
            </div>
          </div>

          {/* User Contributions List */}
          <div className="bg-charcoal-900/90 border border-forest-800/80 rounded-2xl p-6 sm:p-8 shadow-elevated">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-forest-900">
              <h2 className="font-serif text-2xl text-ivory-100 font-normal">
                Your Submissions & Suggestions
              </h2>
              <Link to="/contribute" className="text-xs text-gold-400 hover:text-gold-300 font-serif">
                + New Submission
              </Link>
            </div>

            {userContributions.length === 0 ? (
              <div className="text-center py-8 text-stone-400 text-sm font-sans">
                You haven't submitted any memorial proposals or corrections yet.
              </div>
            ) : (
              <div className="space-y-4">
                {userContributions.map(c => (
                  <div
                    key={c.id}
                    className="p-4 rounded-xl bg-forest-950/60 border border-forest-900 flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-serif text-gold-400 font-medium">
                          {c.subject}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-sans px-2 py-0.5 rounded-full ${
                            c.status === 'APPROVED'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : c.status === 'REJECTED'
                              ? 'bg-red-950 text-red-300 border border-red-800'
                              : 'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}
                        >
                          {c.status}
                        </span>
                      </div>
                      <p className="text-xs text-stone-300 font-sans leading-relaxed">{c.details}</p>
                      {c.reviewNotes && (
                        <p className="text-[11px] text-stone-400 italic mt-2">
                          Archivist note: {c.reviewNotes}
                        </p>
                      )}
                    </div>
                    <span className="text-[10px] text-stone-500 whitespace-nowrap">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
