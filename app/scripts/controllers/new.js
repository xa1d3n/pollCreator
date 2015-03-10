'use strict';

angular.module('pollingAppApp')
  .controller('NewCtrl', function ($scope, $location, PollsService, $filter) {

  	$scope.poll = {
  		question: "",
  		options: [{votes: 0, name: ''}, {votes: 0, name: ''}]
  	}

    $scope.newOptions = [];

    $scope.validateOptions = function(options) {
      for (var i = 0; i < options.length; i++) {
        if (!options[i].name) {
          return false;
        }
      }
      return true;
    }

  	$scope.create = function() {

      /*if ($scope.validateOptions($scope.newOptions)) {
        $scope.poll.options = $scope.poll.options.concat($scope.newOptions)
      } */
      
  		if ($scope.poll.question && $scope.validateOptions($scope.poll.options) && $scope.validateOptions($scope.newOptions)) {
        $scope.poll.options = $scope.poll.options.concat($scope.newOptions)
        var date = new Date();
        $scope.poll.timestamp = $filter('date')(date, "MM/dd/yyyy @ h:mma", "EDT");
        $scope.poll.totalVotes = 0;
  			PollsService.addPoll($scope.poll);
  			$location.url('/');
  		}
  	}

  	/*$scope.addOption = function() {
  		var optionId = $scope.poll.options.length+1;
  		$scope.poll.options.push({ votes: 0, name: '' });
  	} */

    $scope.addOption = function() {
      $scope.newOptions.push({ votes: 0, name: '' });
    }

    $scope.removeOption = function(index) {
      $scope.newOptions.splice(index, 1);
    }

  });
