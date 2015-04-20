
//IIFE Immidiatel Invoked function expression
(function(){


angular.module('githubViewer')
.controller('MainController', ['$scope','$interval','$location',
 function ($scope, $interval,$location) {
	
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

	//then will only return response on success
	//to handle error pass second parameter, angular
	//$http.get("https://api.github.com/users/" + username)
		if(countdownInterval){
			$interval.cancel(countdownInterval);
			$scope.countdown = null;
		}

		//
		$location.path('/user/' + username);
	}


	//default username to search for
	$scope.username = "angular";
	$scope.countdown=5;
	startCountdown();


}]);



}());