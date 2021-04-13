var countryCode = 'US'

var weatherApiKey = 'a6bf4e0e3ad10827dd4efb76de3ab5e4';

var zipSearchTxt = $('#zipSearchInputField')
var searchBtn = $('#zipSearchBtn');

var weather = {
    city: "",
    img: "",
    imgDesc: "",
    temp: "",
    humidity: "",
    currentConditions: ""
}

function getWeatherData() {

    var zipCode = zipSearchTxt.val();
    var weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${weatherApiKey}`;


    if (isNaN(parseInt(zipCode))) {
        // invalid zip
        console.log("Invalid Entry");
        zipSearchTxt.val('');
        return;
    }

    fetch(weatherApiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            weather.city = data.name;
            weather.temp = convertKelvin(data.main.temp);
            weather.humidity = data.main.humidity;
            weather.img = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weather.imgDesc = data.weather[0].description;
            weather.currentConditions = data.weather[0].main;

            console.log(weather);

            zipSearchTxt.val('');

            //updateCityWeatherCard(); see info inside function

        }).catch(function() {
            console.log("city does not exist");
            zipSearchTxt.val('');
            return;
        });

}

searchBtn.on('click', getWeatherData);

function convertKelvin(temp) {
    return Math.floor((temp - 273.15) * (9/5) + 32);
}

function updateCityWeatherCard() {

    // needs updating to build the weather card.
    $('#city-data').empty();

    $('#city-data').append(`<li>${weather.city}</li>` +
                           `<li><img src="${weather.img}" alt="${weather.imgDesc}"></li>` +
                           `<li>${weather.currentConditions}</li>` +
                           `<li>Temp: ${weather.temp} &#730F</li>` +
                           `<li>Humidity: ${weather.humidity}%</li>`);

}
