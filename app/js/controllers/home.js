
angular.module('app')
	.controller('home', ['$scope', 'getGeneric', function homeController($scope, getGeneric) {

		$scope.title = "Welcome to Corn";
		$scope.subTitle = "A MEAN boilerplate for JavaScript apps";

		getGeneric.getData().then((resp) => {
			$scope.data = resp.data;
		});
	}]);

	