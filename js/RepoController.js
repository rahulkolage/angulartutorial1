//IIFE Immidiatel Invoked function expression
(function(){


angular.module('githubViewer')
.controller('RepoController', ['$scope','github','$routeParams', 
	function ($scope, github, $routeParams) {
	

	var onRepo = function(data){
		$scope.repo = data;
	};

	var onError = function(reason){
		$scope.error = reason;
	};

	var reponame = $routeParams.reponame;
	var username = $routeParams.username;

	github.getRepoDetails(username, reponame)
	.then(onRepo,onError);


}]);





}());