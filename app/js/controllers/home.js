'use strict';

angular.module('app').controller('home', function homeController($scope, getGeneric) {

	$scope.title = "Welcome to Corn";
	$scope.subTitle = "A MEAN boilerplate for JavaScript apps";

	getGeneric.getData().then((resp) => {
		$scope.data = resp.data;
	});
});