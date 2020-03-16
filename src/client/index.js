import './styles/main.scss';
import { getDates } from './js/getDates';

/* Global Variables */
let addEntryButton = document.getElementById('entry-button');
let header = document.getElementById('header');
let startDateElement = document.getElementById('start-date');
let endDateElement = document.getElementById('end-date');
let zipElement = document.getElementById('zip');
let entrySection = document.getElementById('entry-section');
let entriesElement = document.getElementById('entries');

document.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// API Key
const apiKey = process.env.API_KEY;

// Request URL
const locationURL =
  'http://api.geonames.org/postalCodeSearchJSON?username=jarodpeachey';

// Event Listener
addEntryButton.addEventListener('click', addEntry);

// Add Entry
async function addEntry(e) {
  e.preventDefault();
  if (
    zipElement.value == '' ||
    startDateElement.value == '' ||
    endDateElement.value == ''
  ) {
    alert('Please fill in all the fields.');
  } else {
    getCityLocation(zipElement.value);
  }
}

// // Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

async function getCityLocation(zipCode) {
  let response;

  await fetch(`${locationURL}&postalcode=${zipCode}&countryCode=US`).then(
    (res) => (response = res),
  );

  const jsonResponse = await response.json();

  console.log(jsonResponse);

  const city = jsonResponse.postalCodes[0];

  const startTime = new Date(startDateElement.value);
  const endTime = new Date(endDateElement.value);

  const allDates = getDates(startTime, endTime);

  const request = await requestWeatherData(city, allDates).then(
    (res) => (response = res),
  );

  console.log('Requesting data from api: ', response);

  if (response.success) {
    getWeatherData();
  }
}

async function requestWeatherData(city, dates) {
  let response;

  const data = {
    ...city,
    dates,
    key: process.env.DARK_SKY_KEY,
  };

  const requestData = await postData('/requestWeather', data).then(
    (res) => (response = res),
  );

  return response;
}

async function getWeatherData() {
  const weatherData = null;

  await getData('/getWeather').then((res) => {
    console.log(res);
    weatherData = res;
  });

  displayWeatherData(weatherData);
}

function displayWeatherData(weatherData) {
  console.log(weatherData);
}

async function postData(url, data) {
  let result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  let responseData = await result.json();

  return responseData;
}

async function getData(url) {
  let result = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let responseData = await result.json();

  return responseData;
}

function displayResults(data) {
  const entries = data.entries;
  const { name, date, feeling, zip, temp } = entries[entries.length - 1];

  const wrapper = document.createElement('div');
  const flex = document.createElement('div');
  const textWrapper = document.createElement('div');
  const nameElement = document.createElement('em');
  const dateElement = document.createElement('span');
  const tempElement = document.createElement('div');
  const tempIndicator = document.createElement('span');
  const feelingsElement = document.createElement('p');

  wrapper.classList.add('entry-card');
  flex.classList.add('entry-flex');
  nameElement.classList.add('entry-name');
  dateElement.classList.add('entry-date');
  tempElement.classList.add('entry-temp');
  tempIndicator.classList.add('entry-temp-indicator');
  textWrapper.classList.add('entry-feelings');

  nameElement.innerText = `- ${name}`;
  dateElement.innerText = date;
  feelingsElement.innerText = feeling;
  tempIndicator.innerText = '(F)';
  tempElement.innerText = `${temp}°`;
  tempElement.appendChild(tempIndicator);

  flex.appendChild(tempElement);
  flex.appendChild(dateElement);
  textWrapper.appendChild(feelingsElement);
  textWrapper.appendChild(nameElement);
  wrapper.appendChild(flex);
  wrapper.appendChild(textWrapper);

  entriesElement.appendChild(wrapper);
  entrySection.style.display = 'block';
}
