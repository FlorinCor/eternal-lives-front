import React from 'react';
import { useAdminStats } from '../../hooks/useAdmin';
import { useRecentPeople } from '../../hooks/usePeople';
import { useContributions } from '../../hooks/useContributions';
import { Users, MapPin, Quote, Inbox, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';

export const AdminDashboardPage: React.FC = () => {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: recentPeople = [] } = useRecentPeople();
  const { data: contributions = [] } = useContributions();

  const pendingContributions = contributions.filter(c => c.status === 'PENDING');

  return (
    <>
      <SEO title="Archival Dashboard — Admin Overview" />

      <div className="space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-forest-850 gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-ivory-100 font-normal">
              Sanctuary Operations Overview
            </h1>
            <p className="text-stone-400 text-xs sm:text-sm font-sans mt-1">
              Historical registry metrics, active memorial records, and community moderation queue.
            </p>
          </div>
          <Link to="/admin/people">
            <Button variant="gold" size="sm" className="font-serif tracking-wide">
              + Catalog Luminary
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-xl bg-charcoal-900 border border-forest-800/80 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-sans uppercase tracking-wider text-stone-400">
                Luminaries Catalogued
              </span>
              <Users className="w-4 h-4 text-gold-400" />
            </div>
            <div className="font-serif text-3xl text-ivory-100 font-medium">
              {statsLoading ? '...' : stats?.totalPeople}
            </div>
            <Link to="/admin/people" className="text-xs text-gold-400 hover:underline mt-2 inline-block">
              Manage people →
            </Link>
          </div>

          <div className="p-5 rounded-xl bg-charcoal-900 border border-forest-800/80 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-sans uppercase tracking-wider text-stone-400">
                Verified Graves
              </span>
              <MapPin className="w-4 h-4 text-gold-400" />
            </div>
            <div className="font-serif text-3xl text-ivory-100 font-medium">
              {statsLoading ? '...' : stats?.totalGraves}
            </div>
            <Link to="/admin/graves" className="text-xs text-gold-400 hover:underline mt-2 inline-block">
              Manage resting sites →
            </Link>
          </div>

          <div className="p-5 rounded-xl bg-charcoal-900 border border-forest-800/80 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-sans uppercase tracking-wider text-stone-400">
                Quotes Documented
              </span>
              <Quote className="w-4 h-4 text-gold-400" />
            </div>
            <div className="font-serif text-3xl text-ivory-100 font-medium">
              {statsLoading ? '...' : stats?.totalQuotes}
            </div>
            <Link to="/admin/quotes" className="text-xs text-gold-400 hover:underline mt-2 inline-block">
              Manage citations →
            </Link>
          </div>

          <div className="p-5 rounded-xl bg-charcoal-900 border border-forest-800/80 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-sans uppercase tracking-wider text-stone-400">
                Pending Review
              </span>
              <Inbox className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-serif text-3xl text-amber-300 font-medium">
              {statsLoading ? '...' : stats?.pendingContributions}
            </div>
            <Link to="/admin/contributions" className="text-xs text-amber-400 hover:underline mt-2 inline-block">
              Review queue →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Contributions Preview */}
          <div className="bg-charcoal-900 border border-forest-800/80 rounded-xl p-6 shadow-elevated">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-forest-800">
              <div className="flex items-center gap-2 text-ivory-100 font-serif text-lg font-medium">
                <Inbox className="w-4 h-4 text-gold-400" />
                <span>Pending Community Contributions</span>
              </div>
              <Link
                to="/admin/contributions"
                className="text-xs text-gold-400 hover:text-gold-200 font-serif flex items-center gap-1"
              >
                View all ({pendingContributions.length})
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {pendingContributions.length === 0 ? (
              <div className="py-8 text-center text-stone-400 text-xs font-sans">
                <ShieldCheck className="w-8 h-8 text-emerald-500/60 mx-auto mb-2" />
                The contribution queue is clear. All proposals have been reviewed.
              </div>
            ) : (
              <div className="space-y-3">
                {pendingContributions.slice(0, 3).map(c => (
                  <div
                    key={c.id}
                    className="p-3.5 rounded-lg bg-forest-950/60 border border-forest-800 flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-serif font-medium text-ivory-100">{c.subject}</span>
                        <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                          {c.type}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 font-sans mt-1 line-clamp-1">{c.details}</p>
                      <p className="text-[10px] text-stone-500 mt-1">From: {c.submittedBy} ({c.userEmail})</p>
                    </div>
                    <Link to="/admin/contributions">
                      <Button variant="outline" size="sm" className="text-[10px] py-1 px-2">
                        Evaluate
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recently Added Memorials Preview */}
          <div className="bg-charcoal-900 border border-forest-800/80 rounded-xl p-6 shadow-elevated">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-forest-800">
              <div className="flex items-center gap-2 text-ivory-100 font-serif text-lg font-medium">
                <Clock className="w-4 h-4 text-gold-400" />
                <span>Recently Modified Memorials</span>
              </div>
              <Link
                to="/admin/people"
                className="text-xs text-gold-400 hover:text-gold-200 font-serif flex items-center gap-1"
              >
                Manage list
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentPeople.slice(0, 4).map(p => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-lg bg-forest-950/60 border border-forest-800 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.portraitUrl}
                      alt={p.name}
                      className="w-9 h-9 rounded-full object-cover border border-forest-700"
                    />
                    <div>
                      <div className="text-sm font-serif font-medium text-ivory-100">{p.name}</div>
                      <div className="text-xs text-stone-400 font-sans">{p.categoryName} • {p.country}</div>
                    </div>
                  </div>
                  <Link to={`/people/${p.slug}`} target="_blank">
                    <Button variant="ghost" size="sm" className="text-xs text-stone-400">
                      View Live
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
