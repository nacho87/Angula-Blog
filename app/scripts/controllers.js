(function(){
	'use strict';

	angular
		.module('blog.controllers', ['blog.services'])
		.controller('PostListController', PostListController)
		.controller('PostDetailController', PostDetailController)
		.controller('PostCreateController', PostCreateController);

	function PostListController(Post){
		this.posts = Post.query();
	}

	function PostDetailController($routeParams, Post, Comment, User){
		this.post = {};
		this.comment = {};
		this.user = {};

		var self = this; // to save the ref


		Post.query({id: $routeParams.postId})
			.$promise.then(
				//sucess
				function (data){
					self.post = data[0];
					self.user = User.query({id: self.post.userId});
				},
				function (error){
					console.log('Error: ' + error);
				}
			);
		this.comments = Comment.query({postId: $routeParams.postId});
	}

	function PostCreateController(Post){
		var self = this;

		this.create = function(){
			Post.save(self.post);
		};

	}
})();
