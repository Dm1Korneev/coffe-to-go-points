(function() {
  angular.module("coffeToGoApp", ["ngRoute"]);

  function config($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "home/home.view.html",
        controller: "homeCtrl",
        controllerAs: "vm"
      })
      .otherwise({
        redirectTo: "/"
      });
  }

  angular.module("coffeToGoApp").config(["$routeProvider", config]);
})();
