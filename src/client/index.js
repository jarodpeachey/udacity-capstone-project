import './styles/main.scss';
import { getDates } from './js/getDates';
import elements from './js/elements';
import eventListeners from './js/eventListeners';

// Load Event Listeners
eventListeners();
addEntryButton.addEventListener('click', addEntry);

// Element Variables
const {
  addEntryButton,
  header,
  startDateElement,
  endDateElement,
  zipElement,
  entrySection,
  entriesElement,
} = elements;

// Request URL
const locationURL =
  'http://api.geonames.org/postalCodeSearchJSON?username=jarodpeachey';

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
    const city = await getCityLocation(zipElement.value);

    getWeatherData(city);
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

  const city = jsonResponse.postalCodes[0];

  return city;
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
  const startTime = new Date(startDateElement.value);
  const endTime = new Date(endDateElement.value);

  const allDates = getDates(startTime, endTime);

  const request = await requestWeatherData(city, allDates).then(
    (res) => (response = res),
  );

  if (response.success) {
    const weatherData = null;

    await getData('/getWeather').then((res) => {
      displayWeatherData(res);
    });
  }
}

function displayWeatherData(data) {
  entrySection.classList.add('show');

  entriesElement.innerHTML = '';

  data.map((item) => {
    const weatherArray = Object.values(item.weather);

    const firstDay = weatherArray[0];
    const secondDay = weatherArray[weatherArray.length - 1];

    const dateOne = `${new Date(firstDay.date * 1000).getMonth() +
      1}/${new Date(firstDay.date * 1000).getDate()}/${new Date(
      firstDay.date * 1000,
    ).getFullYear()}`;

    const dateTwo = `${new Date(secondDay.date * 1000).getMonth() +
      1}/${new Date(secondDay.date * 1000).getDate()}/${new Date(
      secondDay.date * 1000,
    ).getFullYear()}`;

    let entriesHTML = '<span>';

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
