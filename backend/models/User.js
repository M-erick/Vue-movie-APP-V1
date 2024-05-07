const mysql = require('mysql2/promise');
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

        const roleIdQuery = 'SELECT id FROM roles WHERE name = "user"';
        const [roleResult] = await pool.query(roleIdQuery);
        const roleId = roleResult[0].id;

        // assigned a default user role_id here :will update it to be dynamic later
        // const roleId = 2;

        const query = `INSERT INTO users(first_name,last_name,password,email,role_id) VALUES(?,?,?,?,?)`;
        pool.query(query,[userData.firstName,userData.lastName,userData.password,userData.email,roleId]);
        
    } catch (error) {
        throw error;
        
    }
    
};

exports.findUserByEmail = async(email) => {
        try{
            console.log('users');
            const query = `SELECT users.*, roles.name AS role_name FROM users INNER JOIN roles ON users.role_id = roles.id WHERE email = ?`;
            const [users] = await pool.query(query,[email]);

            // return that specific person 
            return users[0] || null;    
        }catch(error){
            throw error;
        }
   
    
};

exports.findUserById = async (id) => {
    try {
        const query = `SELECT * FROM users WHERE id = ?`;
        const [results] = await pool.query(query, [id]);
        return results.length > 0 ? results[0] : null; // Return the first user found or null if not found
    } catch (error) {
        throw error;
    }
}


