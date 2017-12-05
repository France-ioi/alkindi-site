var myApp = angular.module('alkindi', ['ngRoute']);

myApp.config(function($routeProvider) {
   $routeProvider

   // route for the main page
   .when('/', {
      templateUrl : 'pageMain.html?v=25',
      controller  : 'PageCtrl'
   })

   // route for the dicovery page
   .when('/pageDiscover', {
      templateUrl : 'pageDiscover.html?v=25',
      controller  : 'PageCtrl'
   })

   // route for the manual page
   .when('/pageManual', {
      templateUrl : 'pageManual.html?v=25',
      controller  : 'PageCtrl'
   })

   // route for the coordinator page
   .when('/pageCoordinateur', {
      templateUrl : 'http://coordinateur.concours-alkindi.fr',
      controller  : 'PageCtrl'
   })

   // route for the previous page
   .when('/pagePrevious', {
      templateUrl : 'pagePrevious.html?v=25',
      controller  : 'PageCtrl'
   })
   // route for the who are we page
   .when('/pageWhoAreWe', {
      templateUrl : 'pageWhoAreWe.html?v=25',
      controller  : 'PageCtrl'
   })

   // route for the coordinators / teachers page
   .when('/enseignants', {
      templateUrl : 'enseignants.html?v=25',
      controller  : 'PageCtrl'
   })

   // route for the register page
   .when('/pageInfosLegales', {
      templateUrl : 'pageInfosLegales.html?v=25',
      controller  : 'PageCtrl'
   })

   // route for the BD page
   .when('/pageBD', {
      templateUrl : 'pageBD.html?v=25',
      controller  : 'PageCtrl'
   })

   // route for the Visits page
   .when('/pageVisits', {
      templateUrl : 'pageVisits.html?v=25',
      controller  : 'PageCtrl'
   })

   // route for the instruction page
   .when('/infosTour2', {
      templateUrl : 'infos/instructionsTour2.html?v=25',
      controller  : 'PageCtrl'
   })

   // route for the instruction page
   .when('/infosTour3', {
      templateUrl : 'infos/instructionsTour3.html?v=25',
      controller  : 'PageCtrl'
   })

   // route for the correction page
   .when('/correctionsTour1', {
      templateUrl : 'infos/correctionsTour1.html?v=25',
      controller  : 'PageCtrl'
   })

   .otherwise({
      redirectTo: '/'
   });
});

myApp.controller('PageCtrl', function() {
    $("#monActu").load("actu.html?v=25");
});

myApp.controller('activeMenuItem', function($scope, $location){
   $scope.isActive = function (viewLocation) {
     return viewLocation === $location.path();
   };
});

myApp.controller('VideoDisplay', function($scope, $sce) {
   $scope.displayPlayer = false;
   $scope.loadVideo = function (item) {
      $scope.videoUrl = $sce.trustAsResourceUrl(item.currentTarget.getAttribute('data-source'));
      $scope.displayPlayer = true;
   };

});