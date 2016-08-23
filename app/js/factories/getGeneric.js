angular.module('app')
	.factory('getGeneric', function($http){

		return{

			getData: function(){

				return $http.get('/data').success(function(data){
					return data;
				})

			}

		}

	});

