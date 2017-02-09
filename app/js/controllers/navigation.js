
angular.module('app')
	.controller('navigation', ['$scope', '$rootScope', '$location', 'checkLogin', 'logout', function newController($scope, $rootScope, $location, checkLogin, logout){

		checkLogin.getLoginStatus()
            .then( (data, status, headers, config) => {

                $rootScope.loggedIn = data.data.authenticated;

            });

        $rootScope.logout = () => {

            logout.getLoggedOut()
                .then( (data, status, headers, config) => {

                    $rootScope.loggedIn = false;

                    $location.path('/');

                });

        }

	}]);


