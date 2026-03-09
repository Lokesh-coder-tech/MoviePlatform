import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { mockMovies } from '../services/mockData'; // Jab tak TMDB working nahi hai
import '../styles/pages/movieDetails.scss';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      try {
        // Real API call: const res = await api.get(`/movies/${id}`);
        // Abhi ke liye mock data se find kar rahe hain
        const foundMovie = mockMovies.find(m => m.id === parseInt(id));
        setMovie(foundMovie);
        
        // Watch History mein add karne ka logic
        await api.post('/history/add', { movieId: id });
      } catch (err) {
        console.error("Error fetching movie details", err);
      } finally {
        setLoading(false);
      }
    };
    getDetails();
  }, [id]);

  const handleFavorite = async () => {
    try {
      await api.post('/favorites/add', { 
        movieId: movie.id, 
        title: movie.title, 
        poster_path: movie.poster_path 
      });
      alert("Added to Favorites! ❤️");
    } catch (err) {
      alert("Failed to add to favorites. Login first!");
    }
  };

  if (loading) return <div className="loader">Loading details...</div>;
  if (!movie) return <div className="error">Movie not found!</div>;

  return (
    <div className="movie-details-page">
      {/* Background Backdrop */}
      <div className="backdrop-container">
        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" />
        <div className="backdrop-overlay"></div>
      </div>

      <div className="content-wrapper">
        <div className="movie-poster glass-effect">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>

        <div className="movie-info">
          <h1>{movie.title}</h1>
          <div className="meta-data">
            <span className="rating">⭐ {movie.vote_average}</span>
            <span className="year">{movie.release_date?.split('-')[0]}</span>
          </div>
          <p className="overview">
            {movie.overview || "No description available for this movie yet."}
          </p>
          
          <div className="action-btns">
            <button className="play-btn">Watch Now</button>
            <button className="fav-btn" onClick={handleFavorite}>+ Add to Favorites</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;