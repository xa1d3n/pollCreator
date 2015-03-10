'use strict';

angular.module('pollingAppApp')
  .controller('ResultsCtrl', function ($scope, $rootScope, $location, PollsService, $routeParams) {
    var id = $routeParams.id;
    var promise = PollsService.getPoll(id);

    promise.then(function(data){
        $scope.poll = data;
        }, function(error){
            console.error(error);
    });

    var randomPollPromise = PollsService.getRandomPoll();


    randomPollPromise.then(function(data){
        $rootScope.randomPoll = data;
        }, function(error){
            console.error(error);
    });

  });
