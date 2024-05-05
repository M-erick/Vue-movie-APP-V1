const mysql = require('mysql2');
require('dotenv').config({ path: './config/.env' }); 
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

exports.createUser = async(userData) => {
    try {
        const query = `INSERT INTO users(first_name,last_name,password,email) VALUES(?,?,?,?)`;
        const[result] =await pool.query(query,[userData.firstName,userData.lastName,userData.password,userData.email]);
        return result;
        
    } catch (error) {
        throw error;
        
    }
    
};

exports.findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
            if (error) {
                reject(error);
            } else {
                if (results.length === 0) {
                    resolve(null); // Return null if no user found
                } else {
                    resolve(results[0]); // Return the first user found
                }
            }
        });
    });
};

