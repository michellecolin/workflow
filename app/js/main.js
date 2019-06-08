(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
angular.element(document).ready(function () {
    angular.bootstrap(document, ["mySuperAwesomeApp"]);
});

/*angular.module('helloWorldApp')
.controller('HomeCtrl', [
    '$scope',
    function($scope) {
        console.log('Loaded.');
        $scope.message = 'Hello World Test';
    }
]);*/
/*

module.component("heros", {
    template: "My heros:",
    controller: function herosController() {
        console.log('Loaded.');
    },
    controllerAs: "$ctrl"
});
  */ 

},{}]},{},[1])