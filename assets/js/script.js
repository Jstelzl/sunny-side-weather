// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var searchBar = document.querySelector("#search-bar");
var searchButton = document.getElementById('search');
var currentWeather = document.getElementById("current-weather");
var forecastWeather = document.getElementById("forecast-weather");
var apiKey = 'f6634c74e1ebddea5c471376cbdb35fc';
var cities = [];


function fetchWeather(city) {
    // call save function
    //var city = 'charlotte';
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city
        + "&units=imperial&appid=" 
        + apiKey
        )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const city = {
                name: data.name, 
                lat: data.coord.lat,
                long: data.coord.lon
            }
            displayCurrent(data)
            fetchWeatherFive(data.coord.lat, data.coord.lon)
            saveToLocalStorage(city);
        });
};

function fetchWeatherFive(lat, long) {
    
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long
        + "&units=imperial&appid="
        + apiKey
        )
        .then((response) => response.json())
        .then((info) => {
            displayForecast(info)
            // showFuture(info)
            // showFutureForecast(info)
        });
        
};


    var cityName = document.createElement("h3");
    cityName.setAttribute(
        'style',
        'text-align: center;'
    );
    
    var currentDate = document.createElement("p");
    currentDate.setAttribute(
        'style',
        'text-align: center;'
    );

    var wind = document.createElement("p");
    wind.setAttribute(
        'style',
        'text-align: center;'
    );

    var temp = document.createElement("p");
    temp.setAttribute(
        'style',
        'text-align: center;'
    );

    var humidity = document.createElement("p");
    humidity.setAttribute(
        'style',
        'text-align: center;'
    );
    currentWeather.appendChild(cityName);
    currentWeather.appendChild(currentDate);
    currentWeather.appendChild(temp);
    currentWeather.appendChild(wind);
    currentWeather.appendChild(humidity);

function displayCurrent(data) {
    
    cityName.textContent = "";
    currentDate.textContent = "";
    temp.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
    // city name
    cityName.textContent = "City: " + data.name

    // Current Date
    currentDate.textContent = "Today's Date: " + new Date("2022-11-14");
    
    // temp
    temp.textContent = "Temp: " + data.main.temp
    
    // wind
    wind.textContent = "Wind: " + data.wind.speed

    // humidity
    humidity.textContent = "Humitity: " + data.main.humidity
};

function displayForecast(data) {
    temp = document.createElement("p");
    temp.textContent = displayForecast;
    
    // wind = document.createElement("p");
    // wind.textContent = displayForecast;
    
    var forcastData = data.list
    console.log(data.list);

    forecastWeather.replaceChildren();
    for (i = 8; i < forcastData.length; i += 7) {
        var date = new Date(forcastData[i].dt * 1000);

        // 5 day Forcast

        var dateEl = document.createElement("p");
        dateEl.textContent = "Date: " + date;
        forecastWeather.appendChild(dateEl);

        var tempEl = document.createElement("p");
        tempEl.textContent = "Temp: " + forcastData[i].main.temp
        forecastWeather.appendChild(tempEl);

        var windEl = document.createElement("p");
        windEl.textContent = "Wind: " + forcastData[i].wind.speed
        forecastWeather.appendChild(windEl);

        var humidityEl = document.createElement("p");
        humidityEl.textContent = "Humitity: " + forcastData[i].main.humidity
        forecastWeather.appendChild(humidityEl);

    }

};

function getCityName(event) {
    event.preventDefault();
    var cityName = searchBar.value.trim();
    fetchWeather(cityName);
};

function saveToLocalStorage(city) {
    // cities.push(city);
    localStorage.setItem("cityhistory", JSON.stringify(cities));
};

function loadCityHistory() {
    const cityHistory = JSON.parse(localStorage.getItem("cityhistory"));
    // forloop to go through entire array
    createCityButton(city);
};

function createCityButton() {
    const cityButton = document.createElement("button");
    // button name = city's name
};

//cityButton.addEventListener("click", createCityButton);
searchButton.addEventListener("click", getCityName);
saveToLocalStorage();



// create buttons add eventlistener to generate search history button
// load call