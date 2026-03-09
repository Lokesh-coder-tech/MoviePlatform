import React, { useEffect, useState } from 'react';
import { fetchTrending, BACKDROP_BASE } from '../services/tmdb';
import MovieCard from '../components/Movie/MovieCard';
import '../styles/pages/home.scss';

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const results = await fetchTrending();
      setTrending(results);
      // Pehli movie ko hero banner ke liye select karo
      setHeroMovie(results[0]);
    };
    loadData();
  }, []);

  return (
    <div className="home-container">
      {heroMovie && (
        <div 
          className="hero-banner" 
          style={{ backgroundImage: `url(${BACKDROP_BASE}${heroMovie.backdrop_path})` }}
        >
          <div className="hero-overlay">
            <h1>{heroMovie.title}</h1>
            <p>{heroMovie.overview.substring(0, 150)}...</p>
            <div className="hero-btns">
              <button className="play-btn">Watch Now</button>
              <button className="info-btn">More Info</button>
            </div>
          </div>
        </div>
      )}

      <div className="movie-section">
        <h2>Trending Today</h2>
        <div className="movie-grid">
          {trending.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;