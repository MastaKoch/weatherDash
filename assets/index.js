const apiKey= "f60be35f3eda0b69e1466b12ddac604e";
var cityName= `London`;
var lat= "51.5085";
var long= "-0.1257";
var oneCall= oneCallAPI(lat, long);



/* onclick function - when you click the .searchBtn, 
runs openWeather, fiveDayForecast, and oneCall API calls */
$(".searchBtn").on("click", function(event){
    event.preventDefault()

    // sets search variable = to input value.
    var search=$(".input").val().trim();
    cityName = search;
    
   
    
    openWeatherAPI(cityName);
    fiveDayForecast(cityName);
    setTimeout(oneCall, 3000);
});




// defines the oneCallAPI function
function oneCallAPI(latitude, longitude) {
  console.log('oneCallAPI', latitude, longitude);
  var oneCallURL= `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=hourly,daily&appid=${apiKey}`;

  
// AJAX call to oneCallAPI URL
$.ajax({
  url: oneCallURL, 
  method: "GET"
})
.then(function(response) {

  console.log(response.current.uvi);
});

};


// defines the openWeatherAPI function
function openWeatherAPI(cityNam) {
  console.log('openWeatherAPI', cityNam);
    var currentWeatherURL= `https://api.openweathermap.org/data/2.5/weather?q=${cityNam}&units=imperial&appid=${apiKey}`;


// AJAX call to OpenWeatherMap API
$.ajax({
    url: currentWeatherURL, 
    method: "GET"
  })

  .then(function(response) {
    console.log(response);

    var lat = response?.coord?.lat;
    var long = response?.coord?.lon;
  

//   Current Temperature
var temperature= $("<p>").addClass("temp").text(cityName+"Temperature: "+response.main.temp+"F");
$(".currentWeather").append(temperature)

var humidity= $("<p>").addClass("humidity").text("Humidity: "+response.main.humidity);
$(".currentWeather").append(humidity)

var windSpeed= $("<p>").addClass("wind").text("Wind Speed: "+response.wind.speed);
$(".currentWeather").append(windSpeed)

  });
};


// defines the fiveDayForecast function
function fiveDayForecast(cityNam) {
  console.log('fiveDayForecast', cityNam);
    var futureWeatherURL= `https://api.openweathermap.org/data/2.5/forecast?q=${cityNam}&units=imperial&appid=${apiKey}`;

$.ajax({
    url: futureWeatherURL,
    method: "GET"
      })
    
      .then(function(response) {
    
        // Log the resulting object
        console.log(response);
      });  
    };







