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
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        const user = await User.createUser({...req.body, password: hashedPassword});
        res.status(201).send({ user, message: 'Registered successfully' });
    } catch (error) {
        res.status(500).send(error);
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
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            return res.status(401).send({ message: 'Authentication failed' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.send({ user, token });
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.logout = (req, res) => {
    res.status(200).send({ message: 'Logged out successfully' });
};
