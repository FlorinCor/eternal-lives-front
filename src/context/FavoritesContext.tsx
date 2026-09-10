import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../lib/storage';
import { favoritesApi } from '../api/favoritesApi';

interface FavoritesContextType {
  favorites: string[];
  isFavorite: (personId: string) => boolean;
  toggleFavorite: (personId: string) => Promise<boolean>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => storage.getFavorites());

  useEffect(() => {
    setFavorites(storage.getFavorites());
  }, []);

  const isFavorite = (personId: string) => {
    return favorites.includes(personId);
  };

  const toggleFavorite = async (personId: string): Promise<boolean> => {
    const result = await favoritesApi.toggleFavorite(personId);
    setFavorites(result.favorites);
    return result.isFavorite;
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
