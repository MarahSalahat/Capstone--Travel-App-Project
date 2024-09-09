const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getCityloc } = require('../../server/getCityLoc');
const { getWeather } = require('../../server/getWeather');
const { getPicture } = require('../../server/getPicture');
const app = express();

// Apply middleware (mirroring your server configuration)
app.use(cors());
app.use(bodyParser.json());

// Mock the external functions
jest.mock('../../server/getCityLoc');
jest.mock('../../server/getWeather');
jest.mock('../../server/getPicture');

// POST Route for GeoNames city location
app.post('/getCityloc', async (req, res) => {
    try {
        const { city } = req.body;
        const location = await getCityloc(city);
        res.json(location);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching city location' });
    }
});

// POST Route for weather data
app.post('/getWeather', async (req, res) => {
    try {
        const { lat, lng, remainingDays } = req.body;
        const weather = await getWeather(lat, lng, remainingDays);
        res.json(weather);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

// POST Route for city picture
app.post('/getPicture', async (req, res) => {
    try {
        const { city } = req.body;
        const picture = await getPicture(city);
        res.json(picture);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching city picture' });
    }
});

describe('Server API Endpoints', () => {

    beforeEach(() => {
        // Clear mock calls before each test
        jest.clearAllMocks();
    });

    it('should return city location for /getCityloc', async () => {
        const mockLocation = { longitude: 13.405, latitude: 52.52, city: 'Berlin' };
        getCityloc.mockResolvedValue(mockLocation);

        const response = await request(app)
            .post('/getCityloc')
            .send({ city: 'Berlin' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockLocation);
        expect(getCityloc).toHaveBeenCalledWith('Berlin');
    });

    it('should return weather data for /getWeather', async () => {
        const mockWeather = { description: 'Sunny', temp: 25 };
        getWeather.mockResolvedValue(mockWeather);

        const response = await request(app)
            .post('/getWeather')
            .send({ lat: 52.52, lng: 13.405, remainingDays: 3 });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockWeather);
        expect(getWeather).toHaveBeenCalledWith(52.52, 13.405, 3);
    });

    it('should return a city picture for /getPicture', async () => {
        const mockPicture = { image: 'https://example.com/berlin.jpg' };
        getPicture.mockResolvedValue(mockPicture);

        const response = await request(app)
            .post('/getPicture')
            .send({ city: 'Berlin' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockPicture);
        expect(getPicture).toHaveBeenCalledWith('Berlin');
    });

    it('should return a 500 error if city location cannot be fetched', async () => {
        getCityloc.mockRejectedValue(new Error('API failure'));

        const response = await request(app)
            .post('/getCityloc')
            .send({ city: 'Unknown City' });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Error fetching city location' });
    });

    it('should return a 500 error if weather data cannot be fetched', async () => {
        getWeather.mockRejectedValue(new Error('API failure'));

        const response = await request(app)
            .post('/getWeather')
            .send({ lat: 0, lng: 0, remainingDays: 5 });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Error fetching weather data' });
    });

    it('should return a 500 error if city picture cannot be fetched', async () => {
        getPicture.mockRejectedValue(new Error('API failure'));

        const response = await request(app)
            .post('/getPicture')
            .send({ city: 'Unknown City' });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Error fetching city picture' });
    });
});
