angular.module('starter.controllers', ['ionic','firebase'])

  .controller('LoginCtrl',function ($scope,$state,$firebaseAuth,FBInstance) {

    var fbAuth = $firebaseAuth(FBInstance);

    $scope.login = function(email, password) {

      fbAuth.$authWithPassword({
        email: email,
        password: password
      }).then(function() {
        $state.go("todos");
      }).catch(function(error) {
        if(error.code === "INVALID_USER"){
          fbAuth.$createUser({email: email, password: password}).then(function() {
            $scope.login(email,password);
          });
        }
      });
    }



  })

  .controller('TodosCtrl',function ($scope,$state,$firebaseArray,$firebaseAuth,FBInstance) {

    $scope.todos = [];

    var fbAuth = FBInstance.getAuth();
    if(fbAuth) {
      var userReference = FBInstance.child("users/" + fbAuth.uid);
      var syncArray = $firebaseArray(userReference.child("todos"));
      $scope.todos = syncArray;
    } else {
      $state.go("login");
    }

    $scope.add = function () {
      var todo = prompt('New Todo:');
      syncArray.$add(todo);
    }

    $scope.remove = function (todo) {
      syncArray.$remove(todo)
    }

    $scope.logout = function () {
      $firebaseAuth(FBInstance).$unauth()
      $state.go('login');
    }

  });
