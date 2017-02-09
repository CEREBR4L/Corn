angular.module('app')
    .factory('logout', ($http) => {

        return {

            getLoggedOut: () => {

                return $http.get('/api/auth/logout')
                    .success( (data) => {
                        return data;
                    });
                
            }

        };
        
});

