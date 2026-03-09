import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api"; // Aapka backend axios instance
import "../../styles/components/movieCard.scss";

const MovieCard = ({ movie }) => {
  const [isAdded, setIsAdded] = useState(false);
  const IMG_URL = "https://image.tmdb.org/t/p/w500";

  // Function to add movie to favorites
  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // Backend validation ke hisaab se keys match karni chahiye
      await api.post("/favorites/add", {
        tmdbId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path, // Backend ki key 'posterPath' hai
        mediaType: "movie",
        vote_average: movie.vote_average,
      });

      setIsAdded(true);
      alert("Movie added in watchlist! ❤️");
    } catch (err) {
      // Agar abhi bhi error aaye toh console check karna
      console.log(err.response.data);
      alert(err.response?.data?.message || "Validation Error: Check Console");
    }
  };

  return (
    <div className="movie-card glass-effect">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={
            movie.poster_path
              ? `${IMG_URL}${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={movie.title}
        />

        <div className="card-overlay">
          {/* 🔥 Add to Favorite Button */}
          <button
            className={`fav-btn ${isAdded ? "active" : ""}`}
            onClick={handleFavorite}
          >
            {isAdded ? "❤️" : "🤍"}
          </button>

          <div className="info">
            <h3 className="title">{movie.title || movie.name}</h3>
            <p className="rating">⭐ {movie.vote_average?.toFixed(1)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
