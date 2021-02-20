const chalk = require('chalk');
const axios = require('axios');

function fetchCoordinates(address) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=pk.eyJ1IjoicHJhdHk5NCIsImEiOiJja2w1NHN2bTMwYnJoMnFxcGJxaHY0OWVkIn0.0irvwwpgi5_wYEODO3m_UA`
    console.log(chalk.bgBlue("Fetching Coordinates .. "));
    return axios.get(url).then((response) => {
        const data = response.data.features[0];
        const coordinates = data.center;
        console.log(chalk.bgMagenta(`Coordinates for ${address} : ${coordinates}`))
        return coordinates;
    }).catch(error => {
        console.log(chalk.bgRed("Could not fetch coordinates"));
    });
}

async function fetchWeatherDataWithCoordinates(address) {
    const coordinates = await fetchCoordinates(address);
    if (coordinates) {
        const url = `http://api.weatherstack.com/current?access_key=dcaccb8bba47b51ef9f6e4d133e0bac5&query=${coordinates[1]},${coordinates[0]}`;
        console.log(chalk.bgBlue("Weather API URL "), chalk.green(url));
        return axios.get(url).then(({ data }) => {
            const currData = data.current;
            console.log(chalk.bgGreen("Temperature"), chalk.green(currData.temperature), chalk.bgBlue("Feels Like"), chalk.blue(currData.feelslike));
            return currData;
        }).catch((error) => {
            console.error(error);
        })
    }
}

module.exports = { fetchWeatherDataWithCoordinates }