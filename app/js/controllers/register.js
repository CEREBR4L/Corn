
angular.module('app')
	.controller('register', ['$scope',  '$location', '$rootScope', 'createUser', 'authenticate', function newController($scope, $location, $rootScope, createUser, authenticate){

		$scope.status = "";

		$scope.register = function(){

            console.log("You are being registered now!");

			const user = $.param({
				username: $scope.username,
				password: $scope.password,
				email: $scope.email
			});

			createUser.postUser(user)
				.then( (data, status, headers, config) => {

					if(data.data.authenticated){

						console.log('logging in...');

						const login = $.param({
							username: $scope.username,
							password: $scope.password
						});

						
						authenticate.login(login)
							.then( (data, status, headers, config) => {

								if(data.data.loggedIn){

									$rootScope.loggedIn = true;

									$location.path('/profile');
									
								}
								else{
									$scope.status = data.data.message;
								}

							})
							.catch((e) => {

								console.log("There was an error logging user in: " + e);

								$scope.status = "Error logging user in.";

							});

					}
					else{
						$scope.hasError = true;
						$scope.status = data.data.message;
					}

				})
				.catch( (e) => {

					console.log("There was an error creating your account: " + e);

					$scope.status = "Error registering user.";

				});

        }

	}]);

