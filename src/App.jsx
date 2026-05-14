import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import MovieDetails from './pages/MovieDetails';
import { WatchlistProvider } from './context/WatchlistContext';

const App = () => {
  return (
    <WatchlistProvider>
      <BrowserRouter>
        <main>
          <div className="pattern" />
          <Navbar />
          <div className="wrapper mt-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </WatchlistProvider>
  );
}

export default App;