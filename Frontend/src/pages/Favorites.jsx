import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import MovieCard from "../components/Movie/MovieCard";
import "../styles/pages/favorites.scss";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      // Backend route: GET /api/favorites
      const res = await api.get("/favorites");
      setFavorites(res.data);
    } catch (err) {
      console.error("Could not fetch favorites", err);
    } finally {
      setLoading(false);
    }
  };

  // Movie ko list se remove karne ke liye logic
  const handleRemove = async (tmdbId) => {
    try {
      await api.delete(`/favorites/${tmdbId}`);
      // UI se turant hatane ke liye filter use karenge
      setFavorites((prev) => prev.filter((movie) => movie.tmdbId !== tmdbId));
    } catch (err) {
      alert("Remove failed, please try again.");
    }
  };

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1 className="page-title">My Watchlist</h1>
        <p className="stats-badge">{favorites.length} Movies Saved</p>
      </div>

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Fetching your collection...</p>
        </div>
      ) : favorites.length > 0 ? (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <div key={movie.tmdbId} className="fav-card-wrapper">
              {/* MovieCard props mismatch handle karne ke liye mapping */}
              <MovieCard
                key={movie.tmdbId}
                movie={{
                  id: movie.tmdbId,
                  title: movie.title,
                  // Agar backend se 'posterPath' aa raha hai toh use map karo
                  poster_path: movie.posterPath,
                  vote_average: movie.vote_average,
                }}
              />
              <button
                className="remove-btn glass-effect"
                onClick={() => handleRemove(movie.tmdbId)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state glass-effect">
          <div className="icon">🎬</div>
          <h2>Your Watchlist is empty</h2>
          <p>Go and explore some cinematic masterpieces to add here.</p>
          <button className="explore-btn" onClick={() => navigate("/")}>
            Discover Movies
          </button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
