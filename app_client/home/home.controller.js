(function() {
  angular.module("coffeToGoApp").controller("homeCtrl", homeCtrl);

  homeCtrl.$inject = ["$scope", "coffeToGoData", "geolocation"];
  function homeCtrl($scope, coffeToGoData, geolocation) {
    var vm = this;
    vm.pageHeader = {
      title: "Coffe to Go",
      strapline: "Point whith cofee near you!"
    };
    vm.sidebar = {
      first:
        "Starcups is on Coffe To Go because it has accessible wifi and space to sit down with your laptop and get some work done.",
      second:
        "If you've been and you like it - or if you don't - please leave a review to help other people just like you."
    };

    vm.message = "Checking your location";

    vm.getData = function(position) {
      vm.message = "Serching for nearby places";

      coffeToGoData
        .locationsByCoords(position.coords.longitude, position.coords.latitude)
        .then(
          function(result) {
            vm.message = result.data.length ? "" : "No locations found";
            vm.data = {
              locations: result.data
            };
          },
          function(err) {
            vm.message = "Sorry something's gone wrong";
          }
        );
    };

    vm.showError = function(error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

    vm.noGeo = function() {
      $scope.$apply(function() {
        vm.message = "Geolocation not supported by this browser";
      });
    };

    geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);
  }
})();
