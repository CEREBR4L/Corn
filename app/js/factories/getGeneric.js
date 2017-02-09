'use strict';

angular.module('app').factory('getGeneric', ($http) => {

	return {

		getData: () => {

			return $http.get('/data').success((data) => {
				return data;
			});
		}

	};
});