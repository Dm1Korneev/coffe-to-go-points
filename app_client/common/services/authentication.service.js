(function() {
  angular.module("coffeeToGoApp").service("authentication", authentication);

  authentication.$inject = ["$http", "$window"];
  function authentication($http, $window) {
    saveToken = function(token) {
      $window.localStorage["coffee-to-go-token"] = token;
    };

    getToken = function() {
      return $window.localStorage["coffee-to-go-token"];
    };

    logout = function() {
      return $window.localStorage.removeItem("coffee-to-go-token");
    };

    register = function(user) {
      return $http.post("/api/register", user);
    };

    login = function(user) {
      return $http.post("/api/login", user);
    };

    isLoggedIn = function() {
      var token = getToken();
      if (token) {
        var payload = JSON.parse($window.atob(token.split(".")[1]));
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    currentUser = function() {
      if (isLoggedIn()) {
        var token = getToken();
        var payload = JSON.parse($window.atob(token.split(".")[1]));

        return {
          name: payload.name,
          email: payload.email
        };
      }
    };

    return {
      saveToken: saveToken,
      getToken: getToken,
      register: register,
      login: login,
      logout: logout,
      isLoggedIn: isLoggedIn,
      currentUser: currentUser
    };
  }
})();
