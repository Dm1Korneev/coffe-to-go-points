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

function locationListCtrl($scope) {
  $scope.data = {
    locations: [
      {
        name: "Location 1",
        address: "Pushkinskaya 1",
        rating: 4,
        facilities: ["fac 1", "fac 2"],
        distance: 100,
        _id: "sfsfsdfg"
      },
      {
        name: "Location 2",
        address: "Pushkinskaya 2",
        rating: 3,
        facilities: ["fac 3", "fac 4"],
        distance: 800,
        _id: "hjhjhjhj"
      }
    ]
  };
}

angular
  .module("coffeToGoApp")
  .controller("locationListCtrl", locationListCtrl)
  .filter("formatDistance", formatDistance)
  .directive("ratingStars", ratingStars);
