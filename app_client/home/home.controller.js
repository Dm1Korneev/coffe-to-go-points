(function() {
  angular.module("coffeToGoApp").controller("homeCtrl", homeCtrl);

  homeCtrl.$inject = ["$scope", "coffeToGoData", "geolocation"];
  function homeCtrl($scope, coffeToGoData, geolocation) {
    var vm = this;
    vm.pageHeader = {
      title: "Coffe to Go",
      strapline: "Point whith cofee near you!"
    };
    vm.sidebar =
      "Looking for coffe to Go? We helps you to find some one. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem beatae magni ducimus temporibus quis, illo deserunt nisi nesciunt impedit reprehenderit fugiat vel sed repellendus tenetur accusamus voluptate, totam corrupti esse distinctio ab rerum quod doloremque officiis. Ullam dolorum alias animi odio nisi amet distinctio, ipsa eveniet beatae quaerat corporis ex.";

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
