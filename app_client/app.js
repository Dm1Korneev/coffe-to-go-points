(function() {
  angular.module("coffeeToGoApp", ["ngRoute", "ngSanitize", "ui.bootstrap"]);

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
      .when("/register", {
        templateUrl: "auth/register/register.view.html",
        controller: "registerCtrl",
        controllerAs: "vm"
      })
      .when("/login", {
        templateUrl: "auth/login/login.view.html",
        controller: "loginCtrl",
        controllerAs: "vm"
      })
      .otherwise({
        redirectTo: "/"
      });

    $locationProvider.html5Mode(true);
  }

  angular
    .module("coffeeToGoApp")
    .config(["$routeProvider", "$locationProvider", config]);
})();
