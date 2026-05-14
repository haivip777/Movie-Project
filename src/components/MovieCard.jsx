import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';

const MovieCard = ({movie}) => {
  const { id, title, vote_average, poster_path, release_date, original_language } = movie;
  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const isSaved = isInWatchlist(id);
  const [flyingHeart, setFlyingHeart] = useState(null);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Trigger animation only when adding to watchlist
    if (!isSaved) {
      const rect = e.currentTarget.getBoundingClientRect();
      const dest = document.getElementById('watchlist-nav')?.getBoundingClientRect();
      
      if (dest) {
        setFlyingHeart({
          x: rect.left + rect.width / 2 - 12, // center of the button
          y: rect.top + rect.height / 2 - 12,
          destX: dest.left + dest.width / 2 - 12, // center of the dest link
          destY: dest.top + dest.height / 2 - 12,
          flying: false
        });

        setTimeout(() => {
          setFlyingHeart(prev => prev ? { ...prev, flying: true } : null);
        }, 50);

        setTimeout(() => {
          setFlyingHeart(null);
        }, 600);
      }
    }
    
    toggleWatchlist(movie);
  };

  return (
    <Link to={`/movie/${id}`} className='movie-card block relative group transition-transform hover:scale-[1.02] duration-300'>
      <button 
        onClick={handleToggle}
        className={`absolute top-4 right-4 z-20 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${isSaved ? 'bg-[#AB8BFF] hover:bg-[#AB8BFF]/80 shadow-lg shadow-[#AB8BFF]/30' : 'bg-dark-100/60 hover:bg-white/20'}`}
        title={isSaved ? "Remove from Watchlist" : "Add to Watchlist"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={isSaved ? "white" : "none"} stroke={isSaved ? "white" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        </svg>
      </button>

      <img src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : '/no-movie.png'} alt={title} />
      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src={`${import.meta.env.BASE_URL}star.svg`} alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>
          <span>•</span>
          <p className='lang'>{original_language}</p>
          <span>•</span>
          <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
        </div>
      </div>

      {flyingHeart && createPortal(
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" height="24" viewBox="0 0 24 24" 
          fill="#AB8BFF" stroke="#AB8BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: flyingHeart.x,
            top: flyingHeart.y,
            transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
            transform: flyingHeart.flying 
              ? `translate(${flyingHeart.destX - flyingHeart.x}px, ${flyingHeart.destY - flyingHeart.y}px) scale(0.2)`
              : 'translate(0px, 0px) scale(1.5)',
            opacity: flyingHeart.flying ? 0 : 1,
          }}
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        </svg>,
        document.body
      )}
    </Link>
  )
}

export default MovieCard