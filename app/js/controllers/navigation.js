
angular.module('app')
	.controller('navigation', ['$scope', '$rootScope', '$location', 'checkLogin', 'logout', function newController($scope, $rootScope, $location, checkLogin, logout){

		checkLogin.getLoginStatus()
            .then(function(data, status, headers, config){

                $rootScope.loggedIn = data.data.authenticated;

            });

        $rootScope.logout = function(){

            logout.getLoggedOut()
                .then(function(data, status, headers, config){

                    $rootScope.loggedIn = false;

                    $location.path('/');

                });

        }

	}]);


