var countryCode = 'US'

var weatherApiKey = 'a6bf4e0e3ad10827dd4efb76de3ab5e4';

var zipSearchTxt = $('#zipSearchInputField')
var searchBtn = $('#zipSearchBtn');

var weather = {
    city: "",
    img: "",
    imgDesc: "",
    temp: "",
    tempHigh: "",
    tempLow:"",
    windSpeed:"",
    windDirection:"",
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
            weather.tempHigh = convertKelvin(data.main.temp_max);
            weather.tempLow = convertKelvin(data.main.temp_min);
            weather.windSpeed = convertKPHtoMPH(data.wind.speed);
            weather.windDirection = degreeToCompassDirection(data.wind.deg);

            console.log(weather);

            zipSearchTxt.val('');

            updateCityWeatherCard();

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

function convertKPHtoMPH(kph) {
    return Math.floor(kph/1.609344);
}

function degreeToCompassDirection(deg) {
    if(deg > 338 || deg <= 22) {
        return 'N';
    } else if (deg > 22 && deg <= 68) {
        return 'NE';
    } else if (deg > 68 && deg <= 113) {
        return 'E';
    } else if (deg > 113 && deg <= 158) {
        return 'SE';
    } else if (deg > 158 && deg <= 203) {
        return 'S';
    } else if (deg > 203 && deg <= 248) {
        return 'SW';
    } else if (deg > 248 && deg <= 293) {
        return 'W';
    } else {
        return 'NW';
    }
}

function updateCityWeatherCard() {

    // needs updating to build the weather card.
    $('#weather-card').empty();

    $('#weather-card').append(`<div class="card-content"><div class="media"><div class="media-left">` +
                              `<figure class="image is-48x48"><img src="${weather.img}" alt="${weather.imgDesc}"></figure></div>` +
                              `<div class="media-content"><p class="title is-4">${weather.city}</p>` +
                              `<p class="subtitle is-6">${weather.currentConditions}</p></div></div>` +
                              `<div class="content"><p>Temp: ${weather.temp} &#730F</p>` +
                              `<p>High: ${weather.tempHigh} &#730F</p>` +
                              `<p>Low: ${weather.tempLow} &#730F</p>` +
                              `<p>Humidity: ${weather.humidity}%</p>` +
                              `<p>Winds: ${weather.windSpeed}mph ${weather.windDirection}</p></div></div>`);

}