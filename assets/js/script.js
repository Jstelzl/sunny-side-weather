// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
var currentWeather = document.getElementById("current-weather");
console.log(currentWeather);
var forecastWeather = document.getElementById("forecast-weather");
var apiKey = 'f6634c74e1ebddea5c471376cbdb35fc';
function fetchWeather() {
    var lat = '35.2271';
    var long = '-80.8431';
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long 
        + "&units=imperial&appid=" 
        + apiKey
        )
        .then((response) => response.json())
        .then((data) => {
            displayCurrent(data)
            displayForecast(data)
        });
};

function displayCurrent(data) {
    console.log(data);
    var cityName = document.createElement("h3");
    cityName.textContent = data.name
    currentWeather.appendChild(cityName);
    var temp = document.createElement("p");
    temp.textContent = data.main.temp
    currentWeather.appendChild(temp);
    // const { name } = data; 
    // const { icon, description } = data.;
    // const { temp, humidity } = data.;
    // const { speed } = data.wind;
    // console.log(name,icon,description,temp,humidity,speed); 
    // document.querySelector(".city").innerText = "Wather in" + name;
    // document.querySelector(".icon").src = 
    //     "https://openweathermap.org/img/wn/" + icon + "@2x.png";
};

function displayForecast(data) {

};

function getCord() {

};

fetchWeather();