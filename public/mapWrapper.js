const MapWrapper = function(container, coords, zoom){

  this.googleMap = new google.maps.Map(container, {
    center: coords,//{lat: 55.862241, lng: -4.019337},
    zoom: zoom
  });

}
