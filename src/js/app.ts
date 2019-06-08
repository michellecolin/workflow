/*angular.module('helloWorldApp', [
  'ngRoute'
])
.config([
  '$routeProvider',
  function($routeProvider) {
      $routeProvider
          .when('/', {
              templateUrl: 'views/home.html',
              controller: 'HomeCtrl'
          });
  }
]);*/
/*

var module = angular.module("mySuperAwhelloWorldAppesomeApp", [ 'ngRoute']).config([
  '$routeProvider',
  function($routeProvider) {
      $routeProvider
          .when('/', {
              templateUrl: 'views/home.html',
              controller: 'HomeCtrl'
          });
  }
]);

console.log('sdkkaosdsd');

angular.element(document).ready(function() {
  console.log('kdflkdfldsf');
  angular.bootstrap(document, ["mySuperAwesomeApp"]);
});*/


var module = angular.module("mySuperAwesomeApp", []);

module.component("heros", {
  template: "My heros:",
  controller: function herosController() {
    console.log('lalalalal');
  },
  controllerAs: "$ctrl"
});

angular.element(document).ready(function() {
  angular.bootstrap(document, ["mySuperAwesomeApp"]);
});