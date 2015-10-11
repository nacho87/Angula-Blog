(function(){
	'use strict';

	angular.module('blog.services', ['ngResource']);

	function Post ($resource, BaseUrl){
		return $resource(BaseUrl + '/posts/:postId', {postId: '@_id'},{
			get: {
				cache: true, // This caches the response to the request
				method: 'GET'
			}
		});
	}

	function Comment ($resource, BaseUrl){
		return $resource(BaseUrl + '/comments/:commentId', {commentId: '@_id'},{
			get: {
				cache: false, // This caches the response to the request
				method: 'GET'
			}
		});
	}

	function User ($resource, BaseUrl) {
		return $resource(BaseUrl + '/users/:userId', { userId: '@_id'});
	}

	angular
		.module('blog.services')
		.constant('BaseUrl', 'http://jsonplaceholder.typicode.com')
		.factory('Post', Post)
		.factory('Comment', Comment)
		.factory('User', User);
})();
