const MapWrapper = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });

  MapWrapper.prototype.addMarker = function (coords) {
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP
    });
  };

  MapWrapper.prototype.calculateDistance = function (fromCoords, toCoords) {
    const fromNew = new google.maps.LatLng(fromCoords["lat"], fromCoords["lng"]);
    const toNew = new google.maps.LatLng(toCoords["lat"], toCoords["lng"]);
    const distance = google.maps.geometry.spherical.computeDistanceBetween(fromNew, toNew);
    return distance;
  };

}
