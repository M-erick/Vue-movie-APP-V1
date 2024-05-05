const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const authenticate = require('../middleware/authenticate');

// applying authenticate middleware to movie endpoints:this should be to selected parts only

// Create a new movie
router.post('/', movieController.createMovie);

// Get all movies
router.get('/', movieController.getAllMovies);

// Get a single movie by ID
router.get('/:id', movieController.getMovieById);

// Update a movie by ID
router.put('/:id', movieController.updateMovie);

// Delete a movie by ID
router.delete('/:id', movieController.deleteMovie);

// Search for movies based on query
router.get('/search', movieController.searchMovies);


// Get top movies of a specific genre
router.get('/top', movieController.getTopMoviesByGenre);

module.exports = router;
