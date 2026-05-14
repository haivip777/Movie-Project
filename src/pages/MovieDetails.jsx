import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import Spinner from '../components/Spinner';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = 'https://api.themoviedb.org/3/movie';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const isSaved = isInWatchlist(parseInt(id)); // params are strings, id in Context is number

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        window.scrollTo(0, 0); // scroll to top when page changes
        // append_to_response=credits to get cast
        const response = await fetch(`${API_URL}/${id}?api_key=${API_KEY}&append_to_response=credits`);
        if (!response.ok) throw new Error('Failed to fetch movie details');
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) return <div className="flex justify-center items-center min-h-[60vh]"><Spinner /></div>;
  if (error) return <div className="text-red-500 text-center py-20 text-xl">{error}</div>;
  if (!movie) return null;

  return (
    <div className="text-white pb-20 fade-in">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8 transition-colors font-medium">
        <span>←</span> Back to Home
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 bg-dark-100/40 p-6 md:p-10 rounded-3xl border border-white/5 backdrop-blur-sm shadow-xl">
        {/* Left: Poster */}
        <div className="relative">
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/no-movie.png'}
            alt={movie.title}
            className="w-full rounded-2xl shadow-2xl border border-white/10"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWatchlist(movie);
            }}
            className={`absolute top-4 right-4 z-20 p-3 rounded-full backdrop-blur-md transition-all duration-300 ${isSaved ? 'bg-[#AB8BFF] hover:bg-[#AB8BFF]/80 shadow-lg shadow-[#AB8BFF]/30' : 'bg-dark-100/60 hover:bg-white/20'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isSaved ? "white" : "none"} stroke={isSaved ? "white" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 ml-0">{movie.title}</h1>
          {movie.tagline && <p className="text-xl text-gray-400 italic mb-6">{movie.tagline}</p>}

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-dark-100 px-4 py-2 rounded-full border border-white/10 shadow-inner">
              <img src={`${import.meta.env.BASE_URL}star.svg`} alt="Star" className="w-5 h-5" />
              <span className="font-bold text-lg">{movie.vote_average.toFixed(1)}</span>
            </div>
            {movie.runtime > 0 && (
              <div className="bg-dark-100 px-4 py-2 rounded-full border border-white/10 text-gray-300 font-medium">
                <span>{movie.runtime} min</span>
              </div>
            )}
            <div className="bg-dark-100 px-4 py-2 rounded-full border border-white/10 text-gray-300 font-medium">
              <span>{movie.release_date?.split('-')[0] || 'N/A'}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-3 text-white">Overview</h2>
            <p className="text-gray-300 leading-relaxed text-lg">{movie.overview || 'No overview available.'}</p>
          </div>

          {movie.genres?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-3 text-white">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(g => (
                  <span key={g.id} className="bg-primary/50 text-[#AB8BFF] px-4 py-1.5 rounded-full text-sm font-medium border border-[#AB8BFF]/30">
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {movie.credits?.cast?.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Top Cast</h2>
              <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
                {movie.credits.cast.slice(0, 6).map(person => (
                  <div key={person.id} className="min-w-[100px] max-w-[100px] text-center">
                    <div className="w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden border-2 border-white/10">
                      <img
                        src={person.profile_path ? `https://image.tmdb.org/t/p/w185${person.profile_path}` : 'https://ui-avatars.com/api/?name=' + person.name + '&background=0D0D0D&color=fff'}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm font-bold line-clamp-1 text-gray-200">{person.name}</p>
                    <p className="text-xs text-gray-400 line-clamp-1">{person.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
