const mysql = require('mysql2/promise');
require('dotenv').config({ path: './config/.env' }); 

// Create a pool for database connections.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const Movie = {
    // Create a new movie entry
    createMovie: async (movieData) => {
        try {
            const query = `INSERT INTO movies (title, description, genre, released_date,rating) VALUES (?, ?, ?, ?,?)`;
            const [result] = await pool.query(query, [movieData.title, movieData.description, movieData.genre, movieData.release_date,movieData.rating]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    // Get all movies from the database
    getAllMovies: async () => {
        try {
            const query = `SELECT * FROM movies`;
            const [movies] = await pool.query(query);
            return movies;
        } catch (error) {
            throw error;
        }
    },

    // Get a single movie by ID
    getMovieById: async (id) => {
        try {
            const query = `SELECT * FROM movies WHERE id = ?`;
            const [movies] = await pool.query(query, [id]);
            return movies[0] || null;
        } catch (error) {
            throw error;
        }
    },

    // Update a movie
    updateMovie: async (id, movieData) => {
        try {
            const query = `UPDATE movies SET title = ?, description = ?, genre = ?, release_date = ? WHERE id = ?`;
            const [result] = await pool.query(query, [movieData.title, movieData.description, movieData.genre, movieData.release_date, id]);
            return result;
        } catch (error) {
            throw error;
        }
    },
    searchMovies: async (params) => {
        let baseQuery = `SELECT * FROM movies WHERE 1 = 1`;
        const filterParams = [];

        if (params.title) {
            baseQuery += ` AND title LIKE ?`;
            filterParams.push(`%${params.title}%`); // Using LIKE for partial matches
        }
        if (params.genre) {
            baseQuery += ` AND genre = ?`;
            filterParams.push(params.genre);
        }
        if (params.releaseYear) {
            baseQuery += ` AND YEAR(release_date) = ?`;
            filterParams.push(params.releaseYear);
        }
        if (params.rating) {
            baseQuery += ` AND rating >= ?`;
            filterParams.push(params.rating);
        }

        try {
            const [results] = await pool.query(baseQuery, filterParams);
            return results;
        } catch (error) {
            throw error;
        }
    },

    // Delete a movie
    deleteMovie: async (id) => {
        try {
            const query = `DELETE FROM movies WHERE id = ?`;
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            throw error;
        }
    },
    getTopMoviesByGenre:async(genre)=> {
        try {
          const query = 'SELECT * FROM movies WHERE genre = ? AND top = true';
          const [results] = await pool.query(query, [genre]);
          return results;
        } catch (error) {
          throw error;
        }
      }
};

module.exports = Movie;
