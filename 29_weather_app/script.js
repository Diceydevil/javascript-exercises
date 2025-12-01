const apiKey = "6db62cc22ee03fd18fbdf5dd412c27d0";
const city = "Bournemouth";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

console.log("Fetching weather data for", city);

const weatherDisplay = document.getElementById("weather-display");

fetch(url)
    .then(function(response) {
        console.log("Response status:", response.status);
        if (!response.ok) {
            throw new Error("API key not activated yet or invalid");
        }
        return response.json();
    })
    .then(function(data) {
        console.log("Weather data:", data);
        console.log("Temperature:", data.main.temp + "°C");
        console.log("Weather:", data.weather[0].description);
        console.log("Humidity:", data.main.humidity + "%");
        console.log("Wind speed:", data.wind.speed + " m/s");

        const temp = data.main.temp;
        const description = data.weather[0].description;
        const cityName = data.name;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        weatherDisplay.innerHTML = `
            <h2>${cityName}</h2>
            <p>Temperature: ${temp}°C</p>
            <p>Weather: ${description}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind speed: ${windSpeed} m/s</p>
        `;
    })
    .catch(function(error) {
        console.error("Error:", error);
        weatherDisplay.innerHTML = `<p>Error: ${error.message}</p>`;
    });

console.log("Request sent!");