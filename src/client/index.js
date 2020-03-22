import './styles/main.scss';
import { getAllDates } from './js/getDates';
import {
  addEntryButton,
  header,
  startDateElement,
  endDateElement,
  locationElement,
  entrySection,
  entriesElement,
} from './js/elements';
import eventListeners from './js/eventListeners';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Load Event Listeners
eventListeners();
addEntryButton.addEventListener('click', addEntry);

// Request URL
const locationURL =
  'http://api.geonames.org/postalCodeSearchJSON?username=jarodpeachey';

// Add Entry
async function addEntry(e) {
  e.preventDefault();
  if (
    locationElement.value == '' ||
    startDateElement.value == '' ||
    endDateElement.value == ''
  ) {
    alert('Please fill in all the fields.');
  } else {
    getCityLocation(locationElement.value);
  }
}

async function getCityLocation(location) {
  let response;

  await fetch(`${locationURL}&placename=${location}&countryCode=US`).then(
    (res) => (response = res),
  );

  const jsonResponse = await response.json();

  const city = jsonResponse.postalCodes[0];

  const startTime = new Date(startDateElement.value);
  const endTime = new Date(endDateElement.value);

  const allDates = getAllDates(startTime, endTime);

  const request = await requestWeatherData(city, allDates).then(
    (res) => (response = res),
  );

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

  await postData('/requestWeather', data).then((res) => (response = res));

  return response;
}

async function getWeatherData() {
  await getData('/getWeather').then((res) => {
    displayWeatherData(res);
  });
}

function displayWeatherData(data) {
  entrySection.classList.add('show');

  entriesElement.innerHTML = '';

  data.map((item) => {
    const weatherArray = Object.values(item.weather);

    const firstDay = weatherArray[0];
    const secondDay = weatherArray[weatherArray.length - 1];

    // Get first data
    const dateOne = `${new Date(firstDay.date * 1000).getMonth() +
      1}/${new Date(firstDay.date * 1000).getDate()}/${new Date(
      firstDay.date * 1000,
    ).getFullYear()}`;

    // Get second date
    const dateTwo = `${new Date(secondDay.date * 1000).getMonth() +
      1}/${new Date(secondDay.date * 1000).getDate()}/${new Date(
      secondDay.date * 1000,
    ).getFullYear()}`;

    let entriesHTML = '<span>';

    // Loop through weather and add new entry
    weatherArray.map((day) => {
      entriesHTML += `<div class='entry-day'>
              <div class='flex'>
                <span class='weather-day'>
                  ${new Date(day.date * 1000).toLocaleString('default', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <span class='weather-temp'>
                  ${day.daily.data[0].temperatureHigh}°
                </span>
              </div>
              <span class='weather-icon'>
                ${day.daily.data[0].summary}
              </span>
            </div>`;
    });

    entriesHTML += '</span>';

    const newEntry = `
    <div class="entry">
      <img class="entry-image" src="${
        item.image.hits[0]
          ? item.image.hits[0].webformatURL
          : 'https://images.pexels.com/photos/122400/pexels-photo-122400.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
      }" />
      <div class="entry-flex">
        <div>
          <h1 class="entry-name">${item.location}</h1>
          <span class="entry-info">${dateOne} - ${dateTwo}</span>
        </div>
        <div class="entry-icon">
          <span class="entry-info">
            ${firstDay.daily.data[0].summary}
          </span>
        </div>
      </div>
      <div class="entry-weather">
        ${entriesHTML}
      </div>
    </div>
  `;

    entriesElement.innerHTML += newEntry;
  });
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
