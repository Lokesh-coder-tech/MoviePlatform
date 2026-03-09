const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');
const { addMovie, updateMovie, deleteMovie, getAdminMovies } = require('../controllers/adminController');


router.post('/add', protect, admin, addMovie);
router.get('/movies', protect, admin, getAdminMovies);
router.put('/edit/:id', protect, admin, updateMovie);
router.delete('/delete/:id', protect, admin, deleteMovie);

module.exports = router;