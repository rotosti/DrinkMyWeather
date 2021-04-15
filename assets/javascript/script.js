// Tom code - country code for search
var countryCode = 'US'
// weather API key
var weatherApiKey = 'a6bf4e0e3ad10827dd4efb76de3ab5e4';
// search field and submit button
var zipSearchTxt = $('#zipSearchInputField')
var searchBtn = $('#zipSearchBtn');
// weather data object
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

var displayDrinks = [];

// function which generates the weather data from the API
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

var drinks = [{
        drinkID:'',
        drinkName:'',
        drinkImg:'',
        drinkIngredients:[],
        drinkMeasurements:[],
        drinkInstruction:''
        }, {
        drinkID:'',
        drinkName:'',
        drinkImg:'',
        drinkIngredients:[],
        drinkMeasurements:[],
        drinkInstruction:''
        }, {
        drinkID:'',
        drinkName:'',
        drinkImg:'',
        drinkIngredients:[],
        drinkMeasurements:[],
        drinkInstruction:''
        }]


function getDrinkData() {

    var drinkApiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007';

    fetch(drinkApiUrl)
        .then(function(serverResponse) {
            return serverResponse.json();
        })
        .then(function(drinkData) {
            console.log(drinkData);

            drink.drinkID = drinkData.drinks[0].idDrink;
            drink.drinkName = drinkData.drinks[0].strDrink;
            drink.drinkImg = drinkData.drinks[0].strImageSource;
            drink.drinkInstruction = drinkData.drinks[0].strInstructions;

            const INGREDIENT_STRING = 'strIngredient';
            const MEASURE_STRING = 'strMeasure'
            
            for (var i = 1; i <= 15; i++) {
                var ingTemp = INGREDIENT_STRING;
                var measTemp = MEASURE_STRING;
                ingTemp+=i;
                measTemp+=i;
                if (drinkData.drinks[0][ingTemp] !== null) {
                    drink.drinkIngredients.push(drinkData.drinks[0][ingTemp]);
                }
                if (drinkData.drinks[0][measTemp] !== null) {
                    drink.drinkMeasurements.push(drinkData.drinks[0][measTemp])
                }
            }

            if (drink.drinkIngredients.length != drink.drinkMeasurements.length) {
                var difference = drink.drinkIngredients.length - drink.drinkMeasurements.length;
                for (var j = 0; j < difference; j++) {
                    drink.drinkMeasurements.push('');
                }
            }

            console.log(drink);
        })
}

// start jj code
// function getNeat(){
//     var neat = ['Siembra Valles 92 proof Blanco Tequila','NY Distilling Ragtime Rye',
//     'Del Maguey Mezcal','Hakushu 18-Year Whiskey','Christian Drouin Calvados','Santa Teresa 1796 Solera Rum', 'Jeppson Malört'];


//     return neat[Math.floor(Math.random() * neat.length)]; 

//     console.log(getRandomNeat())
//     var neatURL = []

// }
function getProhb() {
var proURL = ['https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=bourbon', 
'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=whiskey'];

    var urlIndex = Math.floor(Math.random()* proURL.length); 
    console.log(proURL[urlIndex])
    getRandomDrink(proURL[urlIndex]);
}

function getClear() { 
var clearURL = ['https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=gin',
'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vodka'];

    var urlIndex = Math.floor(Math.random()* clearURL.length); 
    console.log(clearURL[urlIndex])
    getRandomDrink(clearURL[urlIndex]);
    
} 

   
function getOrale() {
var oraleURL = ['https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=tequila',
'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=rum'];

    var urlIndex = Math.floor(Math.random()* oraleURL.length); 
    console.log(oraleURL[urlIndex])
    getRandomDrink(oraleURL[urlIndex]);



if (weather.temp <= 32 {
     drinkData.push()
 } else if (weather.temp <= 68){

 } else if (weather.temp < 100 ) {

 } else {

}
