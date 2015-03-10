'use strict';

angular.module('pollingAppApp')
  .controller('MainCtrl', function ($scope, $rootScope, $location, PollsService) {

  	var promise = PollsService.getPolls();
    $scope.errors = [];

    promise.then(function(data){
        $scope.polls = data;
        $rootScope.randomPoll = data[Math.floor(Math.random()* data.length)].$id;
        }, function(error){
            console.error(error);
    });

    $scope.addPoll = function() {
  		$location.url('/new');
  	}

  	$scope.openPoll = function(id) {
  		$location.url('/poll/' + id);
  	}
  });
