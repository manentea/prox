(function(){
  var myBase = new Firebase('https://prox-chat.firebaseio.com');

  var app = angular.module('prox', []);

  app.controller('LoginController', function($http, $scope){

    $scope.create = function(e){
      myBase.createUser({
        email    : $scope.user.userName2,
        password : $scope.user.passWord2
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          $scope.personForm2.$setPristine();
          $scope.user = defaultForm2;
          $scope.personForm2.$destroy;
          angular.element(personForm2).remove();
          console.log("Successfully created user account with uid:", userData.uid);
        }
      });
    };

    var defaultForm1 = {
              userName1: "",
              passWord1: ""
    };

    var defaultForm2 = {
              userName2: "",
              passWord2: ""
    };
    function loggedIn(authData){
      alert("Hello " + authData.password.email)
    };

    $scope.login = function(){
      myBase.authWithPassword({
        email    : $scope.user.userName1,
        password : $scope.user.passWord1
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          $scope.personForm1.$setPristine();
          $scope.user = defaultForm1;
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