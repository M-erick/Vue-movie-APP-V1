const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');


// custom middleware
router.use(authenticate);

// applied validation on the data
router.post('/register',[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('first Name', 'First name is required').notEmpty(), 
    check('last Name', 'Last name is required').notEmpty()  
], userController.register);
router.post('/login',
[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
], userController.login);

router.post('/logout', userController.logout);
module.exports = router;
