
//IIFE Immidiatel Invoked function expression
(function(){


angular.module('githubViewer')

.controller('UserController', ['$scope','github','$routeParams',
 function ($scope, github, $routeParams) {

 	//$routeParams used to fetch parameters defined in url as property
	//private function
	var onUserComplete= function(data){
		$scope.user = data;

		//$http.get($scope.user.repos_url)
		github.getRepos($scope.user)
			.then(onRepos, onError);
	}


	var onRepos = function(data){
		$scope.repos = data;
	}

	var onError = function(reason){

		$scope.error = "Could not fetch the user.";
	}

	//default username to search for
	$scope.username = $routeParams.username
	$scope.repoSortOrder = "-stargazers_count";

	github.getUser($scope.username).then(onUserComplete,onError)

}]);



}());