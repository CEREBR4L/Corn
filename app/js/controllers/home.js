'use strict';

angular.module('app').controller('home', function homeController($scope, getGeneric) {

	$scope.title = "Welcome to Corn";
	$scope.subTitle = "A MEAN boilerplate for JavaScript apps";

	var dataText = getGeneric.getData;

	getGeneric.getData().then(function (resp) {
		$scope.data = resp.data;
	});
});