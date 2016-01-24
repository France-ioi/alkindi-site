var myApp = angular.module('alkindi', ['ngRoute']);

myApp.config(function($routeProvider) {
   $routeProvider

   // route for the main page
   .when('/', {
      templateUrl : 'pageMain.html',
      controller  : 'PageCtrl'
   })

   // route for the dicovery page
   .when('/pageDiscover', {
      templateUrl : 'pageDiscover.html',
      controller  : 'PageCtrl'
   })

   // route for the manual page
   .when('/pageManual', {
      templateUrl : 'pageManual.html?v=5',
      controller  : 'PageCtrl'
   })

   // route for the who are we page
   .when('/pageWhoAreWe', {
      templateUrl : 'pageWhoAreWe.html',
      controller  : 'PageCtrl'
   })

   // route for the register page
   .when('/pageRegister', {
      templateUrl : 'pageRegister.html?v=5',
      controller  : 'PageCtrl'
   })
   
   // route for the BD page
   .when('/pageBD', {
      templateUrl : 'pageBD.html',
      controller  : 'PageCtrl'
   });
});

myApp.controller('PageCtrl', function() {
    $("#monActu").load("actu.html?v=5"); 
   });
