'use strict';

angular.module('pollingAppApp')
  .controller('NewCtrl', function ($scope, $location, PollsService, $filter) {

    // poll related data
  	$scope.poll = {
  		question: "",
  		options: [{votes: 0, name: ''}, {votes: 0, name: ''}]
  	}

    // holds optional poll data
    $scope.newOptions = [];


    /**
      * Validates poll options data.
      *
      * @param {Object} options    options related data.
      * @param {boolean} boolean    true/false.
    */
    $scope.validateOptions = function(options) {
      for (var i = 0; i < options.length; i++) {
        if (!options[i].name) {
          return false;
        }
      }
      return true;
    }

    /**
      * Handle creatino of new poll. Validate all data, add a timestamp  and initiate total votes to 0.
      * Redirect to main page if sucessful. 
    */
  	$scope.create = function() {
      // validatino.
  		if ($scope.poll.question && $scope.validateOptions($scope.poll.options) && $scope.validateOptions($scope.newOptions)) {
        // merge optinal poll options.
        $scope.poll.options = $scope.poll.options.concat($scope.newOptions)
        // get current date
        var date = new Date();
        // format date/time
        $scope.poll.timestamp = $filter('date')(date, "MM/dd/yyyy @ h:mma", "EDT");
        // set total votes
        $scope.poll.totalVotes = 0;
        // push poll to firebase
  			PollsService.addPoll($scope.poll);
        // redirect to main page
  			$location.url('/');
  		}
  	}

    /**
      * Handle adding of optinal poll options.
    */
    $scope.addOption = function() {
      $scope.newOptions.push({ votes: 0, name: '' });
    }

    /**
      * Handle deletion of optional data. Removes the object from array
      * @param {int} index   index of option.
    */
    $scope.removeOption = function(index) {
      $scope.newOptions.splice(index, 1);
    }

  });
