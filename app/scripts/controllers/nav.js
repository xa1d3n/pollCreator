'use strict';

angular.module('pollingAppApp')
  .controller('NavCtrl', function ($scope, PollsService) {
    //$scope.id = $routeParams.id;

    var promise = PollsService.getRandomPoll();

    promise.then(function(data){
		$scope.randomPoll = data;
		}, function(error){
			console.error(error);
	});

  });
