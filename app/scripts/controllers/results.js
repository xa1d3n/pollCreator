'use strict';

angular.module('pollingAppApp')
  .controller('ResultsCtrl', function ($scope, $rootScope, $location, PollsService, $routeParams) {
    // get id from url
    var id = $routeParams.id;
    // get poll results from firebase
    var promise = PollsService.getPoll(id);

    // handle poll result defer
    promise.then(function(data){
        $scope.poll = data;
        }, function(error){
            console.error(error);
    });

    // get random poll from firebase
    var randomPollPromise = PollsService.getRandomPoll();

    // handle random poll defer
    randomPollPromise.then(function(data){
        $rootScope.randomPoll = data;
        }, function(error){
            console.error(error);
    });

  });
