const mysql = require('mysql2');
require('dotenv').config({ path: './config/.env' }); 
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

exports.createUser = (userData) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO users SET ?', userData, (error, results) => {
            if (error) reject(error);
            resolve(results);
        });
    });
};

exports.findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
            if (error) reject(error);
            resolve(results[0]);
        });
    });
};
