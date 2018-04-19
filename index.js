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

const YouTube_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApiYouTube (searchTermYouTube, callback) {
  const settingsYoutube = {
    url: YouTube_URL,
    data: {
      part: 'snippet',
      key: 'AIzaSyA-1wfIe9iUlcJb1O9p8K1Gg56nlGfms78',
      q: `${searchTermYouTube}`,
      type: 'video',
      maxResults: 6
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
    error: error
  };
  $.ajax(settingsYoutube);
}

function displayYouTubeData (data) {
  const results = data.items.map((item, index) => renderResultYouTube(item));
  $('.results-youtube').html(results);
}

function renderResultYouTube (result) {
  return `
      <div class= 'results-youtube'>
      <h3>${result.snippet.title}</h3>
      <ul>
      <li><a href = "https://www.youtube.com/watch?v=${result.id.videoId}"><img class="img" src="${result.snippet.thumbnails.medium.url}" alt="${result.snippet.title}"></a></li>
      </ul>
      </div>
    `
      ;
}

function renderResult(result) {
 $('.results').css('background-color', 'white'); 
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
    $('.results').prop('hidden', false);
    $('.results-youtube').prop('hidden', false);
    getDataFromApi(query, displayWeatherData);
    getDataFromApiYouTube(query, displayYouTubeData);    
  });
}

watchSubmit();
