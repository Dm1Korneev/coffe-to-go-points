(function() {
  angular.module("coffeToGoApp", ["ngRoute", "ngSanitize"]);

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "home/home.view.html",
        controller: "homeCtrl",
        controllerAs: "vm"
      })
      .when("/about", {
        templateUrl: "common/views/genericText.view.html",
        controller: "aboutCtrl",
        controllerAs: "vm"
      })
      .when("/location/:locationId", {
        templateUrl: "details/details.view.html",
        controller: "detailsCtrl",
        controllerAs: "vm"
      })
      .otherwise({
        redirectTo: "/"
      });

    $locationProvider.html5Mode(true);
  }

  angular
    .module("coffeToGoApp")
    .config(["$routeProvider", "$locationProvider", config]);
})();
