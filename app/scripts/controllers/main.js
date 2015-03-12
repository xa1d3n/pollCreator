'use strict';

angular.module('pollingAppApp')
  .controller('MainCtrl', function ($scope, $rootScope, $location, PollsService) {

  	var promise = PollsService.getPolls();//get polls list from firebase

    // handle defer
    promise.then(function(data){
        $scope.polls = data;
        // get random poll
        $rootScope.randomPoll = data[Math.floor(Math.random()* data.length)].$id;
        }, function(error){
            console.error(error);
    });

    /**
      * Handle add new poll button click and redirect to new page
      *
    */
    $scope.addPoll = function() {
  		$location.url('/new');
  	}

    /**
      * Handle opening of polls listed in polls table and redirect to poll voting page.
      *
      * @param {String} id    firebase id of poll.
    */
  	$scope.openPoll = function(id) {
  		$location.url('/poll/' + id);
  	}
  });
