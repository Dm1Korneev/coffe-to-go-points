(function() {
  angular.module("coffeeToGoApp").directive("googleMap", googleMap);

  function googleMap() {
    return {
      restrict: "EA",
      templateUrl: "/common/directives/googleMap/googleMap.template.html",
      scope: {
        lat: "=lat",
        lng: "=lng"
      },
      link: function($scope, $window) {
        setTimeout(function() {
          if (
            typeof google == "undefined" ||
            typeof google.maps == "undefined"
          ) {
            var url =
              "https://maps.googleapis.com/maps/api/js?key=AIzaSyD8jAP1An3B9naEh175om0LINck1Sog31E";
            var script = document.createElement("script");
            script.setAttribute("src", url);
            script.setAttribute("id", "google-map-api");
            script.setAttribute("type", "text/javascript");
            document.body.appendChild(script);
          }

          function initMap() {
            new google.maps.Map(document.getElementById("map"), {
              center: {
                lat: $scope.lat,
                lng: $scope.lng
              },
              zoom: 13
            });
          }

          setTimeout(function() {
            initMap();
          }, 100);
        }, 100);
      }
    };
  }
})();
