// Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

// Empty data object
projectData = {
  entries: [],
};

// Start up an instance of app
const app = express();

/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware, as well as cors
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('public'));

// Initialize server
const port = 9000;

const server = app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

// Set up HTTP request routes
app.post('/requestWeather', requestWeatherAndImage);
app.get('/getWeather', getWeather);
app.post('/add', postData);
app.get('/data', sendData);

async function requestWeatherAndImage(request, response) {
  let weatherRequests = [];
  // let allWeatherData = [];

  request.body.dates.forEach((date) => {
    weatherRequests.push(
      new Promise((resolve, reject) => {
        fetch(
          `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${request.body.lat},${request.body.lng},${date}`,
        )
          .then((res) => res.json())
          .then((data) =>
            resolve({
              date: date,
              ...data,
            }),
          );
      }),
    );
  });

  const weatherData = await Promise.all(weatherRequests);

  const imageData = await new Promise((resolve, reject) => {
    fetch(
      `http://pixabay.com/api/?key=15677514-092f8c69534bf8a323160addc&q=${request.body.placeName}`,
    )
      .then((res) => res.json())
      .then((imageData) => {
        resolve({
          image: { ...imageData },
        });
      });
  });

  const newEntry = {
    location: request.body.placeName,
    weather: {
      ...weatherData,
    },
    ...imageData,
  };

  projectData = {
    entries: [newEntry, ...projectData.entries],
  };

  response.send({ success: true });
}

function getWeather(request, response) {
  console.log('Line 69: projectData: ', projectData.entries);
  response.send(projectData.entries);
}

// Set up functions for HTTP requests
function sendData(request, response) {
  response.send(projectData.entries);
}

function postData(request, response) {
  newEntry = {
    date: request.body.date,
    location: request.body.location,
    feeling: request.body.feelings,
    temp: ((request.body.temp - 273.15) * (9 / 5) + 32).toFixed(), // Convert to F°
    name: request.body.name,
    id:
      projectData.entries.length > 0
        ? projectData.entries[projectData.entries.length - 1].id + 1
        : 1,
  };

  projectData = {
    entries: [newEntry, ...projectData.entries],
  };

  response.send(projectData);
}
