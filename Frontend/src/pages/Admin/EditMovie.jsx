import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/pages/admin.scss';

const EditMovie = () => {
  const { id } = useParams(); // URL se movie ID uthao
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    overview: '',
    poster_path: '',
    release_date: '',
    vote_average: ''
  });
  const [loading, setLoading] = useState(true);

  // 1. Purana data fetch karo
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const res = await api.get(`/movies/${id}`); // Single movie fetch route
        setFormData(res.data);
      } catch (err) {
        console.error("Data fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend PUT route: /api/admin/edit/:id
      await api.put(`/admin/edit/${id}`, formData);
      alert("Movie updated successfully! ✨");
      navigate('/admin'); // Dashboard par wapis bhej do
    } catch (err) {
      alert("Update failed!");
    }
  };

  if (loading) return <div className="loader">Loading details...</div>;

  return (
    <div className="admin-form-page">
      <div className="form-card glass-effect">
        <h2>Edit Movie</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Poster Path</label>
            <input type="text" name="poster_path" value={formData.poster_path} onChange={handleChange} required />
          </div>
          <div className="row">
            <div className="form-group">
              <label>Release Date</label>
              <input type="date" name="release_date" value={formData.release_date?.split('T')[0]} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Rating</label>
              <input type="number" name="vote_average" value={formData.vote_average} step="0.1" onChange={handleChange} required />
            </div>
          </div>
          <div className="form-group">
            <label>Overview</label>
            <textarea name="overview" value={formData.overview} rows="4" onChange={handleChange} required />
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate('/admin')}>Cancel</button>
            <button type="submit" className="submit-btn">Update Movie</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMovie;