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
    // zipcode from the search form
    var zipCode = zipSearchTxt.val();
    var weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${weatherApiKey}`;

    // checks to see if the zip code is not a number
    if (isNaN(parseInt(zipCode))) {
        // invalid zip
        zipSearchTxt.val('');
        return;
    }
    // fetch request to gather weather data
    fetch(weatherApiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            // filling weather object with information from weather api
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
            // sets search field to empty string once processing is compeleted
            zipSearchTxt.val('');
            // calls to get the weather card to be updated
            updateCityWeatherCard();
            startDrinkGathering();
            // handling a zipcode that is not working
        }).catch(function() {
            console.log("city does not exist");
            zipSearchTxt.val('');
            return;
        });
        

}
// event listener for the search form
searchBtn.on('click', getWeatherData);
// converts response temps to fahrenheit
function convertKelvin(temp) {
    return Math.floor((temp - 273.15) * (9/5) + 32);
}
// convers response speeds in to MPH
function convertKPHtoMPH(kph) {
    return Math.floor(kph/1.609344);
}
// converts compass degrees into a direction for display to the user
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
// builds the weather card based on the information in the weather object and to specifications of the designer
function updateCityWeatherCard() {
    // clears any previous weather cards
    $('#weather-card').empty();
    // card appends with data
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
// variable to store randomly picked drink id's from a list
var drinkIDSelections = [];
// drinks data object
var ourDrinkData = [{
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

// pulls random drinks from a specific category
function getRandomDrink(link) {
    // url for fetch request to api
    var a = link;
    // fetch request
    fetch(a)
    .then(function(sR) {
        return sR.json();
    })
    .then(function(dd) {
        // random pick of drinks in the list returned back from the api (3 because 3 recommendations)
        for (var o = 0; o < 3; o++){
            // gets an index based on the total list of the response
            var index = Math.floor(Math.random() * dd.drinks.length);
            // checks to see if the drink id has already been added, if not, reiterates that iteration
            if (drinkIDSelections.includes(dd.drinks[index].idDrink)) {
                o--;
            // adds to the drink id storage array
            } else {
                drinkIDSelections.push(dd.drinks[index].idDrink)
            }
        }
        // calls drink info gathering function
        getDrinkData();
    })
}

function getDrinkData() {

    for (let d = 0; d < 3; d++) {

        var drinkApiUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkIDSelections[d]}`;

        fetch(drinkApiUrl)
        .then(function(serverResponse) {
            return serverResponse.json();
        })
        .then(function(drinkData) {
            var index = d;

            ourDrinkData[index].drinkID = drinkData.drinks[0].idDrink;
            ourDrinkData[index].drinkName = drinkData.drinks[0].strDrink;
            ourDrinkData[index].drinkImg = drinkData.drinks[0].strDrinkThumb;
            ourDrinkData[index].drinkInstruction = drinkData.drinks[0].strInstructions;

            const INGREDIENT_STRING = 'strIngredient';
            const MEASURE_STRING = 'strMeasure'
            
            for (var i = 1; i <= 15; i++) {
                var ingTemp = INGREDIENT_STRING;
                var measTemp = MEASURE_STRING;
                ingTemp+=i;
                measTemp+=i;
                if (drinkData.drinks[0][ingTemp] !== null) {
                    ourDrinkData[index].drinkIngredients.push(drinkData.drinks[0][ingTemp]);
                }
                if (drinkData.drinks[0][measTemp] !== null) {
                    ourDrinkData[index].drinkMeasurements.push(drinkData.drinks[0][measTemp])
                }
            }

            if (ourDrinkData[index].drinkIngredients.length != ourDrinkData[index].drinkMeasurements.length) {
                var difference = ourDrinkData[index].drinkIngredients.length - ourDrinkData[index].drinkMeasurements.length;
                for (var j = 0; j < difference; j++) {
                    ourDrinkData[index].drinkMeasurements.push('');
                }
            }

            console.log(ourDrinkData);
        })
        
    }
}

function startDrinkGathering() {
    
    if (weather.temp <= 32) {
        console.log("i'm below 32")
        getProhb();
    } else if (weather.temp <= 68){
        console.log("i'm below 68")
        getClear();
    } else if (weather.temp < 100 ) {
        console.log("i'm above 100")
        getOrale();
    } 
}


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
}