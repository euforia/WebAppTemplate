
var app = angular.module('app', [
	'ngRoute',
	'appDirectives',
	'appFactories',
	'appControllers',
	'appServices',
    'pageheader',
    'login'
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
			templateUrl: 'app/login/login.html',
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
})
.filter('toHumanBytes', function() {
    return function(fileSize) {
        var kb  = fileSize/1024;
        if(kb < 1024) {
            return kb.toFixed(2).toString() +" KB";
        }

        var mb = kb/1024;
        if(mb < 1024) {
            return mb.toFixed(2).toString() +" MB";
        }

        var gb = mb/1024;
        if(gb < 1024) {
            return gb.toFixed(2).toString() +" GB";
        }

        return (gb/1024).toFixed(2).toString()+" TB";
    }
});
