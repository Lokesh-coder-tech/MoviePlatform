import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "../../styles/pages/admin.scss";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await api.get("/admin/movies"); // Backend Admin Route
      setMovies(res.data);
    } catch (err) {
      console.error("Failed to fetch movies");
    }
  };

  const deleteMovie = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await api.delete(`/admin/delete/${id}`);
        setMovies(movies.filter((m) => m._id !== id));
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Control Panel</h1>
        <button
          className="add-btn"
          onClick={() => navigate("/admin/add-movie")}
        >
          + Add New Movie
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card glass-effect">
          <h3>Total Movies</h3>
          <p>{movies.length}</p>
        </div>
        {/* Add more stats like Total Users here */}
      </div>

      <div className="movie-table-container glass-effect">
        <table className="movie-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Release Year</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.release_date?.split("-")[0]}</td>
                <td>⭐ {movie.vote_average}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/admin/edit/${movie._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteMovie(movie._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
