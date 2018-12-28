(function() {
  angular.module("coffeeToGoApp").controller("detailsCtrl", detailsCtrl);

  detailsCtrl.$inject = ["$routeParams", "$uibModal", "coffeeToGoData"];
  function detailsCtrl($routeParams, $uibModal, coffeeToGoData) {
    var vm = this;
    vm.locationId = $routeParams.locationId;

    coffeeToGoData.locationById($routeParams.locationId).then(
      function(result) {
        vm.title = result.data.name;
        vm.location = result.data;

        vm.sidebar = {
          first:
            result.data.name +
            " is on Coffee To Go because it has accessible wifi and space to sit down with your laptop and get some work done.",
          second:
            "If you've been and you like it - or if you don't - please leave a review to help other people just like you."
        };
      },
      function(err) {
        vm.message = "Sorry something's gone wrong";
      }
    );

    vm.popupReviewForm = function() {
      var modalInstance = $uibModal.open({
        templateUrl: "reviewModal/reviewModal.view.html",
        controller: "reviewModalCtrl",
        controllerAs: "vm",
        animation: true,
        resolve: {
          locationData: function() {
            return {
              locationId: vm.locationId,
              locationName: vm.location.name
            };
          }
        }
      });

      modalInstance.result
        .then(function(data) {
          vm.location.reviews.push(data);
        })
        .catch(function(res) {
          if (
            !(
              res === "cancel" ||
              res === "escape key press" ||
              res === "backdrop click"
            )
          ) {
            throw res;
          }
        });
    };
  }
})();
