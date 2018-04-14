const app = function(){

  const countries = [
    { lat: 54, lng: -2 },
    { lat: 46.227638, lng: 2.213749 },
    { lat: 40.463667, lng: -3.749220 },
    { lat: 51.165691, lng: 10.451526 },
    { lat: 41.871940, lng: 12.567380 },
    { lat: 51.919438, lng: 19.145136 }
  ];

  // initial map setup - refactor this into a function then call it within app
  const initialCenter = { lat: 25, lng: 0 }
  const container = document.getElementById('main-map');
  const mainMap = new MapWrapper(container, initialCenter, 1);
  //mainMap.addMarker(initialCenter);

  const setHomeMarker = function(){
    const homeLat = parseFloat((document.getElementById('home-lat').value));
    const homeLng = parseFloat((document.getElementById('home-lng').value));
    const homeCoords = { lat: homeLat, lng: homeLng }
    mainMap.addMarker(homeCoords);
  }

  const addMarkerToAll = function(){
    for (let country of countries) {
      mainMap.addMarker(country);
    }
  }

  // add an info window to each country that will show info pulled from the json

  // add marker to map at the coordinates entered for home - refactor this into a function
  const homeButton = document.getElementById('set-home-button');
  homeButton.addEventListener('click', setHomeMarker);

  // add a pie chart that shows a breakdown of countries per continent

  // add a pie chart that show a breakdown of continents visited by user



}

window.addEventListener('load', app);
