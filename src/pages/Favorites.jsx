import React from 'react';
import { useWatchlist } from '../context/WatchlistContext';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const { watchlist } = useWatchlist();

  return (
    <>
      <header className="mt-10 mb-8">
        <h1>Your <span className="text-gradient">Watchlist</span></h1>
      </header>

      <section className='all-movies'>
        {watchlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <img src={`${import.meta.env.BASE_URL}no-movie.png`} alt="Empty Watchlist" className="w-32 h-32 opacity-50 mb-4" />
            <p className="text-xl font-bold text-white mb-2">Your watchlist is empty</p>
            <p className="text-gray-100 text-center">Go back to the Home page and click the heart icon on movies you want to save for later!</p>
          </div>
        ) : (
          <ul>
            {watchlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default Favorites;
