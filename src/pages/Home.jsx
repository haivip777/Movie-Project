import React, { useEffect, useState } from 'react'
import Search from '../components/Search'
import { SkeletonList } from '../components/Skeleton'
import MovieCard from '../components/MovieCard';
import FAQ from '../components/FAQ';
import { useDebounce } from 'react-use';
import { updateSearchCount } from '../appwrite';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// http://www.omdbapi.com/?i=tt3896198&apikey=98bc1e18
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = 'https://api.themoviedb.org/3/search/movie';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movies, setMovies] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [deboundedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // tối ưu hóa việc gọi API (delay việc gọi API)
  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
    setPage(1);
  }, 500, [searchTerm]);

  const fetchMovies = async (query = '', pageNum = 1) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      let url = `${API_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${pageNum}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();

      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovies([]);
        return;
      }
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);

      if (query && data.results && data.results.length > 0 && pageNum === 1) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
      if (!response.ok) throw new Error('Failed to fetch trending movies');
      const data = await response.json();
      
      setTrendingMovies(data.results.slice(0, 10));
    } catch (error) {
      console.log(`Error fetching trending movies: ${error}`);
    }
  }

  useEffect(() => {
    const query = deboundedSearchTerm.trim() || 'man';
    fetchMovies(query, page);
  }, [deboundedSearchTerm, page]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <>
      <header>
        <img src="./hero.png" alt="Hero Banner" />
        <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>

      {trendingMovies.length > 0 && (
        <section className='trending'>
          <h2>Trending Movies</h2>
          <div className="-mt-10 w-full pb-6">
            <Swiper
              spaceBetween={10}
              breakpoints={{
                0: { slidesPerView: 2.2 },
                640: { slidesPerView: 3.2 },
                1024: { slidesPerView: 4.5 },
              }}
              className="w-full"
            >
              {trendingMovies.map((movie, index) => (
                <SwiperSlide key={movie.id}>
                  <div className="flex flex-row items-center justify-start pl-2 py-4">
                    <p className="fancy-text text-nowrap mt-[22px] relative z-20 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">{index + 1}</p>
                    <Link to={`/movie/${movie.id}`} className="block w-[120px] md:w-[140px] h-[170px] md:h-[200px] shrink-0 -ml-6 md:-ml-8 relative hover:scale-105 transition-transform duration-300 z-10">
                      <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/no-movie.png'} alt={movie.title} className="w-full h-full object-cover rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.5)] border border-white/5" />
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      <section className='all-movies'>
        <h2>All Movies</h2>
        {
          isLoading ? (
            <SkeletonList count={8} />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <>
              <ul>
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
              
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-6 mt-12 mb-8">
                  <button 
                    onClick={() => {
                      setPage(prev => Math.max(prev - 1, 1));
                      window.scrollTo({ top: document.querySelector('.all-movies').offsetTop - 100, behavior: 'smooth' });
                    }}
                    disabled={page === 1}
                    className="w-12 h-12 flex items-center justify-center bg-dark-100 border border-white/10 rounded-full text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  <span className="text-gray-300 font-medium">Page {page} of {totalPages > 500 ? 500 : totalPages}</span>
                  <button 
                    onClick={() => {
                      setPage(prev => Math.min(prev + 1, totalPages));
                      window.scrollTo({ top: document.querySelector('.all-movies').offsetTop - 100, behavior: 'smooth' });
                    }}
                    disabled={page === totalPages || page >= 500}
                    className="w-12 h-12 flex items-center justify-center bg-[#AB8BFF] text-white font-medium rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#AB8BFF]/80 transition-colors shadow-[0_0_15px_rgba(171,139,255,0.3)]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )
        }
      </section>

      <FAQ />
    </>
  )
}

export default Home
