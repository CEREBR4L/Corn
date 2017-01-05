'use strict';

var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: 'templates/home.html',
		controller: 'home'
	})
	.when('/login', {
		templateUrl: 'templates/login.html',
		controller: 'login'
	})
	.when('/register', {
		templateUrl: 'templates/register.html',
		controller: 'register'
	})
	.otherwise({
		redirectTo: '/'
	});

	$locationProvider.html5Mode(true);
});