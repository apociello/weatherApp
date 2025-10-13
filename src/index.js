import "./style.css";

async function getWeather() {
    const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/madrid?unitGroup=metric&include=hours&key=T7W7PCFE2UAPXW6CZ6ZUNY9HV&contentType=json");
    const weatherData = await response.json();

    console.log(weatherData);
}


getWeather()