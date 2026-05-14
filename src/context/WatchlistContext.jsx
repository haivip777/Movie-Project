import React, { createContext, useState, useContext, useEffect } from 'react';

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('movieWatchlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('movieWatchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (movie) => {
    setWatchlist((prev) => {
      const isSaved = prev.some((item) => item.id === movie.id);
      if (isSaved) {
        return prev.filter((item) => item.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some((item) => item.id === movieId);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
