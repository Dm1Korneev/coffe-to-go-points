(function() {
  angular.module("coffeeToGoApp").directive("googleMap", googleMap);

  function googleMap() {
    return {
      restrict: "EA",
      templateUrl: "/common/directives/googleMap/googleMap.template.html",
      link: function(scope, attributes) {
        var url =
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyD8jAP1An3B9naEh175om0LINck1Sog31E";
        var script = document.createElement("script");
        script.setAttribute("src", url);
        script.setAttribute("type", "text/javascript");
        document.getElementById("map-script").appendChild(script);

        console.log(scope);
        console.log(attributes);

        function initMap() {
          new google.maps.Map(document.getElementById("map"), {
            center: {
              lat: scope.location.coords[0],
              lng: scope.location.coords[1]
            },
            zoom: 13
          });
        }

        setTimeout(function() {
          initMap();
        }, 1000);
      }
    };
  }
})();
