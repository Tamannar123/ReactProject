import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import "../css/Home.css";
import { searchMovies, getPopularMovie } from '../Services/api';

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovie();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return

    setLoading(true);
    setError(null);

    try {
      const results = await searchMovies(searchQuery); 
      setMovies(results);
    } catch (err) {
      console.error(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }

    
  };

  return (
    <div className="Home">
     
      <form onSubmit={handleSearch} className="Search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

   
      {error && <div className="error-message">{error}</div>}

      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.length > 0 ? (
            movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
