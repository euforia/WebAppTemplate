
var app = angular.module('app', [
	'ngRoute',
	'appDirectives',
	'appFactories',
	'appControllers',
	'appServices'
]);

(function() {
	// Bootstrap the app with the config fetched via http //
	var configConstant = "Configuration";
	var configUrl      = "/conf/config.json";

    function fetchAndInjectConfig() {
        var initInjector = angular.injector(["ng"]);
        var $http = initInjector.get("$http");

        return $http.get(configUrl).then(function(response) {
            app.constant(configConstant, response.data);
        }, function(errorResponse) {
            // Handle error case
            console.log(errorResponse);
        });
    }

    function bootstrapApplication() {
        angular.element(document).ready(function() {
            angular.bootstrap(document, ["app"]);
        });
    }

    fetchAndInjectConfig().then(bootstrapApplication);
    
}());

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'loginController'
		}).when('/', {
			templateUrl: 'partials/root.html',
			controller: 'rootController'
		}).otherwise({
			redirectTo: '/login'
		});
	}
]);

app.filter('objectLength', function() {
	return function(obj) {
    	return Object.keys(obj).length;
	};
});
