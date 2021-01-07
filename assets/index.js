var apiKey= "f60be35f3eda0b69e1466b12ddac604e";
var cityName= `London`;


/* onclick function - when you click the .searchBtn, 
runs openWeather and fiveDayForecast API calls */
$(".searchBtn").on("click", function(event){
    event.preventDefault()

    // sets search variable = to input value.
    var search=$(".input").val().trim();
    cityName = search;
    
    
    openWeatherAPI();
    fiveDayForecast();
});



// defines the openWeatherAPI function
function openWeatherAPI() {
    var currentWeatherURL= `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;


// AJAX call to OpenWeatherMap API
$.ajax({
    url: currentWeatherURL,
    method: "GET"
  })

  .then(function(response) {

    // Log the currentWeatherURL
    console.log(currentWeatherURL);

    // Log the resulting object
    console.log(response);
  });

  // Temperature
var temperature= $("<p>").addClass("temp").text(cityName+"Temperature: "+cityName.main.temp+"F");
$(".currentWeather").append(temperature)
};


// defines the fiveDayForecast function
function fiveDayForecast() {
    var futureWeatherURL= `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;

$.ajax({
    url: futureWeatherURL,
    method: "GET"
      })
    
      .then(function(response) {
    
        // Log the futureWeatherURL
        console.log(futureWeatherURL);
    
        // Log the resulting object
        console.log(response);
      });  
    };







