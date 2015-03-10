'use strict';

angular
  .module('pollingAppApp', [
    'ngCookies',
    'firebase',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/new', {
        templateUrl: 'views/new.html',
        controller: 'NewCtrl'
      })
      .when('/poll/:id', {
        templateUrl: 'views/poll.html',
        controller: 'PollCtr'
      })
      .when('/results/:id', {
        templateUrl: 'views/results.html',
        controller: 'ResultsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('FBURL', 'https://af-pollingapp.firebaseio.com/')
  .constant('POLLSURL', 'https://af-pollingapp.firebaseio.com/polls');
