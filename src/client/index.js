import './styles/main.scss';

/* Global Variables */
let addEntryButton = document.getElementById('entry-button');
let nameElement = document.getElementById('name');
let zipElement = document.getElementById('zip');
let feelingsElement = document.getElementById('feelings');
let entrySection = document.getElementById('entry-section');
let entriesElement = document.getElementById('entries');

// API Key
const apiKey = process.env.API_KEY;

// Request URL
const locationURL = 'http://api.geonames.org/postalCodeSearchJSON?username=jarodpeachey';

// Event Listener
addEntryButton.addEventListener('click', addEntry);

// Add Entry
async function addEntry(e) {
  e.preventDefault();
  if (
    name.value == '' ||
    zipElement.value == '' ||
    feelingsElement.value == ''
  ) {
    alert('Please fill in all the fields.');
  } else {
    getCityLocation(zipElement.value);
  }
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

async function getCityLocation(zipCode) {
  let response;

  await fetch(
    `${locationURL}&postalcode=${zipCode}&countryCode=US`,
  ).then((res) => response = res);

  const jsonResponse = await response.json();

  console.log(jsonResponse);

  const city = jsonResponse.postalCodes[0];

  getWeatherData(city);
}

async function getWeatherData(city) {
  let response;

  const data = {
    ...city,
    key: process.env.DARK_SKY_KEY,
  }

  const serverResponse = postData('/getWeather', data);

  console.log(serverResponse);

  // await fetch(
  //   `${weatherURL}/${process.env.DARK_SKY_KEY}/${city.lat}, ${city.long}`,
  // ).then((res) => response = res);

  // const jsonResponse = await response.json();

  // console.log(jsonResponse);
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
