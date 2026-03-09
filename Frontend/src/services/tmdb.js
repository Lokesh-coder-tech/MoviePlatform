import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 
const BASE_URL = 'https://api.tmdb.org/3'; 

export const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US'
  },
});

// TMDB se image URL banane ke liye helpers
export const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
export const BACKDROP_BASE = 'https://image.tmdb.org/t/p/original';

// Essential Fetch Functions
export const fetchTrending = async () => {
  const { data } = await tmdb.get('/trending/movie/day');
  return data.results;
};

export const fetchMoviesByGenre = async (genreId) => {
  const { data } = await tmdb.get(`/discover/movie?with_genres=${genreId}`);
  return data.results;
};

//84ee3c7deb2971c8194377b1c038366d