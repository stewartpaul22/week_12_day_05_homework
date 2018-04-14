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
  setInitialMap(countries);
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
  const initialCenter = { lat: 25, lng: 0 }
  const container = document.getElementById('main-map');
  const mainMap = new MapWrapper(container, initialCenter, 1);
  addMarkerToAll(countries, mainMap);
}

var getCoords = function(country) {
  var lat = country["latlng"][0];
  var lng = country["latlng"][1];
  var coords = { lat: lat, lng: lng };
  return coords;
}

const addMarkerToAll = function(countries, mainMap){
  // let lat = 0;
  // let lng = 0;
  // let coords = {};
  for (let country of countries) {
    let coords = getCoords(country);
    // lat = country.latLng[0];
    // lng = country.latLng[1];
    // coords = { lat: lat, lng: lng };
    mainMap.addMarker(coords);
  }
}

// --- app -----------------------

const app = function(){
  var url = 'https://restcountries.eu/rest/v2';
  makeRequest(url, requestComplete);

  const setHomeMarker = function(){
    const homeLat = parseFloat((document.getElementById('home-lat').value));
    const homeLng = parseFloat((document.getElementById('home-lng').value));
    const homeCoords = { lat: homeLat, lng: homeLng }
    mainMap.addMarker(homeCoords);
  }

  // add an info window to each country that will show info pulled from the json

  // add marker to map at the coordinates entered for home - refactor this into a function
  const homeButton = document.getElementById('set-home-button');
  homeButton.addEventListener('click', setHomeMarker);

  // add a pie chart that shows a breakdown of countries per continent

  // add a pie chart that show a breakdown of continents visited by user
}

window.addEventListener('load', app);
