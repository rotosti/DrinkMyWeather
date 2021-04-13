fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=bourbon')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })

