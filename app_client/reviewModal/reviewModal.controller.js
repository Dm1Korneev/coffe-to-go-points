(function() {
  angular
    .module("coffeeToGoApp")
    .controller("reviewModalCtrl", reviewModalCtrl);

  reviewModalCtrl.$inject = ["$uibModalInstance"];
  function reviewModalCtrl($uibModalInstance) {
    var vm = this;

    vm.modal = {
      cancel: function() {
        $uibModalInstance.dismiss("cancel");
      }
    };

    var url = "/javascripts/validation.js";
    var script = document.createElement("script");
    script.setAttribute("src", url);
    script.setAttribute("type", "text/javascript");
    document.body.appendChild(script);
  }
})();
