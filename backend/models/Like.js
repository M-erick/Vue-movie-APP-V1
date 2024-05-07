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
const Likes = {
    createLike:async(movieData)=>{
        try{
            const query = `INSERT INTO likes(user_id,movie_id) VALUES (?,?)`;
            const [result] = await pool.query(query,[movieData.user_id,movieData.movie_id]);
            return result;

        }catch(error){
            throw error;
        }
    }
}
module.exports = Likes;