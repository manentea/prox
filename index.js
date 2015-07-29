(function(){
  var myBase = new Firebase('https://prox-chat.firebaseio.com');

  var app = angular.module('prox', []);

  app.controller('LoginController', function($http, $scope){
    tab = 1;

    $scope.create = function(e){
      myBase.createUser({
        email    : $scope.userName,
        password : $scope.passWord
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
        }
      });
    };

    $scope.login = function(e){
      myBase.authWithPassword({
        email    : $scope.userName,
        password : $scope.passWord
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
       }, {
        remember: "sessionOnly"
      });
    };
  });


})();