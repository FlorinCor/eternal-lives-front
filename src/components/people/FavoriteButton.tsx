import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface FavoriteButtonProps {
  personId: string;
  personName?: string;
  className?: string;
  showText?: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  personId,
  personName,
  className = '',
  showText = false,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const favorited = isFavorite(personId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }

    toggleFavorite(personId);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={favorited ? `Remove ${personName || 'person'} from favorites` : `Add ${personName || 'person'} to favorites`}
      title={favorited ? 'In your saved memorials' : 'Add to saved memorials'}
      className={`group flex items-center gap-2 rounded-full transition-all duration-300 select-none ${
        showText
          ? favorited
            ? 'px-4 py-2 bg-rose-950/60 border border-rose-700/80 text-rose-300 hover:bg-rose-900/60'
            : 'px-4 py-2 bg-forest-900/80 border border-forest-700/80 text-ivory-200 hover:border-gold-500/60 hover:text-gold-300'
          : favorited
          ? 'p-2.5 bg-rose-950/70 border border-rose-600/70 text-rose-400 shadow-md hover:scale-105'
          : 'p-2.5 bg-charcoal-900/80 backdrop-blur border border-forest-800/80 text-ivory-300 hover:text-gold-300 hover:border-gold-500/60 hover:scale-105'
      } ${className}`}
    >
      <Heart
        className={`w-4 h-4 transition-transform group-hover:scale-110 ${
          favorited ? 'fill-rose-500 text-rose-500' : 'text-current'
        }`}
      />
      {showText && (
        <span className="text-xs font-medium tracking-wide">
          {favorited ? 'Saved in Memorials' : 'Add to Memorials'}
        </span>
      )}
    </button>
  );
};
