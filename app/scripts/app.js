(function(){
'use strict';
	//Here the funcionality

	angular.module('blog',['ngRoute']);

	function config($locationProvider, $routeProvider){
		$locationProvider.html5Mode('true');

	}

})();
