(function(){//IIFE

//24 ways to register service

var github = function($http)
{
	var getUser = function(username){
		return $http.get("https://api.github.com/users/" + username)
					.then(function(response){
						return response.data;
					});
	};


	var getRepos = function(user){
		return $http.get(user.repos_url)
					.then(function(response){
						return response.data;
					});
	};

	var getRepoDetails = function(username, reponame){
		var repo;
		var repoUrl = "https://api.github.com/repos/" + username + "/" + reponame;
		//https://api.github.com/repos/angular/angular
		return $http.get(repoUrl)
			.then(function(response){
				repo = response.data;
				return $http.get(repoUrl + "/contributors");
			})
			.then(function(response){
				repo.collaborators =  response.data;
				return repo;
			});
	};


	//This is revealing pattern where function
	//returns an object	
	return {
		getUser: getUser,
		getRepos: getRepos,
		getRepoDetails: getRepoDetails
	};

};

//24 ways to register and configure service with angular
angular.module('githubViewer')
.factory('github', github);


}());