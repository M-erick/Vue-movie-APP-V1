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

        // const roleIdQuery = 'SELECT id FROM roles WHERE name = "user"';
        // const [roleResult] = await pool.query(roleIdQuery);
        // const roleId = roleResult[0].id;

        // assigned a default user role_id here :will update it to be dynamic later
        const roleId = 1;

        const query = `INSERT INTO users(first_name,last_name,password,email,role_id) VALUES(?,?,?,?,?)`;
        const[result] =await pool.query(query,[userData.firstName,userData.lastName,userData.password,userData.email,roleId]);
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

