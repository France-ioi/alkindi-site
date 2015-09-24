var myApp = angular.module('alkindi', []);

myApp.controller('PageCtrl', function(){
   this.pages = [
      {name: 'pageMain', content:"pageMain.html"},
      {name: 'pageDiscover', content:"pageDiscover.html"},
      {name: 'pageManual', content:"pageManual.html"},
      {name: 'pageWhoAreWe', content:"pageWhoAreWe.html"}
      ];
   });
