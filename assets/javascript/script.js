// var drinkRecommend = document.getElementById('')
var neat = ['Siembra Valles 92 proof Blanco Tequila', 'Hakushu 18-Year Whiskey', 'NY Distilling Ragtime Rye', 'Malort', 'Del Maguey Mezcal', 'calvados'];
var availableBank = [];


fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=bourbon')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })

    $("p").on("click", function(){
        alert("The paragraph was clicked.");
      }); 

    // if(50degrees ==true ){
    //     availableBank = availableBank.concat(neat)
    // }