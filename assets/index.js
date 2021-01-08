const apiKey= "f60be35f3eda0b69e1466b12ddac604e";
var cityName= `London`;
var lat= "51.5085";
var long= "-0.1257";




/* onclick function - when you click the .searchBtn, 
runs openWeather, fiveDayForecast, and oneCall API calls */
$(".searchBtn").on("click", function(event){
    event.preventDefault()

    // sets search variable = to input value.
    var search=$(".input").val().trim();
    cityName = search;
    
   
    
    openWeatherAPI(cityName);
});



// defines the oneCallAPI function
function oneCallAPI(latitude, longitude) {
    var oneCallURL= `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
    // const iconURL= "https://openweathermap.org/img/wn/XXX@2x.png"
    // var iconUrl1= iconURL.replace("XXX", iconCode);
    
  // AJAX call to oneCallAPI URL
  $.ajax({
    url: oneCallURL, 
    method: "GET"
  })
  .then(function(response) {
    console.log('oneCallAPI', latitude, longitude);
    console.log(response);

    var uvIndex= $("<p>").addClass("uv").text("UV index: "+response.current.uvi);
    $(".currentWeather").append(uvIndex);
    // var iconCode=response.daily.icon;
    // var icon= $(`<img href=${iconUrl1}>`).addClass("icon");
    // $(".currentWeather").append(icon);
  });
  
  };



// defines the openWeatherAPI function
function openWeatherAPI(cityNam) {
  console.log('openWeatherAPI', cityNam);
    let currentWeatherURL= `https://api.openweathermap.org/data/2.5/weather?q=${cityNam}&units=imperial&appid=${apiKey}`;

   


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

var name= $("<p>").addClass("name").text(response.name);
$(".currentWeather").append(name);
var temperature= $("<p>").addClass("temp").text("Temperature: "+response.main.temp+"F");
$(".currentWeather").append(temperature);

var humidity= $("<p>").addClass("humidity").text("Humidity: "+response.main.humidity+"%");
$(".currentWeather").append(humidity);

var windSpeed= $("<p>").addClass("wind").text("Wind Speed: "+response.wind.speed);
$(".currentWeather").append(windSpeed);





oneCallAPI(lat, long);
  
});

};











