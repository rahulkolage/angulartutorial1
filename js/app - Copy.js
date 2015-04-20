
//IIFE Immidiatel Invoked function expression
(function(){


angular.module('githubViewer', [])

.controller('MainController', ['$scope','$http','$interval','$log','$anchorScroll','$location',
 function ($scope, $http, $interval, $log, $anchorScroll,$location) {

	//private function
	var onUserComplete= function(response){
		$scope.user = response.data;

		$http.get($scope.user.repos_url)
			.then(onRepos, onError);
	}


	var onRepos = function(response){
		$scope.repos = response.data;
		$location.hash("userDetails");
		$anchorScroll();
	}

	var onError = function(reason){

		$scope.error = "Could not fetch the user.";
	}

	var decrementCountdown = function(){
		$scope.countdown -= 1;
		if($scope.countdown <1){
			$scope.search($scope.username);
		}
	}

	var countdownInterval = null;

	var startCountdown=function(){

		countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
	}

	$scope.search= function(username){

	$log.info("Searching for " + username);

	//then will only return response on success
	//to handle error pass second parameter, angular
	$http.get("https://api.github.com/users/" + username)
		.then(onUserComplete, onError);

		if(countdownInterval){
			$interval.cancel(countdownInterval);
			$scope.countdown = null;
		}
	}


	/*var person ={
		firstName:"Scott",
		lastName:"Allen",
		imageSrc:"http://odetocode.com/Image/scott_allen_2.jpg"
	};*/

	//$scope.person = person;

	//default username to search for
	$scope.username = "angular";
	$scope.message = "Github Viewer";
	$scope.repoSortOrder = "-stargazers_count";
	$scope.countdown=5;
	startCountdown();


}]);



}());