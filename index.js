const Weather_URL = 'https://api.openweathermap.org/data/2.5/weather';

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: Weather_URL,
    data: {
      APPID: '8c1c662ffd829bba1fc59c13c13b7724',
      q: `${searchTerm}`,
      units: 'Imperial'
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
    error: error
  };
  $.ajax(settings);
}

function error () {
  console.log('error');  
}

function renderResult(result) {
  
  return   `
    <div class ='results'>
      <h4 class="col-1-weather">The weather in ${result.name} is currently '${result.weather[0].main}'</h4>
      <h4>The temperature is ${result.main.temp}&deg;F </h4>
      <h4>Wind speed is ${result.wind.speed} miles/hour</h4>
    </div>
  `
  ;
}

function displayWeatherData(data){
  var widget = renderResult(data);
  $('.results').html(widget);
}

function watchSubmit () {
  $('.form').on('submit', function (event){
    event.preventDefault();
    const query = $('.input').val();
    $('.input').val('');
    getDataFromApi(query, displayWeatherData);    
  });
}

watchSubmit();
