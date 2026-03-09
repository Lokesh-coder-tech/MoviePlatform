import React, { useState, useEffect } from 'react';
import { tmdb } from '../services/tmdb'; // ✅ Backend api ki jagah tmdb instance use karein
import MovieCard from '../components/Movie/MovieCard';
import { useDebounce } from '../hooks/useDebounce';
import '../styles/pages/search.scss';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const debouncedQuery = useDebounce(query, 600);

  useEffect(() => {
    const fetchSearch = async () => {
      // Jab user query clear kare toh results reset ho jayein
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        // ✅ Endpoint fixed: query parameter use kiya hai aur seedha TMDB call ki hai
        const res = await tmdb.get(`/search/movie`, {
          params: { query: debouncedQuery }
        });
        
        // TMDB ka data results array mein hota hai
        setResults(res.data.results);
      } catch (err) {
        console.error("TMDB Search Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [debouncedQuery]);

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Search Movies</h1>
        <div className="search-bar-container">
          <input 
            type="text" 
            placeholder="Type movie name (e.g. Iron Man)..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input glass-effect" // ✅ Glassmorphism support
            autoFocus
          />
        </div>
      </div>

      <div className="search-results-section">
        {loading && <div className="loader">Searching the multiverse...</div>}
        
        {!loading && results.length > 0 && (
          <div className="movie-grid">
            {results.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {/* ✅ Better UX: No results message tab dikhao jab loading khatam ho jaye aur query ho */}
        {!loading && debouncedQuery && results.length === 0 && (
          <div className="no-results-container">
            <p className="no-results">Bhai, "{debouncedQuery}" naam ki koi movie nahi mili. Kuch aur try karo!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;