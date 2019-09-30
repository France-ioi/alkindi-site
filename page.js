var myApp = angular.module('alkindi', ['ngRoute']);
var version = 53;
myApp.config(function($routeProvider) {
   $routeProvider

   // route for the main page
   .when('/', {
      templateUrl : 'pageMain.html?v=' + version,
      controller  : 'PageCtrl'
   })

   // route for the dicovery page
   .when('/pageDiscover', {
      templateUrl : 'pageDiscover.html?v=' + version,
      controller  : 'PageCtrl'
   })

   // route for the manual page
   .when('/pageManual', {
      templateUrl : 'pageManual.html?v=' + version,
      controller  : 'PageCtrl'
   })

   // route for the coordinator page
   .when('/pageCoordinateur', {
      templateUrl : 'http://coordinateur.concours-alkindi.fr',
      controller  : 'PageCtrl'
   })

   // route for the previous page
   .when('/pagePrevious', {
      templateUrl : 'pagePrevious.html?v=' + version,
      controller  : 'PageCtrl'
   })
   // route for the who are we page
   .when('/pageWhoAreWe', {
      templateUrl : 'pageWhoAreWe.html?v=' + version,
      controller  : 'PageCtrl'
   })

   // route for the coordinators / teachers page
   .when('/enseignants', {
      templateUrl : 'enseignants.html?v=' + version,
      controller  : 'PageCtrl'
   })

   // route for the register page
   .when('/pageInfosLegales', {
      templateUrl : 'pageInfosLegales.html?v=' + version,
      controller  : 'PageCtrl'
   })

   // route for the BD page
   .when('/pageBD', {
      templateUrl : 'pageBD.html?v=' + version,
      controller  : 'PageCtrl'
   })

   // route for the Visits page
   .when('/pageVisits', {
      templateUrl : 'pageVisits.html?v=' + version,
      controller  : 'PageCtrl'
   })

   // route for the instruction page
   .when('/infosTour2', {
      templateUrl : 'infos/instructionsTour2.html?v=' + version,
      controller  : 'PageCtrl'
   })

   // route for the instruction page
   .when('/infosTour3', {
      templateUrl : 'infos/instructionsTour3.html?v=' + version,
      controller  : 'PageCtrl'
   })

   // route for the correction page
   .when('/correctionsTour1', {
      templateUrl : 'infos/correctionsTour1.html?v=' + version,
      controller  : 'PageCtrl'
   })

   .otherwise({
      redirectTo: '/'
   });
});

myApp.controller('PageCtrl', function() {
    $("#monActu").load("actu.html?v=" + version);
});

myApp.controller('activeMenuItem', function($scope, $location){
   $scope.isActive = function (viewLocation) {
     return viewLocation === $location.path();
   };
});

myApp.controller('VideosLists', function($scope) {
   $scope.videosPresentation = [
      {
         title: 'Lancement de la 3e édition du concours Alkindi',
         source: 'https://www.youtube.com/embed/f_y6mJPvlIA',
         thumbnail: 'images/vignetteVideo_lancement.jpg'
      },
      {
         title: 'Témoignages de participants au 1er tour du concours 2017-2018',
         source: 'https://www.youtube.com/embed/ioxT4H7Kx6M',
         thumbnail: 'images/vignetteVideo_participants.jpg'
      },
      {
         title: 'Interview de Gérard Berry, parrain du concours Alkindi',
         source: 'https://www.youtube.com/embed/4i-4JlKPC6I',
         thumbnail: 'images/vignetteVideo_gerardBerry.jpg'
      },
      {
         title: 'Visite d\'un laboratoire de cryptographie par des équipes du concours',
         source: 'https://www.youtube.com/embed/EVLHEOWAORc',
         thumbnail: 'images/vignetteVideo_visites.jpg'
      },
      {
         title: 'Lê, auteur de la chaîne Youtube Science4all, a rencontré les lauréats d\'une académie',
         source: 'https://www.youtube.com/embed/CZbTjvSRZhM',
         thumbnail: 'images/vignetteVideo_science4all.jpg'
      }
   ];
   $scope.videosPreviousContests = [
      {
         title: 'Exercice "Réseau" corrigé par Matthieu Lequesne',
         source: 'https://www.youtube.com/embed/Mv415zfUFNs',
         thumbnail: 'images/Miniature-vidéo-Matthieu.JPG'
      },
      {
         title: 'Exercice "Connexions" corrigé par Anne Canteaut',
         source: 'https://www.youtube.com/embed/8ohEeTPKBwA',
         thumbnail: 'images/Miniature-vidéo-Anne-Canteaut.JPG'
      },
      {
         title: 'Exercice "Aliens" corrigé par Razvan Barbulescu',
         source: 'https://www.youtube.com/embed/8DQtOH1WwBs',
         thumbnail: 'images/Miniature-vidéo-Razvan.JPG'
      },
      {
         title: 'Exercice "Générateur" corrigé par Christina Boura',
         source: 'https://www.youtube.com/embed/Y-VQBzwEaqQ',
         thumbnail: 'images/Miniature-vidéo-Christina.JPG'
      },
      {
         title: 'Exercice "Coffre fort" corrigé par Aline Gouget',
         source: 'https://www.youtube.com/embed/qturJa6f97M',
         thumbnail: 'images/Miniature-vidéo-Aline-Gouget.JPG'
      }
   ];
   $scope.setActiveItem = function(item) {
      $scope.activeItem = item;
   }
});
myApp.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}])