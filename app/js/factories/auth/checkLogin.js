angular.module('app')
    .factory('checkLogin', ($http) => {

        return {

            getLoginStatus: () => {

                return $http.get('/api/auth/checkLogin')
                    .success( (data) => {
                        return data;
                    });
                
            }

        };
        
});

