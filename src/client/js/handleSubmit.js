import axios from 'axios';
import { calculateRemainingDays } from './calculateRemainingDays';

// Select DOM elements
const form = document.getElementById('travelForm');
const dateInput = document.getElementById('date');
const cityInput = document.getElementById('city');
const cityError = document.getElementById('city_error');
const dateError = document.getElementById('date_error');
const detailsSection = document.querySelector('#details');

// Initialize the details section to be hidden
detailsSection.style.display = 'none';

// Handle form submission
const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate input
    if (!validateInput()) {
        return;
    }

    // Get city location
    const location = await getCity();
    if (location.error) {
        cityError.textContent = location.message;
        cityError.style.display = 'block';
        return;
    }
    cityError.style.display = 'none';

    const { longitude, latitude, city } = location;

    // Calculate remaining days
    const date = dateInput.value;
    const remainingDays = calculateRemainingDays(date);

    // Get weather information
    const weather = await getWeather(longitude, latitude, remainingDays);
    if (weather.error) {
        dateError.textContent = weather.message;
        dateError.style.display = 'block';
        return;
    }
    dateError.style.display = 'none';

    // Get city picture
    const cityPic = await getCityPicture(city);

    // Update the UI
    updateUI(remainingDays, city, weather, cityPic);
};

// Post data to the server to get city location
const getCity = async () => {
    try {
        const response = await axios.post('http://localhost:8000/getCityloc', 
            { city: cityInput.value },
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching city location:', error);
        return { error: true, message: 'Error fetching city location' };
    }
};

// Post data to the server to get weather information
const getWeather = async (longitude, latitude, remainingDays) => {
    try {
        const response = await axios.post('http://localhost:8000/getWeather', 
            { lng: longitude, lat: latitude, remainingDays }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return { error: true, message: 'Error fetching weather data' };
    }
};

// Post data to the server to get city picture
const getCityPicture = async (city) => {
    try {
        const response = await axios.post('http://localhost:8000/getPicture', 
            { city }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching city picture:', error);
        return { image: 'https://source.unsplash.com/random/640x480?city,morning,night?sig=1' };
    }
};

// Update UI with the fetched data
const updateUI = (remainingDays, city, weather, cityPic) => {
    document.getElementById('days').textContent = `Remaining Days: ${remainingDays}`;


    document.querySelector('.weather').textContent = remainingDays < 7
        ? `Weather is: ${weather.description}`
        : `Weather is expected to be: ${weather.description}`;

    document.querySelector('.temp').textContent = remainingDays > 7
        ? `Forecast: ${weather.temp} °C`
        : `Temperature: ${weather.temp} °C`;

    document.querySelector('.max-temp').textContent = remainingDays > 7
        ? `Max: ${weather.app_max_temp} °C`
        : '';

    document.querySelector('.min-temp').textContent = remainingDays > 7
        ? `Min: ${weather.app_min_temp} °C`
        : '';

    document.querySelector('.cityPic').innerHTML = 
        `<img src="${cityPic.image}" alt="Image of ${city}">`;

    detailsSection.style.display = 'block';
};

// Validate form input
const validateInput = () => {
    cityError.style.display = 'none';
    dateError.style.display = 'none';

    if (!cityInput.value) {
        cityError.style.display = 'block';
        cityError.textContent = 'You need to enter a city';
        return false;
    }

    if (!dateInput.value) {
        dateError.style.display = 'block';
        dateError.textContent = 'Please enter a valid date';
        return false;
    }

    if (calculateRemainingDays(dateInput.value) < 0) {
        dateError.style.display = 'block';
        dateError.textContent = 'Date should be in the future';
        return false;
    }

    return true;
};

export { handleSubmit };
