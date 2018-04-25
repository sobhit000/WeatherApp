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

function error () {
  $('.results').css('background-color', '#330000')
  $('.results').html(`<h2>There seems to be an error. Please try again!</h2>`);
  $('.title').html('');
  $('.youtubeButton').hide();
  $('.results-youtube').hide();
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
  $('.results').css('background-color', '#330000');
  $('.results').prop('hidden', false);
  return   `
    <div class ='results'>
      <h3 class="col-1-weather">The weather in ${result.name} is currently '${result.weather[0].main}'</h3>
      <h3>The temperature is ${result.main.temp}&deg;F </h3>
      <h3>Wind speed is ${result.wind.speed} miles/hour</h3>
    </div>
  `
  ;
}

function displayWeatherData(data){
  var widget = renderResult(data);
  $('.results').html(widget);
}

function clickToYoutube(query)  {
  $('.youtubeButton').show();
  $('.results-youtube').hide();
  $('.youtubeButton').html(`Click To See Some ${query} Vidoes`);
  $('.youtubeButton').on('click', function (event){
    event.preventDefault();
    getDataFromApiYouTube(query, displayYouTubeData);
    $('.title').html(`<h2>Some Vidoes Related To ${query}</h1>`);
    $('.results-youtube').show();
    $('.youtubeButton').hide();
    $('.title').prop('hidden', false);
  });
}

function watchSubmit () {
  $('.form').on('submit', function (event){
    event.preventDefault();
    const query = $('.input').val();
    $('.input').val('');
    getDataFromApi(query, displayWeatherData);
    getDataFromApiYouTube(query, displayYouTubeData);
    clickToYoutube(query);
    $('.title').prop('hidden', true);
  });
}
watchSubmit();