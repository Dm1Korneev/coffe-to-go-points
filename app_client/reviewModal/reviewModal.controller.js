(function() {
  angular
    .module("coffeeToGoApp")
    .controller("reviewModalCtrl", reviewModalCtrl);

  detailsCtrl.$inject = ["$modalInstance"];
  function reviewModalCtrl($modalInstance) {
    var vm = this;

    vm.modal = {
      cancel: function() {
        $modalInstance.dismiss("cancel");
      }
    };

    var url = "/javascripts/jquery-3.3.1.slim.min.js";
    var script = document.createElement("script");
    script.setAttribute("src", url);
    script.setAttribute("type", "text/javascript");
    document.body.appendChild(script);

    var url = "/javascripts/validation.js";
    var script = document.createElement("script");
    script.setAttribute("src", url);
    script.setAttribute("type", "text/javascript");
    document.body.appendChild(script);
  }
})();
