angular.module("coffeToGoApp", []);

function formatDistance() {
  return function(distance) {
    if (distance > 1000) {
      distance = "" + (distance / 1000).toFixed(1) + " km";
    } else {
      distance = "" + distance.toFixed(0) + " m";
    }
    return distance;
  };
}

function ratingStars() {
  return {
    scope: {
      thisRating: "=rating"
    },
    templateUrl: "/angular/rating-stars.html"
  };
}

function locationListCtrl($scope, coffeToGoData, geolocation) {
  $scope.message = "Checking your location";

  $scope.getData = function(position) {
    $scope.message = "Serching for nearby places";

    coffeToGoData
      .locationsByCoords(position.coords.longitude, position.coords.latitude)
      .then(
        function(result) {
          $scope.message = result.data.length ? "" : "No locations found";
          $scope.data = {
            locations: result.data
          };
        },
        function(err) {
          $scope.message = "Sorry something's gone wrong";
        }
      );
  };

  $scope.showError = function(error) {
    $scope.aaply(function() {
      $scope.message = error.message;
    });
  };

  $scope.noGeo = function() {
    $scope.aaply(function() {
      $scope.message = "Geolocation not supported by this browser";
    });
  };

  geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
}

function coffeToGoData($http) {
  locationsByCoords = function(lng, lat) {
    return $http.get(
      "/api/locations?lng=" + lng + "&lat=" + lat + "&maxDistance=20000"
    );
  };
  return { locationsByCoords: locationsByCoords };
}

function geolocation() {
  getPosition = function(cbSuccess, cbError, cbNoGeo) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
    } else {
      cbNoGeo();
    }
  };
  return { getPosition: getPosition };
}

angular
  .module("coffeToGoApp")
  .controller("locationListCtrl", locationListCtrl)
  .filter("formatDistance", formatDistance)
  .directive("ratingStars", ratingStars)
  .service("coffeToGoData", coffeToGoData)
  .service("geolocation", geolocation);
