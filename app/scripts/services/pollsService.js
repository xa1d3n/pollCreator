/*global Firebase*/
(function(angular) {
	'use strict';

	angular.module('pollingAppApp').service('PollsService', function(POLLSURL, $q, $firebaseArray, $http) {
		var pollsRef = new Firebase(POLLSURL); // get messages tag

		var fireContacts = $firebaseArray(pollsRef);

		return {
			/*
			 * Add a new poll to firebase
			*/
			addPoll: function(poll) {
				//fbRef.child('users').child(user.uid).child('contacts').set(contact);
				//return pollsRef.push(poll);
				return fireContacts.$add(poll);
			},

			getIP: function() {
				var deferred = $q.defer();

				$http.get('http://ipinfo.io/json')
				        .success(function (data) {
				        	 deferred.resolve(data.ip);
				});
				return deferred.promise;
			},

			/*
			 * Retrive all polls from firebase
			 */

			 getPolls: function() {
				//return fireContacts;polls
				return  fireContacts.$loaded(  
  					function(data) {
  						return data;
  				});
			 },

			 /*
			  * Retrieve single poll data by id
			  */
			 getPoll: function(id) {
			 	return  fireContacts.$loaded(  
  					function(data) {
  						return data.$getRecord(id);
  				});

			 	//return fireContacts.$getRecord(id);
			 	//return deffered.promise;
			 },

			 /*
			  *
			  */
			  getRandomPoll: function() {
				return  fireContacts.$loaded(  
  					function(data) {
  						var randomPoll = data[Math.floor(Math.random() * data.length)].$id;
  						return randomPoll;
  				});
			  },

			 /*
			  * Updates votes of current poll option
			  */
			 updateVote: function(id, index, votes) {
			 	//fireContacts.$ref().child(id).totalVotes.update
			 	return fireContacts.$ref().child(id).child("options").child(index).update({votes: votes})
			 },

			 setIp: function(id, ip) {
			 	var jsonObj = {};
			 	jsonObj[ip] = true;
			 	return fireContacts.$ref().child(id).update(jsonObj) 
			 },

			 updateTotalVotes: function(id, votes) {
			 	return fireContacts.$ref().child(id).update({ totalVotes: votes});
			 }
		}
	});

})(window.angular);