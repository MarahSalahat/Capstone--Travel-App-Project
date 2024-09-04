const axios = require("axios");

const getPicture = async (cityName, apiKey) => {
    try {
        const response = await axios.get(`https://pixabay.com/api/?key=${apiKey}&q=${cityName}&image_type=photo`);
        const images = response.data.hits;

        if (images.length > 0) {
            return { image: images[0].webformatURL };
        } else {
            return { image: "https://source.unsplash.com/random/640x480?city,morning,night?sig=1" };
        }
    } catch (error) {
        console.error("Error fetching image:", error);
        return { image: "https://source.unsplash.com/random/640x480?city,morning,night?sig=1" };
    }
};

module.exports = { getPicture};
