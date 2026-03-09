const Movie = require("../models/movie.model");

exports.addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json({ message: "Movie removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdminMovies = async (req, res) => {
  try {
    const movies = await Movie.find({}); // Database se saari movies nikalo
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Server Error: Could not fetch movies" });
  }
};