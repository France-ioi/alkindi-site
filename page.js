var myApp = angular.module('alkindi', ['ngRoute']);

myApp.config(function($routeProvider) {
   $routeProvider

   // route for the main page
   .when('/', {
      templateUrl : 'pageMain.html?v=18',
      controller  : 'PageCtrl'
   })

   // route for the dicovery page
   .when('/pageDiscover', {
      templateUrl : 'pageDiscover.html?v=18',
      controller  : 'PageCtrl'
   })

   // route for the manual page
   .when('/pageManual', {
      templateUrl : 'pageManual.html?v=18',
      controller  : 'PageCtrl'
   })

   // route for the coordinator page
   .when('/pageCoordinateur', {
      templateUrl : 'http://coordinateur.concours-alkindi.fr',
      controller  : 'PageCtrl'
   })
    
   // route for the previous page
   .when('/pagePrevious', {
      templateUrl : 'pagePrevious.html?v=18',
      controller  : 'PageCtrl'
   })
   // route for the who are we page
   .when('/pageWhoAreWe', {
      templateUrl : 'pageWhoAreWe.html?v=18',
      controller  : 'PageCtrl'
   })

   // route for the register page
   .when('/pageInfosLegales', {
      templateUrl : 'pageInfosLegales.html?v=18',
      controller  : 'PageCtrl'
   })
   
   // route for the BD page
   .when('/pageBD', {
      templateUrl : 'pageBD.html?v=18',
      controller  : 'PageCtrl'
   })

   // route for the Visits page
   .when('/pageVisits', {
      templateUrl : 'pageVisits.html?v=18',
      controller  : 'PageCtrl'
   });
});

myApp.controller('PageCtrl', function() {
    $("#monActu").load("actu.html?v=18"); 
   });
