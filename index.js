(function(){
  var myBase = new Firebase('https://prox-chat.firebaseio.com');

  var app = angular.module('prox', []);

  app.controller('LoginController', function($http, $scope){

    $scope.create = function(e){
      myBase.createUser({
        email    : $scope.user.userName,
        password : $scope.user.passWord
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          $scope.personForm2.$setPristine();
          $scope.user = defaultForm;
          $scope.personForm2.$destroy;
          angular.element(personForm2).remove();
          console.log("Successfully created user account with uid:", userData.uid);
        }
      });
    };

    var defaultForm = {
              userName: "",
              passWord: ""
    };

    function loggedIn(authData){
      alert("Hello " + authData.password.email)
    };

    $scope.login = function(){
      myBase.authWithPassword({
        email    : $scope.user.userName,
        password : $scope.user.passWord
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          $scope.personForm1.$setPristine();
          $scope.user = defaultForm;
          $scope.personForm1.$destroy;
          angular.element(personForm1).remove();
          console.log("Authenticated successfully with payload:", authData);
        }
       }, {
        remember: "sessionOnly"
      });
    };
  });


})();