/*global Firebase*/
(function(angular) {
	'use strict';

	angular.module('pollingAppApp').service('PollsService', function(POLLSURL, $q, $firebaseArray, $http) {
		var pollsRef = new Firebase(POLLSURL); // firebase polls app reference

		var fireContacts = $firebaseArray(pollsRef); // convert to array

		return {
			/**
			 * Adds a new poll to firebase.
			 *
			 * @param {Object} poll    json object containing vote data
			 */
			addPoll: function(poll) {
				return fireContacts.$add(poll);
			},

			/**
			 * Retreives user ip address. Used to prevent duplicate vote submissions
			 */
			getIP: function() {
				var deferred = $q.defer();

				$http.get('http://ipinfo.io/json')
				        .success(function (data) {
				        	 deferred.resolve(data.ip);
				});
				return deferred.promise;
			},

			/**
			 * Retrive all polls from firebase
			 */
			 getPolls: function() {
				return  fireContacts.$loaded(  
  					function(data) {
  						return data;
  				});
			 },

			 /**
			  * Retrieve single poll data by id
			  * 
			  * @param {String} id    id of poll      
			  */
			 getPoll: function(id) {
			 	return  fireContacts.$loaded(  
  					function(data) {
  						return data.$getRecord(id);
  				});
			 },

			 /**
			  * Retrieve random poll from firebase.
			  * 
			  * @return {Object} randomPoll    returns random poll from firebase    
			  */
			  getRandomPoll: function() {
				return  fireContacts.$loaded(  
  					function(data) {
  						var randomPoll = data[Math.floor(Math.random() * data.length)].$id;
  						return randomPoll;
  				});
			  },

			 /**
			  * Updates vote data in firebase
			  * 
			  * @param {String} id    id of poll  
			  * @param {int} index    index of option
			  * @param {String} votes    votes to be updated     
			  */
			 updateVote: function(id, index, votes) {
			 	//fireContacts.$ref().child(id).totalVotes.update
			 	return fireContacts.$ref().child(id).child("options").child(index).update({votes: votes})
			 },

			 /**
			  * Associates user ip address with poll to prevent duplicate votes
			  * 
			  * @param {String} id    id of poll   
			  * @param {String} ip    user ip address      
			  */
			 setIp: function(id, ip) {
			 	var jsonObj = {};
			 	jsonObj[ip] = true;
			 	return fireContacts.$ref().child(id).update(jsonObj) 
			 },

			 /**
			  * Updates total vote count of all poll options.
			  * 
			  * @param {id}       id    id of poll   
			  * @param {votes} votes    total votes count  
			  */
			 updateTotalVotes: function(id, votes) {
			 	return fireContacts.$ref().child(id).update({ totalVotes: votes});
			 }
		}
	});

})(window.angular);