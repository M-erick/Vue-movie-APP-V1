require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './config/.env' }); 

const app = express();
app.use(cors());
app.use(express.json());

// JWT middleware to verify tokens:transferred this to middleware folder 'Hollah Dev'

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);


//defining movie routes
const movieRoutes = require('./routes/movieRoutes');
app.use('api/movie',movieRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
