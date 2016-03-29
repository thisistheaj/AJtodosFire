angular.module('starter.services', ['ionic','firebase'])
  
  //service to hold reference to firebase instance
  .factory('FBInstance', function () {
  var fb = new Firebase("https://ajtodosfire.firebaseio.com/");
  return fb;
})
