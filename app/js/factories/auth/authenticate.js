
angular.module('app')
    .factory('authenticate', ($http) => {

        return {

            login: (user) => {

                return $http({

					method: 'POST',
					url: '/api/auth/authenticate',
					data: user,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'} 

				});

			} 

        }

    });
    
    