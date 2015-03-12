'use strict';

angular.module('pollingAppApp')
  .controller('PollCtr', function ($scope, $rootScope, $location, PollsService, $routeParams) {
    // get parameter from url
    $scope.id = $routeParams.id;

    // get ip address
    var ipPromise = PollsService.getIP();

    // handle ip address defer
    ipPromise.then(function(data){
        $scope.ip = data;
        $scope.ip  = $scope.ip.replace(/\./g,' ');
        }, function(error){
            console.error(error);
    });

    // get poll from firebase based on url parameter
    var promise = PollsService.getPoll($scope.id);

    // handle retreival of poll data
    promise.then(function(data){
		$scope.poll = data;
		}, function(error){
			console.error(error);
	});

    // holds selected radio option value
    $scope.selectedOption = '';

    /**
      * Handle vote button click. Validate duplicate vote submission by checking ip address.
      * Updates vote count. Updates total votes count. Pushes ip address to firebase
      * Redirects to results page.
      *
    */
    $scope.vote = function() {
        // null check
        if ($scope.selectedOption) {
            // duplicate vote check
            if (!$scope.poll[$scope.ip]) {
                // update votes by 1
            	var votes = $scope.poll.options[$scope.selectedOption].votes + 1;
                // update total votes by 1
                var totalVotes = $scope.poll.totalVotes + 1;

                // update total votes in firebase
                PollsService.updateTotalVotes($scope.id, totalVotes);
                // updates option vote count in firebase
            	PollsService.updateVote($scope.id, parseInt($scope.selectedOption), votes);
                // push ip address to firebase
                PollsService.setIp($scope.id, $scope.ip);
                // set duplicate warning message to null so it's not shown
                $rootScope.alreadyVotedMsg = null;
            }
            else {
                // show duplicate vote submission message
                $rootScope.alreadyVotedMsg = "A vote from this IP address has already been submitted. ";
            }
            // redirect to results page
        	$location.url(/results/ + $scope.id);
        }
    }

    // get random poll from firebase
    var randomPollPromise = PollsService.getRandomPoll();

    // handle random poll defer
    randomPollPromise.then(function(data){
        $rootScope.randomPoll = data;
        }, function(error){
            console.error(error);
    });

  });
