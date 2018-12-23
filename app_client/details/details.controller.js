(function() {
  angular.module("coffeeToGoApp").controller("detailsCtrl", detailsCtrl);

  detailsCtrl.$inject = ["$scope", "$routeParams", "coffeeToGoData"];
  function detailsCtrl($scope, $routeParams, coffeeToGoData) {
    var vm = this;

    coffeeToGoData.locationById($routeParams.locationId).then(
      function(result) {
        vm.title = result.data.name;
        vm.location = result.data;

        vm.sidebar = {
          first:
            result.data.name +
            " is on Coffee To Go because it has accessible wifi and space to sit down with your laptop and get some work done.",
          second:
            "If you've been and you like it - or if you don't - please leave a review to help other people just like you."
        };

        // function initMap() {
        //   new google.maps.Map(document.getElementById("map"), {
        //     center: {
        //       lat: result.data.coords[1],
        //       lng: result.data.coords[0]
        //     },
        //     zoom: 13
        //   });
        // }

        // $scope.$watch("$viewContentLoaded", function() {
        //   setTimeout(function() {
        //     initMap();
        //   }, 1000);
        // });
      },
      function(err) {
        vm.message = "Sorry something's gone wrong";
      }
    );
  }
})();
