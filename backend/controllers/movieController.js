const Movie = require('../models/Movie');

exports.createMovie = async (req, res) => {
  try {
    const { title, description, genre, releaseDate,rating } = req.body;
// check if file is present
    const imagePath = req.file ? req.file.path : null; 
    const movieData = {
      title,
      description,
      genre,
      rating,
      release_date: releaseDate,
      image:imagePath
    };
    const result = await Movie.createMovie(movieData);
    res.status(201).json({ message: 'Movie created successfully'});
  } catch (error) {
    console.error('Error creating movie:', error);
    res.status(500).json({ error: 'An error occurred while creating movie' });
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.getAllMovies();
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'An error occurred while fetching movies' });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.getMovieById(id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ error: 'An error occurred while fetching movie' });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    // destructure the  request body
    const { title, description, genre, releaseDate,rating } = req.body;
    const imagePath = req.file ? req.file.path : null; 

    const movieData = {
      title,
      description,
      genre,
      rating,
      release_date: releaseDate,
      image:imagePath
    };
    await Movie.updateMovie(id, movieData);
    res.json({ message: 'Movie updated successfully', movieId: id });
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(500).json({ error: 'An error occurred while updating movie' });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    await Movie.deleteMovie(id);
    res.json({ message: 'Movie deleted successfully', movieId: id });
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ error: 'An error occurred while deleting movie' });
  }
};
exports.searchMovies = async (req, res) => {
  try {
    const { searchQuery } = req.query;
    console.log(searchQuery);
    const movies = await Movie.searchMovies(searchQuery);
    res.json(movies);
  } catch (error) {
    console.error('Error searching movies:', error);
    res.status(500).json({ error: 'An error occurred while searching movies' });
  }
};
// rename the method below after it works:getTopMovieByRating
exports.getTopMoviesByGenre = async (req, res) => {
  try {
    const { topQuery} = req.query;
    console.log(topQuery);
    const movies = await Movie.getTopMoviesByGenre(topQuery);
    res.json(movies);
  } catch (error) {
    console.error('Error fetching top movies by genre:', error);
    res.status(500).json({ error: 'An error occurred while fetching top movies by genre' });
  }
};
exports.getRating=async(req,res)=>{
  try {
    const { ratingQuery} = req.query;
    // console.log(req.query);
    const movies = await Movie.getRatingTop(ratingQuery);
    res.json(movies);
    
  } catch (error) {
    console.error('Error fetching top movies by rating:', error);
    res.status(500).json({ error: 'An error occurred while fetching top movies by rating' });
    
  }
}

