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
  populatePieChart(countries);
  getDestination(countries);
}

const populatePieChart = function(countries){
  // add a pie chart that shows a breakdown of countries per continent
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawCountriesChart);
  function drawCountriesChart() {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Continent');
    data.addColumn('number', 'Countries');
    data.addRows([
      ['Europe', 46],
      ['Asia', 48],
      ['Africa', 54],
      ['North America', 4],
      ['Central America', 23],
      ['South America', 13],
      ['Oceania', 14],
      ['Antartica', 1]
    ]);

    var options = {title:'Countries per continent',
    width:400,
    height:300};

    var chart = new google.visualization.PieChart(document.getElementById('main-chart'));
    chart.draw(data, options);
  }
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

// const addMarkerToAll = function(countries, mainMap){
//   const countries = getCountries();
//   for (let country of countries) {
//     let coords = getCoords(country);
//     mainMap.addMarker(coords);
//   }
// }

const setHomeMarker = function(mainMap){
  const homeLat = parseFloat((document.getElementById('home-lat').value));
  const homeLng = parseFloat((document.getElementById('home-lng').value));
  const homeCoords = { lat: homeLat, lng: homeLng }
  if(homeLat === NaN || homeLng === NaN) return;
  if(homeLat === null || homeLng === null) return;
  mainMap.addMarker(homeCoords);
  saveHomeLocation(homeCoords);
}

const setDestinationMarker = function(mainMap, destination){
  const destLat = destination.latlng[0];
  const destLng = destination.latlng[1];
  const destinationCoords = { lat: destLat, lng: destLng }
  mainMap.addMarker(destinationCoords);
  getDistance(destinationCoords, mainMap, destination);
}

const getDistance = function(destinationCoords, mainMap, destination){
  const homeCoords = getHomeLocation();
  const distance = Math.round(mainMap.calculateDistance(homeCoords, destinationCoords)/1000);
  displayDistance(distance, destination);
}

const displayDistance = function(distance, destination){
  const destDiv = document.getElementById('destination-info');
  const distanceLabel = document.createElement('p');
  distanceLabel.classList.add('distanceOutput');
  distanceLabel.innerText = `It's ${distance}km from your house to ${destination['name']}, as the crow flies.`;
  destDiv.appendChild(distanceLabel);
}

const saveHomeLocation = function(coords){
  const jsonString = JSON.stringify(coords);
  localStorage.setItem('homeLocation', jsonString);
}

const getHomeLocation = function(){
  let jsonString = localStorage.getItem('homeLocation');
  let homeLocation = JSON.parse(jsonString);
  return homeLocation;
}

// const saveDestination = function(mainMap){
//   // get desination from local storage
//   let jsonString = localStorage.getItem('destinationLocation');
//   let savedDestination = JSON.parse(jsonString);
//
//   // add marker to destination
//
//   // save destination to local storage
//
//   updateDistanceTable();
//
// }

// --- app -----------------------

const app = function(){
  var url = 'https://restcountries.eu/rest/v2';
  makeRequest(url, requestComplete);

  const initialCenter = { lat: 48.33, lng: 10.5 }
  const container = document.getElementById('main-map');
  const mainMap = new MapWrapper(container, initialCenter, 4);

  // console.log(mainMap.calculateDistance({ lat: 55.865005, lng: -4.036945}, { lat: 55.866111, lng: -4.043887}));

  const homeButton = document.getElementById('set-home-button');
  homeButton.addEventListener('click', function(){
    setHomeMarker(mainMap)
  });

  const saveDestinationButton = document.getElementById('save-destination');
  saveDestinationButton.addEventListener('click', function(){
    let jsonString = localStorage.getItem('destinationLocation');
    let savedDestination = JSON.parse(jsonString);
    setDestinationMarker(mainMap, savedDestination);
  })

  const allCountriesButton = document.getElementById('show-all-button');
  allCountriesButton.addEventListener('click', function(){
    addMarkerToAll(mainMap)
  });
}

window.addEventListener('load', app);
