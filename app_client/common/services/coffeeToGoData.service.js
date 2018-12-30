(function() {
  angular.module("coffeeToGoApp").service("coffeeToGoData", coffeeToGoData);

  coffeeToGoData.$inject = ["$http", "authentication"];
  function coffeeToGoData($http, authentication) {
    locationsByCoords = function(lng, lat) {
      return $http.get(
        "/api/locations?lng=" + lng + "&lat=" + lat + "&maxDistance=2000"
      );
    };

    locationById = function(locationId) {
      return $http.get("/api/locations/" + locationId);
    };

    addReviewById = function(locationId, data) {
      return $http.post("/api/locations/" + locationId + "/reviews", data, {
        headers: {
          Authorization: "Bearer " + authentication.getToken()
        }
      });
    };

    return {
      locationsByCoords: locationsByCoords,
      locationById: locationById,
      addReviewById: addReviewById
    };
  }
})();
