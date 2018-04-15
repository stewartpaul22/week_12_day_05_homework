const makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

const requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  populateSelect(countries);
  //setInitialMap(countries);
}

const populateSelect = function(countries){
  const select = document.getElementById('country-select');
  countries.forEach(function(country, index){
    let option = document.createElement('option');
    option.innerText = country.name;
    option.value = index;
    select.appendChild(option);
  })
}

const setInitialMap = function(countries){
  const initialCenter = { lat: 48.33, lng: 17.5 }
  const container = document.getElementById('main-map');
  const mainMap = new MapWrapper(container, initialCenter, 4);
  setHomeMarker(mainMap);
}

const getCoords = function(country) {
  const lat = country["latlng"][0];
  const lng = country["latlng"][1];
  const coords = { lat: lat, lng: lng };
  return coords;
}

const addMarkerToAll = function(countries, mainMap){
  for (let country of countries) {
    let coords = getCoords(country);
    mainMap.addMarker(coords);
  }
}

const setHomeMarker = function(mainMap){
  const homeLat = parseFloat((document.getElementById('home-lat').value));
  const homeLng = parseFloat((document.getElementById('home-lng').value));
  const homeCoords = { lat: homeLat, lng: homeLng }
  if(homeLat === NaN || homeLng === NaN) return;
  mainMap.addMarker(homeCoords);
}

// --- app -----------------------

const app = function(){
  var url = 'https://restcountries.eu/rest/v2';
  makeRequest(url, requestComplete);

  const initialCenter = { lat: 48.33, lng: 17.5 }
  const container = document.getElementById('main-map');
  const mainMap = new MapWrapper(container, initialCenter, 4);

  const homeButton = document.getElementById('set-home-button');
  homeButton.addEventListener('click', function(){
    setHomeMarker(mainMap)
  });

  // Show all countries should add markers to all countries where info windows can be accessed for further detail
  const allCountriesButton = document.getElementById('show-all-button');
  allCountriesButton.addEventListener('click', function(){
    addMarkerToAll(mainMap)
  });

  // add an info window to each country that will show info pulled from the json

  // add a pie chart that shows a breakdown of countries per continent

  // add a pie chart that show a breakdown of continents visited by user
}

window.addEventListener('load', app);
