(function() {
  angular.module("coffeToGoApp").controller("detailsCtrl", detailsCtrl);

  detailsCtrl.$inject = ["$routeParams"];
  function detailsCtrl($routeParams) {
    var vm = this;
    vm.title = $routeParams.locationId;
    vm.location = $routeParams.locationId;

    vm.sidebar = {
      first:
        "Starcups is on Coffe To Go because it has accessible wifi and space to sit down with your laptop and get some work done.",
      second:
        "If you've been and you like it - or if you don't - please leave a review to help other people just like you."
    };
  }
})();
