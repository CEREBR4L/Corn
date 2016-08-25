'use strict';

angular.module('app').factory('getGeneric', function ($http) {

	return {

		getData: function getData() {

			return $http.get('/data').success((data) => {
				return data;
			});
		}

	};
});