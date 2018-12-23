(function() {
  angular.module("coffeeToGoApp").service("geolocation", geolocation);

  function geolocation() {
    getPosition = function(cbSuccess, cbError, cbNoGeo) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
      } else {
        cbNoGeo();
      }
    };
    return { getPosition: getPosition };
  }
})();
