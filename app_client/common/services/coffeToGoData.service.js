(function() {
  angular.module("coffeToGoApp").service("coffeToGoData", coffeToGoData);

  coffeToGoData.$inject = ["$http"];
  function coffeToGoData($http) {
    locationsByCoords = function(lng, lat) {
      return $http.get(
        "/api/locations?lng=" + lng + "&lat=" + lat + "&maxDistance=2000"
      );
    };
    return { locationsByCoords: locationsByCoords };
  }
})();
