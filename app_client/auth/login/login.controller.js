(function() {
  angular.module("coffeeToGoApp").controller("loginCtrl", loginCtrl);

  loginCtrl.$inject = ["$location", "authentication"];
  function loginCtrl($location, authentication) {
    var vm = this;

    vm.pageHeader = "Sign in";
    vm.credentials = { email: "", password: "" };
    vm.returnPage = $location.search.page || "/";

    vm.onSubmit = function() {
      vm.formError = "";
      if (!vm.credentials.email || !vm.credentials.password) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doLogin();
      }
    };

    vm.doLogin = function() {
      vm.formError = "";
      authentication.login(vm.credentials).then(
        function(result) {
          authentication.saveToken(result.data.token);
          $location.search("page", null);
          $location.path(vm.returnPage);
        },
        function(err) {
          vm.formError = err.data.message;
        }
      );
    };
  }
})();
