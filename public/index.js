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
  getDestination(countries);
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

const getDestination = function(countries){
  const selectedCountry = document.getElementById('country-select');
  selectedCountry.addEventListener('change', function(){
    let country = countries[this.value];
    saveDestinationLocation(country);
  })
}

const saveDestinationLocation = function(country){
  const jsonString = JSON.stringify(country);
  localStorage.setItem('destinationLocation', jsonString);
  // const coords = getCoords(country);
  // mainMap.addMarker(coords);
}

// const setInitialMap = function(countries){
//   const initialCenter = { lat: 48.33, lng: 17.5 }
//   const container = document.getElementById('main-map');
//   const mainMap = new MapWrapper(container, initialCenter, 4);
//   setHomeMarker(mainMap);
// }

const getCoords = function(country) {
  const lat = country["latlng"][0];
  const lng = country["latlng"][1];
  const coords = { lat: lat, lng: lng };
  return coords;
}

const addMarkerToAll = function(countries, mainMap){
  const countries = getCountries();
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
  saveHomeLocation(homeCoords);
}

const setDestinationMarker = function(mainMap, destination){

  const destLat = destination.latlng[0];
  const destLng = destination.latlng[1];
  const destinationCoords = { lat: destLat, lng: destLng }
  mainMap.addMarker(destinationCoords);
}

const saveHomeLocation = function(coords){
  const jsonString = JSON.stringify(coords);
  localStorage.setItem('homeLocation', jsonString);
}

const saveDestination = function(mainMap){
  // if user selects country from the dropdown, pull the lat lng coords from there, otherwise get them from the input boxes.

  // get desination from local storage
  let jsonString = localStorage.getItem('destinationLocation');
  let savedDestination = JSON.parse(jsonString);


  // const selectedCountry = document.getElementById('country-select');
  // selectedCountry.addEventListener('change', function(){
  //
  // })

  // add marker to destination

  // save destination to local storage

  updateDistanceTable();

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

  // when user clicks 'Save Destination' a div should show the distance between home location and destination.
  const saveDestinationButton = document.getElementById('save-destination');
  saveDestinationButton.addEventListener('click', function(){
    let jsonString = localStorage.getItem('destinationLocation');
    let savedDestination = JSON.parse(jsonString);
    setDestinationMarker(mainMap, savedDestination);
  })


  // add an info window to each country that will show info pulled from the json

  // add a pie chart that shows a breakdown of countries per continent

  // add a pie chart that show a breakdown of continents visited by user


  const allCountriesButton = document.getElementById('show-all-button');
  allCountriesButton.addEventListener('click', function(){
    addMarkerToAll(mainMap)
  });
}

window.addEventListener('load', app);
