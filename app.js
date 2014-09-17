
var app = angular.module('app', [
	'ngRoute',
	'appDirectives',
	'appFactories',
	'appControllers',
	'appServices'
]);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/login', {
				templateUrl: 'partials/login.html',
				controller: 'loginController'
			})
			.otherwise({
				redirectTo: '/login'
			});
	}
]);

app.filter('objectLength', function() {
	return function(obj) {
    	return Object.keys(obj).length;
	};
});
