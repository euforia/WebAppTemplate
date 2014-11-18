
var appControllers = angular.module('appControllers', []);

appControllers.controller('defaultController', [ '$window', '$location', '$scope', 
	function($window, $location, $scope) {

		$scope.pageHeaderHtml = "/partials/page-header.html";

		$scope.logOut = function() {
	        
	        console.log("De-authing...");
	        var sStor = $window.sessionStorage;
	        if(sStor['credentials']) {
	            delete sStor['credentials'];
	        }

	        var lStor = $window.localStorage;
	        for(var k in lStor) {
	            if(/^token\-/.test(k)) delete lStor[k];
	        }

	        $location.url("/login");
	    }
	}
]);

appControllers.controller('loginController', [
	'$scope', '$window', '$routeParams', '$location',
	function($scope, $window, $routeParams, $location) {
		
		$scope.credentials = { username: "", password: "" };

		$scope.attemptLogin = function() {
			if(Authenticator.login($scope.credentials)) {

				if($routeParams.redirect) $location.url($routeParams.redirect);
				else $location.url(defaultPage);
			} else {

				$("#login-window-header").html("<span>Auth failed!</span>");
			}
		}

		function _initialize() {
			if($window.sessionStorage['credentials']) {

				var creds = JSON.parse($window.sessionStorage['credentials']);
				if(creds.username && creds.username !== "" && creds.password && creds.password !== "") {

					$scope.credentials = creds;
					$scope.attemptLogin();
				}
			}
		}

		_initialize();
	}
]);
