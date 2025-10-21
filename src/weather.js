import { DateTime } from 'luxon';

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
const searchError = document.getElementById('error');
const form = document.querySelector('form');
const cityInput = document.querySelector('.city');
const loading = document.querySelector('.loading')
const container = document.querySelector('.container')
const celciusBtn = document.getElementById('metric');
const fahrBtn = document.getElementById('us');
let unit = 'metric';
let tempUnit;
let windUnit;



export default async function getWeather(city) {

    try {

        loading.classList.remove('hide');
        container.classList.add('hide');

        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unit}&include=hours&key=T7W7PCFE2UAPXW6CZ6ZUNY9HV&contentType=json`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const weatherData = await response.json();

        const timezone = weatherData.timezone;
        const timeInCity = DateTime.now().setZone(timezone);
        const weekDay = timeInCity.toFormat('cccc, H:00');
        const currentHour = timeInCity.c.hour;

        const icon = weatherData.days[0].hours[currentHour].icon;
        if (icon === 'clear-day') {
            const clearDay = await import("./img/clear-day.svg");
            weatherIcon.src = clearDay.default;
        } else if ( icon === 'clear-night') {
            const clearNight = await import("./img/clear-night.svg");
            weatherIcon.src = clearNight.default;
        } else if (icon === 'cloudy') {
            const cloudy = await import("./img/cloudy.svg");
            weatherIcon.src = cloudy.default;
        } else if ( icon === 'partly-cloudy-day') {
            const partlyCloudyDay = await import("./img/partly-cloudy-day.svg");
            weatherIcon.src = partlyCloudyDay.default;
        } else if ( icon === 'partly-cloudy-night') {
            const partlyCloudyNight = await import("./img/partly-cloudy-night.svg");
            weatherIcon.src = partlyCloudyNight.default;
        } else if ( icon === 'rain') {
            const rain = await import("./img/rain.svg");
            weatherIcon.src = rain.default;
        } else if ( icon === 'snow') {
            const snow = await import("./img/snow.svg");
            weatherIcon.src = snow.default;
        } else if ( icon === 'wind') {
            const windIcon = await import("./img/wind.svg");
            weatherIcon.src = windIcon.default;
        } else {
            const clearDay = await import("./img/clear-day.svg");
            weatherIcon.src =  clearDay.default;
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

        if (!searchError.classList.contains('hide')) searchError.classList.add('hide');

    } catch (error) {
            console.log(error);
            if (searchError.classList.contains('hide')) searchError.classList.remove('hide')
    } finally {
        loading.classList.add('hide');
        container.classList.remove('hide');
    }
};


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    getWeather(city);
    cityInput.value = '';
});



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



