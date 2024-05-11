const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const authenticate = require('../middleware/authenticate');
const multer = require('multer');

const upload = multer({ 
dest: 'uploads/',
limits: {
    fileSize: 1024 * 1024 * 5 // 5MB file size limit
} });

// applying authenticate middleware to movie endpoints:this should be to selected parts only

// Create a new movie
router.post('/',upload.single('image'),movieController.createMovie);

// Get all movies
router.get('/', movieController.getAllMovies);

// Search for movies based on query
router.get('/search', movieController.searchMovies);

//Get top movies of a specific genre
router.get('/top', movieController.getTopMoviesByGenre);

// get top movies by rating 
router.get('/tops/rating', movieController.getRating);
// Get a single movie by ID
router.get('/:id', movieController.getMovieById);

// Update a movie by ID
router.put('/:id',upload.single('image'), movieController.updateMovie);

// Delete a movie by ID
router.delete('/:id', movieController.deleteMovie);



module.exports = router;
