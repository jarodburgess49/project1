

//SELECTION OF ELEMENTS USING QUERY SELECTOR
const iconElement = document.querySelector('.weather-icon');
const tempELement = document.querySelector('.temperature-value');
const descElement = document.querySelector('.temperature-description ');
const locationElement = document.querySelector('.location ');
const notifyElement = document.querySelector('.notification-description');

//APP DATA
const weather={};
weather.temperature={
    unit:"celsius"
}
//APP CONSTANTS AND VARIABLES
const kelvin = 273;

//APP KEY
const key = "654e541cdef6e06ce690045921983b54";

//CHECK IF USER BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}else{
    notificationElement.style.display="block";
    notificationElement.innerHTML = "<p>Browser dosent support geolocation</p>";
}

//SET USER LOCATION
function setPosition(position){
    let latitude  = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude,longitude);
}

//SHOW ERROR WHEN THERE IS ERROR WITH THE GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`;
}


//GET WEATHER FROM THE API PROVIDER
function getWeather(latitude,longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api).then(function(response){
        let data = response.json();
        console.log(api);
      
        return data;
        
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - kelvin);
        weather.description = data.weather[0].description;
        weather.iconID = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
}

//DISPLAY THE INFORMATION IN THE USER INTERFACE
function displayWeather(){
    iconElement.innerHTML = `<img src="img/${weather.iconID}.png.png"/>`;
    tempELement.innerHTML = `${weather.temperature.value}<span>°C</span`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city},${weather.country}`;


};


