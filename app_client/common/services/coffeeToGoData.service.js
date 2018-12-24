(function() {
  angular.module("coffeeToGoApp").service("coffeeToGoData", coffeeToGoData);

  coffeeToGoData.$inject = ["$http"];
  function coffeeToGoData($http) {
    locationsByCoords = function(lng, lat) {
      return $http.get(
        "/api/locations?lng=" + lng + "&lat=" + lat + "&maxDistance=2000"
      );
    };

    locationById = function(locationId) {
      return $http.get("/api/locations/" + locationId);
    };

    return {
      locationsByCoords: locationsByCoords,
      locationById: locationById
    };
  }
})();