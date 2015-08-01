(function(){
  var myBase = new Firebase('https://prox-chat.firebaseio.com');
  var myUsers = new Firebase('https://prox-chat.firebaseio.com/users');
  var myChat = new Firebase('https://prox-chat.firebaseio.com/chat');
  var myEvents = new Firebase("https://prox-chat.firebaseio.com/events");

  var app = angular.module('prox', ["ngMap","ui.calendar", "ui.date", "firebase"]);

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
          // debugger
          getPosition()
        }
       }, {
        remember: "sessionOnly"
      });
    };

    function fail(){
      console.log('shit')
    };

    function addMarker(position){
      var location = myBase.getAuth().password.email.split('@', 1)[0];
      var user = {};
      user[location] =
        {
          email: myBase.getAuth().password.email,
          lat: position.coords.latitude + '',
          lng: position.coords.longitude + ''
        }
      myUsers.set(user);
    };

    function getPosition(){
      navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position)
      addMarker(position)
      },fail, { enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0 });
    };

  });

  app.controller('ShowLogged', function($scope, $firebaseArray){

    var dbMarkers = $firebaseArray(myUsers);
    $scope.markers = dbMarkers;

    $scope.requireLogged = function(){
      if(myBase.getAuth()){
        return true
      } else {
        return false
      }
    };

    $scope.initChat = function(){
      var chat = new FirechatUI(myChat, document.getElementById('firechat-wrapper'));
      chat.setUser(myBase.getAuth().password.email.split('@', 1)[0], myBase.getAuth().password.email.split('@', 1)[0]);
    }
  });

  app.controller('CalenderController', function($scope, $firebaseArray){
    var events = $firebaseArray(myEvents);
    $scope.events = events;

    var defaultEvent = {
              title: "",
              start: ""
    };

    $scope.requireLogged = function(){
      if(myBase.getAuth()){
        return true
      } else {
        return false
      }
    };

    $scope.addEvent = function(){
      $scope.events.$add($scope.newEvent);
      $scope.newEvent = defaultEvent;
      $scope.event = 0
      $('#calendar').fullCalendar('refetchEvents')
    };

  });

})();