(function(){
'use strict';
	//Here the funcionality

	angular.module('blog',['ngRoute', 'blog.controllers', 'blog.templates']);

	function config($locationProvider, $routeProvider){
		$locationProvider.html5Mode(true);

		$routeProvider
			.when('/', {
				templateUrl: 'views/post-list.tpl.html',
				controller: 'PostListController',
				controllerAs: 'postlist'
			})
			.when('/post/:postId', {
				templateUrl: 'views/post-details.tpl.html',
				controller: 'PostDetailController',
				controllerAs: 'postdetail'
			})
			.when('/new', {
				templateUrl: 'views/post-create.tpl.html',
				controller: 'PostCreateController',
				controllerAs: 'postcreate'
			})
			.when('/user/:userId', {
				templateUrl: 'views/user-details.tpl.html',
				controller: 'UserDetailsController',
				controllerAs: 'userdetail'
			});
	}

	angular
		.module('blog')
		.config(config);

})();
