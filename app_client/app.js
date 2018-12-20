angular.module("coffeToGoApp", ['ngRoute']);

function config($routeProvider) {
    $routeProvider.when("/", {})
    .otherwise({redirectTo: "/"})
}

angular
  .module("coffeToGoApp")
  .config(["$routeProvider", config])