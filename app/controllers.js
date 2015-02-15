angular.module('appControllers', [])
.controller('rootController', [ '$window', '$location', '$scope', 'Authenticator',
	function($window, $location, $scope, Authenticator) {
		
		Authenticator.checkAuthOrRedirect("/");

	}
])
.controller('defaultController', [ '$window', '$location', '$scope', 
	function($window, $location, $scope) {

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
