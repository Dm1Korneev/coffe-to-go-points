(function() {
  angular
    .module("coffeeToGoApp")
    .controller("reviewModalCtrl", reviewModalCtrl);

  reviewModalCtrl.$inject = [
    "$uibModalInstance",
    "locationData",
    "coffeeToGoData"
  ];
  function reviewModalCtrl($uibModalInstance, locationData, coffeeToGoData) {
    var vm = this;
    vm.LocationName = locationData.locationName;

    vm.modal = {
      cancel: function() {
        $uibModalInstance.dismiss("cancel");
      },

      close: function(result) {
        $uibModalInstance.close(result);
      }
    };

    vm.onSubmit = function() {
      vm.formError = "";
      if (!vm.formData || !vm.formData.rating || !vm.formData.reviewText) {
        vm.formError = "All fields required, please try again";
      } else {
        coffeeToGoData
          .addReviewById(locationData.locationId, {
            reviewText: vm.formData.reviewText,
            rating: vm.formData.rating
          })
          .then(
            function(result) {
              vm.modal.close(result.data);
            },
            function(err) {
              vm.formError = "Sorry something's gone wrong";
            }
          );
        return false;
      }
      return false;
    };

    var url = "/javascripts/validation.js";
    var script = document.createElement("script");
    script.setAttribute("src", url);
    script.setAttribute("type", "text/javascript");
    document.body.appendChild(script);
  }
})();
