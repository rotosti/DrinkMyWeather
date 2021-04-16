# DrinkMyWeather
An app which recommends adult beverages based on weather.

Authors: JJ Espinoza, Jason Carrazco, Tom Siemion
Project: Drink My Weather
LINK: https://rotosti.github.io/DrinkMyWeather/

The application is designed to take in a US based zip code, provide weather information and provide adult beverage recommendations based on the current weather conditions.

The application uses jQuery, Bulma CSS Framework, OpenWeather API, and CocktailDB API.  The UI was designed and written with Bulma by Jason.  The original design followed a wireframe that was designed by the group.  The logic and JavaScript program flow was design by JJ and Tom.  

The application works by collecting a user entered US based ZIP.  Once the user hits submit, the application will gather weather data for that location using the OpenWeather API.  The weather information is stored in a weather object where information can be easily accessed by other portions of the logic. The weather will then immediately trigger data collection for the adult beverage recommendations.  

Once the logic has decided what 'type' of adult beverages to recommend, it will gather information from the CocktailDB API.  Using different API calls gathering information into a adult beverage object array for 3 different recommendations.  

Once the data is collected, the information will be displayed to the user on the web app.  The web app will display the weather conditions and 3 adult beverage recommendations with images, names, ingredients, and instructions on how to make the beverage.

![](./Assets/DWM-Screen.png)