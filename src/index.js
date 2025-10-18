import "./style.css";
import { DateTime } from 'luxon';

import clearDay from "./img/clear-day.svg";
import clearNight from "./img/clear-night.svg";
import cloudy from "./img/cloudy.svg";
import partlyCloudyDay from "./img/partly-cloudy-day.svg";
import partlyCloudyNight from "./img/partly-cloudy-night.svg";
import rain from "./img/rain.svg";
import snow from "./img/snow.svg";
import windIcon from "./img/wind.svg";

const weatherIcon = document.querySelector('img');
const temperature = document.querySelector('.temperature');
const date = document.querySelector('.date');
const dayAndHour = document.querySelector('.day-hour');
const min = document.querySelector('.min');
const max = document.querySelector('.max');
const precipitation = document.querySelector('.precipitation');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const cityTitle = document.querySelector('.city-title');
let unit = 'metric';
let tempUnit;
let windUnit;


async function getWeather(city) {

    try {

        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unit}&include=hours&key=T7W7PCFE2UAPXW6CZ6ZUNY9HV&contentType=json`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const weatherData = await response.json();

        const timezone = weatherData.timezone;
        const timeInCity = DateTime.now().setZone(timezone);
        const weekDay = timeInCity.toFormat('cccc, H:00');
        console.log(timeInCity.c.hour)
        const currentHour = timeInCity.c.hour;

        console.log(`${timeInCity.c.day}/${timeInCity.c.month}/${timeInCity.c.year}`)

        const icon = weatherData.days[0].hours[currentHour].icon;
        if (icon === 'clear-day') {
            weatherIcon.src = clearDay;
        } else if ( icon === 'clear-night') {
            weatherIcon.src = clearNight;
        } else if (icon === 'cloudy') {
            weatherIcon.src = cloudy;
        } else if ( icon === 'partly-cloudy-day') {
            weatherIcon.src = partlyCloudyDay;
        } else if ( icon === 'partly-cloudy-night') {
            weatherIcon.src = partlyCloudyNight;
        } else if ( icon === 'rain') {
            weatherIcon.src = rain;
        } else if ( icon === 'snow') {
            weatherIcon.src = snow;
        } else if ( icon === 'wind') {
            weatherIcon.src = windIcon;
        } else {
            weatherIcon.src = clearDay;
        }


        if (unit === 'metric') {
            tempUnit = '°C';
            windUnit = 'km/h'

        } else if ( unit === 'us') {
            tempUnit = '°F';
            windUnit = 'mph'
        }


        cityTitle.textContent = city.toUpperCase();
        date.textContent = `${timeInCity.c.day}/${timeInCity.c.month}/${timeInCity.c.year}`;
        dayAndHour.textContent = `${weekDay} `
        max.textContent = `Max: ${Math.round(weatherData.days[0].tempmax)} ${tempUnit}`
        min.textContent = `Min: ${Math.round(weatherData.days[0].tempmin)} ${tempUnit}`
        temperature.textContent = Math.round(weatherData.days[0].hours[currentHour].temp);
        precipitation.textContent = `Precipitation: ${Math.round(weatherData.days[0].hours[currentHour].precipprob)}%`;
        humidity.textContent = `Humidity: ${Math.round(weatherData.days[0].hours[currentHour].humidity)}%`;
        wind.textContent = `Wind: ${weatherData.days[0].hours[currentHour].windspeed} ${windUnit}`;

        

    } catch (error) {
            console.log(error);
        }
};

const form = document.querySelector('form');
const cityInput = document.querySelector('.city');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    getWeather(city);
    cityInput.value = '';
});

const celciusBtn = document.getElementById('metric');
const fahrBtn = document.getElementById('us');

function toggleUnit(unit1, unit2) {
    unit1.classList.add('active');
    unit2.classList.remove('active');
}

celciusBtn.addEventListener('click', () => {
    unit = 'metric';
    getWeather(cityTitle.textContent);
    toggleUnit(celciusBtn, fahrBtn);
});

fahrBtn.addEventListener('click', () => {
    unit = 'us';
    getWeather(cityTitle.textContent);
    toggleUnit(fahrBtn, celciusBtn);
    
});


getWeather('madrid');

