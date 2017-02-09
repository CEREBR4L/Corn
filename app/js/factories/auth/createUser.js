
angular.module('app')
    .factory('createUser', ($http) => {

        return {

            postUser: (user) => {

                return $http({

					method: 'POST',
					url: '/api/auth/new',
					data: user,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'} 

				});

			} 

        }

    });
    

