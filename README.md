# Capstone--Travel-App

## Overview
The Capstone--Travel App is a project developed as part of Udacity’s curriculum. It allows users to input their desired travel location and date, providing information about the weather conditions on that date. The app forecasts the weather, including the expected high and low temperatures, and displays an image of the location. The app integrates with three external APIs: one for obtaining location coordinates (latitude and longitude), another for weather data, and a third for location images.

### Technical Specifications:
- **Node.js Version:** v20.10.0
- **npm Version:** 10.8.2

## Skills and Technologies Used

### Front-End:
- **API Integration:** Utilized the `axios` library to fetch data from APIs.
- **DOM Manipulation:** Accessed and modified DOM elements using `getElementById` and `querySelector`.
- **UI Updates:** Used `innerHTML` to dynamically update the user interface.
- **Asynchronous JavaScript:** Employed async functions and callback functions to handle API responses and UI updates.
- **Styling:** Designed the user interface with CSS and SASS, focusing on responsive and visually appealing design.

### Back-End:
- **Server Development:** Built a Node.js server using the Express framework to handle client requests and manage API interactions from the server side.
- **Webpack:** Utilized Webpack to bundle and optimize project files, improving efficiency and reducing file sizes.
- **Service Workers:** Implemented service workers to enable offline functionality and cache important assets.
- **Testing:** Created unit tests for various methods using the Jest framework to ensure reliability and correctness of the application.
- **Version Control:** Managed the project using Git and GitHub, including initializing repositories and pushing code updates.

### Installation Instructions:


1. **Install dependencies**:
    ```bash
    npm install
    ```

2. **Create a `.env` file in the root directory** with your API keys for GeoNames, Weatherbit, and Pixabay APIs:
    ```bash
    USERNAME_KEY=your_geonames_username
    WEATHER_KEY=your_weatherbit_api_key
    PICTURE_KEY=your_pixabay_api_key
    ```

3. **Build the project**:
    ```bash
    npm run build
    ```

4. **Start the development server**:
    ```bash
    npm run dev
    ```

5. **Start the production server**:
    ```bash
    npm start
    ```

### Instructions to Run the Project:
- **To start the server** : `npm start`
- **To build the project** : `npm run build`
- **To run the project** : `npm run dev`


