'use strict';

angular.module('pollingAppApp')
  .controller('PollCtr', function ($scope, $rootScope, $location, PollsService, $routeParams) {
    $scope.id = $routeParams.id;

    var ipPromise = PollsService.getIP();


    ipPromise.then(function(data){
        $scope.ip = data;
        $scope.ip  = $scope.ip.replace(/\./g,' ');
        }, function(error){
            console.error(error);
    });

    var promise = PollsService.getPoll($scope.id);

    promise.then(function(data){
		$scope.poll = data;
		}, function(error){
			console.error(error);
	});

    $scope.selectedOption = '';

    $scope.vote = function() {
        if ($scope.selectedOption) {
            if (!$scope.poll[$scope.ip]) {
            	var votes = $scope.poll.options[$scope.selectedOption].votes + 1;
                var totalVotes = $scope.poll.totalVotes + 1;

                PollsService.updateTotalVotes($scope.id, totalVotes);
            	PollsService.updateVote($scope.id, parseInt($scope.selectedOption), votes);
                PollsService.setIp($scope.id, $scope.ip);
                $rootScope.alreadyVotedMsg = null;
            }
            else {
                $rootScope.alreadyVotedMsg = "A vote from this IP address has already been submitted. ";
            }

        	$location.url(/results/ + $scope.id);
        }
    }

    var randomPollPromise = PollsService.getRandomPoll();


    randomPollPromise.then(function(data){
        $rootScope.randomPoll = data;
        }, function(error){
            console.error(error);
    });

  });
