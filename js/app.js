
//IIFE Immidiatel Invoked function expression
(function(){


angular.module('githubViewer', ['ngRoute'])

.config(['$routeProvider',function ($routeProvider) {
	
	$routeProvider
		.when('/main',{
			templateUrl: 'main.html',
			controller: 'MainController'
		})
		.when('/user/:username', {
			templateUrl: 'user.html',
			controller: 'UserController'
		})
		.when('/repo/:username/:reponame', {
			templateUrl: 'repo.html',
			controller: 'RepoController'
		})
		.otherwise({ redirectTo: '/main' });
}]);



}());