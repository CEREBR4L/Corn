angular.module('app')
	.controller('home', function homeController($scope, getGeneric){

		$scope.title = "Welcome to Corn";
		$scope.subTitle = "A MEAN boilerplate for JavaScript apps";

		var dataText = getGeneric.getData;

		getGeneric.getData().then(
			function(resp){
				$scope.dataTitle = resp.data[0].title;
				$scope.dataBody = resp.data[0].text;
			}
		);

	});

