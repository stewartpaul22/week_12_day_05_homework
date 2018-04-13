const app = function(){

  const initialCenter = { lat: 55.856806, lng: -4.244106 }
  var container = document.getElementById('main-map');
  const mainMap = new MapWrapper(container, initialCenter, 19);

}

window.addEventListener('load', app);
