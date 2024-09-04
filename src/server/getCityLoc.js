const axios = require("axios");

const getCityloc = async (cityName, geoUsername) => {
    try {
        const response = await axios.get(`http://api.geonames.org/postalCodeSearchJSON?placename=${cityName}&maxRows=1&username=${geoUsername}`);
        const locationData = response.data;

        if (!locationData.postalCodes || locationData.postalCodes.length === 0) {
            return {
                error: true,
                message: "City not found. Please check the spelling and try again."
            };
        }

        const { lat, lng, placeName } = locationData.postalCodes[0];
        return { latitude: lat, longitude: lng, cityName: placeName };
    } catch (error) {
        return { error: true, message: "An error occurred while fetching city location." };
    }
};

module.exports = { getCityloc};
