const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');
require('dotenv').config({ path: './config/.env' }); 

exports.register = async (req, res) => {
     // Validate inputs
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }
     const{email,password,firstName,lastName} = req.body;
     const hashedPassword = await bcrypt.hash(password, 8);
     const userData={
        email,
        firstName,
        lastName,
        password:hashedPassword
        
     }
    try {
        // const hashedPassword = await bcrypt.hash(req.body.password, 8);
        await User.createUser(userData);
        const user = await User.findUserByEmail(email);
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(201).send({ user, token, message: 'Registered successfully' });
    }
    
    catch (error) {
        console.log(error)
        res.status(500).send({message:"Error.."});
    }
};

exports.login = async (req, res) => {
     // Validate inputs
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }
    try {
        const user = await User.findUserByEmail(req.body.email);
        // console.log('updates');
        // console.log(user);
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            return res.status(401).send({ message: 'Authentication failed' });
        }
        const userRoleId = user.role_id;
        // defining the id to pass it to  the frontend
        const id = user.id;
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ user, token,userRoleId,id,message:'login in successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.logout = (req, res) => {
    // clear the token from local storage:not sure 
    localStorage.removeItem('token');
    res.status(200).send({ message: 'Logged out successfully' });
};

// Fetching user details:review this part.When a user in logged in ,can i use his id to determine the person inorder to fetch his details.

exports.findUserById = async(req,res)=>{
    try{
        const { id} = req.params;
        const user = await User.findUserById(id);
        if (!user) {
            return res.status(404).json({error:'User Not Found..'});
            
        }
        res.json(user);

    }catch(error){
        console.error('Error fetching movie:', error);
        res.status(500).json({ error: 'An error occurred while fetching User' });


        
    }
}