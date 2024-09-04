const axios = require("axios");

const getWeather = async (latitude, longitude, days, apiKey) => {
    if (days < 0) {
        return {
            error: true,
            message: "Date cannot be in the past"
        };
    }

    try {
        let weatherData = {};

        if (days >= 0 && days <= 7) {
            const { data } = await axios.get(`http://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&units=M&key=${apiKey}`);
            const { weather, temp } = data.data[0];
            const { description } = weather;
            weatherData = { description, temp };

        } else if (days > 7) {
            const { data } = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&units=M&days=${days}&key=${apiKey}`);
            const { weather, temp, app_max_temp, app_min_temp } = data.data[data.data.length - 1];
            const { description } = weather;
            weatherData = { description, temp, app_max_temp, app_min_temp };
        }

        return weatherData;

    } catch (error) {
        console.error("Error fetching weather data:", error);
        return {
            error: true,
            message: "An error occurred while fetching the weather data."
        };
    }
};

module.exports = { getWeather };
