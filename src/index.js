import "./style.css";


async function getWeather(city) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=hours&key=T7W7PCFE2UAPXW6CZ6ZUNY9HV&contentType=json`);
    const weatherData = await response.json();

    const currentHour = new Date().getHours();

    console.log(`Date: ${weatherData.days[0].datetime}`);
    console.log(`Max: ${weatherData.days[0].tempmax}º`);
    console.log(`Min: ${weatherData.days[0].tempmin}º`);
    
    console.log(`Temp: ${weatherData.days[0].hours[8].temp}º`);
    console.log(`Precipitation: ${weatherData.days[0].hours[8].precipprob}%`);
    console.log(`Humidity: ${weatherData.days[0].hours[currentHour].humidity}%`);
    console.log(`Wind: ${weatherData.days[0].hours[currentHour].windspeed} km/h`)
};

const searchBtn = document.querySelector('.search');
const cityInput = document.querySelector('.city');
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const city = cityInput.value;
    getWeather(city);
});

getWeather('madrid');