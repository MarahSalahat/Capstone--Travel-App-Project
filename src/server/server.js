const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Importing functions from other files
const { getCityloc } = require('./getCityLoc');
const { getWeather } = require('./getWeather');
const { getPicture } = require('./getPicture');

// Initialize dotenv for environment variables
dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// API keys from environment variables
const geoNamesUsername = process.env.USERNAME_KEY;
const weatherApiKey = process.env.WEATHER_KEY;
const pixabayApiKey = process.env.PICTURE_KEY;

// Serve static files from 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// POST Route for GeoNames city location
app.post('/getCityloc', async (req, res) => {
    try {
        const { city } = req.body;
        const location = await getCityloc(city, geoNamesUsername);
        res.json(location);
        console.log(location);
    } catch (error) {
        console.error('Error fetching city location:', error);
        res.status(500).json({ error: 'Error fetching city location' });
    }
});

// POST Route for weather data
// POST Route for weather data
app.post('/getWeather', async (req, res) => {
    const { lat, lng, remainingDays } = req.body;

    // Validate lat and lng
    if (!lat || !lng) {
        console.error('Latitude and/or Longitude are undefined.');
        return res.status(400).json({ error: 'Latitude and Longitude are required' });
    }

    try {
        const weather = await getWeather(lat, lng, remainingDays, weatherApiKey);
        res.json(weather);
    } catch (error) {
        console.error('Error fetching weather data:', error.message || error.response?.data || error);
        res.status(500).json({ error: 'An error occurred while fetching the weather data' });
    }
});


// POST Route for city picture
app.post('/getPicture', async (req, res) => {
    try {
        const { city } = req.body;
        const picture = await getPicture(city, pixabayApiKey);
        res.json(picture);
    } catch (error) {
        console.error('Error fetching city picture:', error);
        res.status(500).json({ error: 'Error fetching city picture' });
    }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
