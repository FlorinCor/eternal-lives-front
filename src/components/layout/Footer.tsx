import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Landmark, Compass, Feather, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal-950 border-t border-forest-900 text-ivory-300 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-forest-900/80">
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2 text-ivory-100 group">
              <span className="text-2xl text-gold-400 font-serif font-bold">✝</span>
              <span className="font-cinzel text-lg font-bold tracking-widest uppercase text-ivory-100">
                Eternal Lives
              </span>
            </Link>
            <p className="text-xs text-ivory-400 leading-relaxed font-sans">
              A peaceful and dignified digital sanctuary dedicated to preserving the resting places,
              memorial histories, and lasting wisdom of human civilization.
            </p>
            <div className="pt-2 text-xs italic text-gold-400/90 font-serif">
              "To live in hearts we leave behind is not to die."
            </div>
          </div>

          {/* Col 2: Navigation Archives */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-gold-300/90 mb-4 font-semibold">
              Explore Sanctuary
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/explore" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-forest-500" />
                  All Memorials
                </Link>
              </li>
              <li>
                <Link to="/category/scientists" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-forest-500" />
                  Scientists & Pioneers
                </Link>
              </li>
              <li>
                <Link to="/category/writers" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5 text-forest-500" />
                  Writers & Poets
                </Link>
              </li>
              <li>
                <Link to="/category/artists" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-forest-500" />
                  Artists & Sculptors
                </Link>
              </li>
              <li>
                <Link to="/category/musicians" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-forest-500" />
                  Musicians & Composers
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Community & Archival Contributions */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-gold-300/90 mb-4 font-semibold">
              Community & Custody
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/contribute" className="hover:text-gold-300 transition-colors">
                  Suggest a Resting Place
                </Link>
              </li>
              <li>
                <Link to="/contribute" className="hover:text-gold-300 transition-colors">
                  Submit Citation & Quote Correction
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  Saved Memorial Registry
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-300 transition-colors">
                  Archival Verification Standards
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Archival & Legal Notice */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-gold-300/90 mb-4 font-semibold">
              Sanctuary Ethics
            </h4>
            <p className="text-xs text-ivory-400 leading-relaxed mb-4">
              All cemetery coordinates and biographical archives are curated with deep respect and
              scholarly fidelity to public history.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <Shield className="w-4 h-4 text-forest-500" />
              <span>Public Historical Heritage</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Eternal Lives Archive. All historical memorial rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-ivory-300 transition-colors">
              About Project
            </Link>
            <Link to="/contribute" className="hover:text-ivory-300 transition-colors">
              Contribute
            </Link>
            <Link to="/explore" className="hover:text-ivory-300 transition-colors">
              Explore
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
