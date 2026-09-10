import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Heart, User as UserIcon, Shield, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Button } from '../common/Button';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [navSearchQuery, setNavSearchQuery] = useState('');
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!navSearchQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(navSearchQuery.trim())}`);
    setSearchOpen(false);
    setNavSearchQuery('');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium tracking-wider transition-colors duration-200 py-1 border-b-2 ${
      isActive
        ? 'text-gold-300 border-gold-400 font-semibold'
        : 'text-ivory-300 border-transparent hover:text-ivory-100 hover:border-forest-600'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-forest-950/90 backdrop-blur-md border-b border-forest-800/80 shadow-elevated py-3.5'
          : 'bg-gradient-to-b from-forest-950/90 via-forest-950/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-ivory-100 hover:text-gold-300 transition-colors group"
        >
          <span className="text-xl sm:text-2xl text-gold-400 font-serif font-bold group-hover:scale-105 transition-transform duration-200">
            ✝
          </span>
          <span className="font-cinzel text-lg sm:text-xl font-bold tracking-widest uppercase">
            Eternal Lives
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/explore" className={navLinkClass}>
            Explore
          </NavLink>
          <NavLink to="/category/scientists" className={navLinkClass}>
            Famous People
          </NavLink>
          <NavLink to="/contribute" className={navLinkClass}>
            Contribute
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
        </nav>

        {/* Right side items */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick Search toggle */}
          {searchOpen ? (
            <form onSubmit={handleNavSearch} className="relative flex items-center">
              <input
                type="text"
                value={navSearchQuery}
                onChange={e => setNavSearchQuery(e.target.value)}
                placeholder="Search archive..."
                autoFocus
                className="w-48 bg-forest-900/90 border border-gold-500/50 rounded-full px-3 py-1.5 text-xs text-ivory-100 placeholder:text-stone-400 focus:outline-none focus:w-64 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="absolute right-2 text-stone-400 hover:text-ivory-100 text-xs"
              >
                ✕
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className="p-2 text-ivory-300 hover:text-gold-300 hover:bg-forest-900/60 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {/* User & Auth state */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/favorites"
                aria-label="Saved favorites"
                className="relative p-2 text-ivory-300 hover:text-gold-300 hover:bg-forest-900/60 rounded-full transition-colors"
                title="Saved Memorials"
              >
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-gold-600 text-charcoal-950 font-bold text-[10px] rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  className="p-2 text-gold-400 hover:text-gold-200 hover:bg-forest-900/60 rounded-full transition-colors"
                  title="Archivist Admin Dashboard"
                >
                  <Shield className="w-5 h-5" />
                </Link>
              )}

              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-900/80 border border-forest-700/80 hover:border-gold-500/50 text-xs text-ivory-200 transition-colors"
              >
                <UserIcon className="w-3.5 h-3.5 text-gold-400" />
                <span className="max-w-[100px] truncate">{user?.name || 'Profile'}</span>
              </Link>

              <button
                onClick={logout}
                aria-label="Logout"
                title="Logout"
                className="p-2 text-ivory-400 hover:text-red-400 hover:bg-forest-900/60 rounded-full transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="font-sans">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="gold" size="sm" className="font-sans text-xs">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/search"
            aria-label="Search"
            className="p-2 text-ivory-300 hover:text-gold-300"
          >
            <Search className="w-5 h-5" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-ivory-200 hover:text-ivory-100 rounded-lg bg-forest-900/60"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-forest-950/95 border-b border-forest-800 px-6 py-6 shadow-2xl backdrop-blur-lg animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4 mb-6">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-serif text-ivory-200 hover:text-gold-300 py-1"
            >
              Home
            </Link>
            <Link
              to="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-serif text-ivory-200 hover:text-gold-300 py-1"
            >
              Explore Lives
            </Link>
            <Link
              to="/category/scientists"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-serif text-ivory-200 hover:text-gold-300 py-1"
            >
              Famous People
            </Link>
            <Link
              to="/contribute"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-serif text-ivory-200 hover:text-gold-300 py-1"
            >
              Contribute Memorial
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-serif text-ivory-200 hover:text-gold-300 py-1"
            >
              About The Memorial
            </Link>
          </div>

          <div className="pt-4 border-t border-forest-800/80 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/favorites"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-sm text-ivory-200 hover:text-gold-300 py-1"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-gold-400" />
                    Saved Favorites
                  </span>
                  <span className="text-xs bg-forest-800 px-2 py-0.5 rounded-full">
                    {favorites.length}
                  </span>
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm text-ivory-200 hover:text-gold-300 py-1"
                >
                  <UserIcon className="w-4 h-4 text-gold-400" />
                  Profile ({user?.name})
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-sm text-gold-300 hover:text-gold-200 py-1"
                  >
                    <Shield className="w-4 h-4" />
                    Admin Control Panel
                  </Link>
                )}

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 py-2 mt-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="gold" size="sm" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
