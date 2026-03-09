import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/pages/adminmovies.scss';

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: '',
    overview: '',
    poster_path: '',
    release_date: '',
    vote_average: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Backend POST route: /api/admin/add
      await api.post('/admin/add', formData);
      alert("Movie added successfully! 🎬");
      navigate('/admin'); // Dashboard par wapis bhej do
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-page">
      <div className="form-card glass-effect">
        <h2>Add New Movie</h2>
        <p>Enter movie details to sync with the database.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Movie Title</label>
            <input 
              type="text" name="title" required 
              placeholder="e.g. Interstellar"
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label>Poster Path (TMDB URL segment)</label>
            <input 
              type="text" name="poster_path" required 
              placeholder="e.g. /gEU2qstatus838.jpg"
              onChange={handleChange} 
            />
          </div>

          <div className="row">
            <div className="form-group">
              <label>Release Date</label>
              <input type="date" name="release_date" required onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Rating (0-10)</label>
              <input 
                type="number" name="vote_average" step="0.1" max="10" required 
                placeholder="8.5"
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Overview / Description</label>
            <textarea 
              name="overview" rows="4" required 
              placeholder="Enter a brief description..."
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate('/admin')}>Cancel</button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Adding..." : "Save Movie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;