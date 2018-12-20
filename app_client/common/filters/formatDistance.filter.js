(function() {
  angular.module("coffeToGoApp").filter("formatDistance", formatDistance);

  function formatDistance() {
    return function(distance) {
      if (distance > 1000) {
        distance = "" + (distance / 1000).toFixed(1) + " km";
      } else {
        distance = "" + distance.toFixed(0) + " m";
      }
      return distance;
    };
  }
})();
