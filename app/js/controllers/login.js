
angular.module('app')
	.controller('login', ['$scope', '$location', '$rootScope', 'authenticate', 'checkLogin', function newController($scope, $location, $rootScope, authenticate, checkLogin){

		$scope.login = () => {

			$scope.hasError = false;
			$scope.passwordWrong = false;

            console.log("Attempting to log you in now..");

			const user = $.param({
				username: $scope.username,
				password: $scope.password
			});

			authenticate.login(user)
				.then( (data, status, headers, config) => {

					if(data.data.loggedIn){

						$rootScope.loggedIn = true;

						$location.path('/profile');

					}
					else{

						if(data.data.message === "Password incorrect"){

							$scope.passwordWrong = true;

						}
						else{

							$scope.hasError = true;

						}

						$scope.status = data.data.message;

					}

				})
				.catch( (e) => {

					console.log("There was an error logging user in: " + e);

					$scope.status = "Error logging user in.";

				});

        }

	}]);

