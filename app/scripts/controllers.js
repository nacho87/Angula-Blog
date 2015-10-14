(function(){
	'use strict';

	angular
		.module('blog.controllers', ['blog.services', 'uiGmapgoogle-maps'])
		.controller('PostListController', PostListController)
		.controller('PostDetailController', PostDetailController)
		.controller('PostCreateController', PostCreateController)
		.controller('UserDetailsController', UserDetailsController);


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

	function UserDetailsController($routeParams, User){
		var self = this;// to save the ref
		User.query({id: $routeParams.userId})
		.$promise.then(
			function (data){
				self.user = data;
				var glat = self.user[0].address.geo.lat;
				var glng = self.user[0].address.geo.lng;

				self.map = {
					center : {
						latitude: glat,
						longitude: glng
					},
					zoom: 15
				};
				self.marker = {
					id: 0,
					coords:{
						latitude: glat,
						longitude: glng,
					},
					show: false,
				};
				self.windowOptions = {
					visible: false
				};

				self.onClick = function() {
					self.windowOptions.visible = !self.windowOptions.visible;
				};

				self.closeClick = function() {
					self.windowOptions.visible = false;
				};

				self.title = "Save Me!!";
			}
		);
	}
})();
