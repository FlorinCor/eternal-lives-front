import React from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { Users, Quote, MapPin, Inbox, LayoutDashboard, ArrowLeft, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
      isActive
        ? 'bg-forest-900 text-gold-300 border border-gold-600/40 font-semibold shadow-gold-glow'
        : 'text-ivory-300 hover:bg-forest-900/60 hover:text-ivory-100'
    }`;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-charcoal-950 text-ivory-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-charcoal-900 border-b md:border-b-0 md:border-r border-forest-800/80 flex flex-col justify-between p-4 shrink-0">
        <div>
          {/* Brand */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-forest-800/80">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl text-gold-400 font-serif font-bold">✝</span>
              <span className="font-cinzel text-base font-bold tracking-wider text-ivory-100 uppercase">
                Archivist Admin
              </span>
            </Link>
          </div>

          {/* Nav */}
          <nav className="space-y-1.5">
            <NavLink to="/admin" end className={navLinkClass}>
              <LayoutDashboard className="w-4 h-4 text-gold-400" />
              Overview
            </NavLink>
            <NavLink to="/admin/people" className={navLinkClass}>
              <Users className="w-4 h-4 text-gold-400" />
              Manage People
            </NavLink>
            <NavLink to="/admin/graves" className={navLinkClass}>
              <MapPin className="w-4 h-4 text-gold-400" />
              Manage Graves
            </NavLink>
            <NavLink to="/admin/quotes" className={navLinkClass}>
              <Quote className="w-4 h-4 text-gold-400" />
              Manage Quotes
            </NavLink>
            <NavLink to="/admin/contributions" className={navLinkClass}>
              <Inbox className="w-4 h-4 text-gold-400" />
              Contributions
            </NavLink>
          </nav>
        </div>

        {/* Footer info & exit */}
        <div className="pt-6 mt-6 border-t border-forest-800/80 space-y-3">
          <div className="flex items-center gap-2.5 px-2 text-xs text-ivory-300">
            <div className="w-7 h-7 rounded-full bg-forest-900 border border-gold-500/50 flex items-center justify-center text-gold-300 font-bold">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <div className="truncate">
              <p className="font-medium text-ivory-100 truncate">{user?.name || 'Administrator'}</p>
              <p className="text-[10px] text-gold-400 uppercase tracking-wider">Archival Custodian</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Link to="/" className="flex-1">
              <Button variant="outline" size="sm" className="w-full text-xs">
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Live Sanctuary
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-xs text-red-400 hover:text-red-300"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
