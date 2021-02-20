const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { fetchWeatherDataWithCoordinates } = require('./utils/weather-api');

// //Logging DIRECTORY
// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));

//Getting path to serve static content
const STATIC_PATH = path.join(__dirname, '../public');
const VIEWS_PATH = path.join(__dirname, '/templates/views');
const PARTIALS_PATH = path.join(__dirname, '/templates/partials');

//Initialize Express
const app = express();

//HEROKU Specific setting
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", VIEWS_PATH);

hbs.registerPartials(PARTIALS_PATH);

//Serving up static files
app.use(express.static(STATIC_PATH))

app.get("", (req, res) => {
    res.render("index", {
        name: "Pratyay",
        age: 26
    });
})

//API endpoint
app.get("/weather", async(req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.send({
            error: "You must provide a address for the search"
        });
    }
    const weather = await fetchWeatherDataWithCoordinates(address);
    if (weather) {
        return res.send({
            name: "Weather API",
            query: address,
            data: {
                weather
            }
        });
    } else {
        return res.send({
            error: "Data Not found"
        });
    }
})
app.get("/products", (req, res) => {
    const { search } = req.query;

    if (!search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    res.send({
        products: []
    });
})

//DEFAULT PATH - 404
app.get("/weather/*", (req, res) => {
    res.render("404page", { name: "weather" })
})
app.get("*", (req, res) => {
    res.render("404page");
});

//Listening to port specified in environment or 3000 (default)
app.listen(port, () => {
    console.log(`Server is Up on port ${port}`);
})