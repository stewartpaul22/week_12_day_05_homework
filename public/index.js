const app = function(){

  // initial map setup - refactor this into a function then call it within app
  const initialCenter = { lat: 55.856806, lng: -4.244106 }
  const container = document.getElementById('main-map');
  const mainMap = new MapWrapper(container, initialCenter, 19);
  mainMap.addMarker(initialCenter);

  // add marker to map at the coordinates entered for home - refactor this into a function
  const homeButton = document.getElementById('set-home-button');
  homeButton.addEventListener('click', setHomeMarker);
  const setHomeMarker = function(){
  }


}

window.addEventListener('load', app);
