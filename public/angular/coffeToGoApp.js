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

function locationListCtrl($scope, coffeToGoData) {
  $scope.message = "Searching for place near You";
  coffeToGoData.then(
    function(result) {
      $scope.message = result.data.length > 0 ? "" : "No locations found";
      $scope.data = {
        locations: result.data
      };
    },
    function(err) {
      $scope.message = "Sorry something's gone wrong";
    }
  );
}

function coffeToGoData($http) {
  return $http.get("/api/locations?lng=55.725&lat=37.573&maxDistance=2000");
}

angular
  .module("coffeToGoApp")
  .controller("locationListCtrl", locationListCtrl)
  .filter("formatDistance", formatDistance)
  .directive("ratingStars", ratingStars)
  .service("coffeToGoData", coffeToGoData);
