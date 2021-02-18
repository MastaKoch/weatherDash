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
    
   
    
  // AJAX call to oneCallAPI URL
  $.ajax({
    url: oneCallURL, 
    method: "GET"
  })
  .then(function(response) {
    var iconCode=response.daily[0].weather[0].icon;
    var iconURL= `https://openweathermap.org/img/wn/${iconCode}@2x.png`
 

    var uvIndex= $("<p>").addClass("uv").text("UV index: "+response.current.uvi);
    $(".currentWeather").append(uvIndex);
    
    var icon= $("<img>").attr("src", iconURL).addClass("icon");
    $(".currentWeather").append(icon);


for (var i=1; i < 6; i ++) {

    var dailyTemp= response.daily[i].temp.day;
    var fiveDayTemp= $("<p>").addClass("fiveDayTemp").attr("id", i).text("Temperature: "+ dailyTemp +" degrees Fahrenheit")
    $("#cardDeck").append(fiveDayTemp);

    var dailyHumid= response.daily[i].humidity;
    var fiveDayHumid= $("<p>").addClass("fiveDayHumid").attr("id", i).text("Humidity: "+ dailyHumid + " %")
    $("#cardDeck").append(fiveDayHumid);

    var dailyIcon= response.daily[i].weather[0].icon;
    var fiveDayIconURL= `http://openweathermap.org/img/w/${dailyIcon}.png`
    var fiveDayIcon= $("<img>").addClass("icon").attr("src", fiveDayIconURL);
    $("#cardDeck").append(fiveDayIcon);

};



  })};





// defines the openWeatherAPI function
function openWeatherAPI(cityNam) {
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