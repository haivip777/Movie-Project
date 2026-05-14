import React, { useEffect, useState } from 'react'
import Search from '../components/Search'
import { SkeletonList } from '../components/Skeleton'
import MovieCard from '../components/MovieCard';
import { useDebounce } from 'react-use';
import { updateSearchCount } from '../appwrite';
import { Link } from 'react-router-dom';

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

  // tối ưu hóa việc gọi API (delay việc gọi API)
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      let url = `${API_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
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

      if (query && data.results && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
        loadTrendingMovies();
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
      
      setTrendingMovies(data.results.slice(0, 5));
    } catch (error) {
      console.log(`Error fetching trending movies: ${error}`);
    }
  }

  // Gọi khi load lần đầu (chạy đúng 1 lần)
  useEffect(() => {
    fetchMovies('man'); // Hoặc có thể để query trống: fetchMovies('', '2024')
  }, []);

  useEffect(() => {
    if (deboundedSearchTerm.trim() !== '') {
      fetchMovies(deboundedSearchTerm);
    }
  }, [deboundedSearchTerm]);

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
          <ul>
            {trendingMovies.map((movie, index) => (
              <li key={movie.id}>
                <p>{index + 1}</p>
                <Link to={`/movie/${movie.id}`} className="block w-[127px] h-[163px]">
                  <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/no-movie.png'} alt={movie.title} className="w-full h-full object-cover rounded-lg" />
                </Link>
              </li>
            ))}
          </ul>
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
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )
        }
      </section>
    </>
  )
}

export default Home
