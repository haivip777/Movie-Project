import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';
import { updateSearchCount, getTrendingMovies } from './appwrite';


// http://www.omdbapi.com/?i=tt3896198&apikey=98bc1e18
const API_URL = 'http://www.omdbapi.com?apikey=98bc1e18';

const App = () => {
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
      let url = `${API_URL}&s=${encodeURIComponent(query)}`;
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
      setMovies(data.Search || []);

      if(query && data.Search.length > 0) {
        await updateSearchCount(query, data.Search[0]);
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
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
    }
  }

  // Gọi khi load lần đầu (chạy đúng 1 lần)
  useEffect(() => {
    fetchMovies('man'); // Hoặc có thể để query trống: fetchMovies('', '2024')
  }, []);

  useEffect(() => {
    if (deboundedSearchTerm.trim() !== ''){
      fetchMovies(deboundedSearchTerm);
    }
  }, [deboundedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern"/>
      
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section class='trending'>
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.imdbID} movie={movie} >
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.Title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className='all-movies'>
          <h2>All Movies</h2>
          {
            isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {movies.map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))}
              </ul>
            )
          }

        </section>
      </div>
    </main>
  )
}

export default App