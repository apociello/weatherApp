import "./style.css";

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
const min = document.querySelector('.min');
const max = document.querySelector('.max');
const precipitation = document.querySelector('.precipitation');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

async function getWeather(city) {

    try {

        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=hours&key=T7W7PCFE2UAPXW6CZ6ZUNY9HV&contentType=json`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const weatherData = await response.json();
        const currentHour = new Date().getHours();

        date.textContent = `Date: ${weatherData.days[0].datetime}`;
        max.textContent = `Max: ${Math.round(weatherData.days[0].tempmax)}`
        min.textContent = `Min:${Math.round(weatherData.days[0].tempmin)}`
        temperature.textContent = Math.round(weatherData.days[0].hours[currentHour].temp);
        precipitation.textContent = `Precipitation: ${Math.round(weatherData.days[0].hours[currentHour].precipprob)}%`;
        humidity.textContent = `Humidity: ${Math.round(weatherData.days[0].hours[currentHour].humidity)}%`;
        wind.textContent = `Wind: ${weatherData.days[0].hours[currentHour].windspeed} km/h`;

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

        console.log(weatherData.days[0].hours[currentHour].icon);

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

getWeather('madrid');