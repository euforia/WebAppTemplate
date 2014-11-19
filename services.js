
var appServices = angular.module('appServices', []);

appServices.factory('Authenticator', ['$window', '$http', '$location', function($window, $http, $location) {
    
	function _sessionIsAuthenticated() {
		if($window.sessionStorage['credentials']) {

			var creds = JSON.parse($window.sessionStorage['credentials']);
			if(creds.username && creds.username !== "" && creds.password && creds.password !== "") {
				// do custom checking here
				return true
			}
		}
		return false;
	}
	
	function _login(creds) {
		// do actual auth here //
		if(creds.username === "guest" && creds.password === "guest") {
			$window.sessionStorage['credentials'] = JSON.stringify(creds);
			return true;
		}
		return false;
	}
	
	function _logout() {
		var sStor = $window.sessionStorage;
		if(sStor['credentials']) {
			delete sStor['credentials'];
		}
		$location.url("/login");
	}
	
	var Authenticator = {
        login                 : _login,
        logout                : _logout,
		sessionIsAuthenticated: _sessionIsAuthenticated,
		checkAuthOrRedirect   : function(redirectTo) {
			
			if(!_sessionIsAuthenticated())
                $location.url("/login?redirect="+redirectTo);	
		}
    };

    return (Authenticator);
}]);

appServices.factory('ConfigManager', ['$http', function($http) {

    var _config = null;

    function _fetchConfig(callback) {

        $http({
            url: "/conf/config.json",
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).success(function(data, status, headers, config) {
            
            _config = data;
            callback(_config);
        }).error(function(data, status, headers, config) {
            
            console.error(data);
        });
    }

    return {
        getConfig: function(callback, fresh) {
            
            if(_config && !fresh) return callback(_config);
            
            _fetchConfig(callback)
        }
    };
}]);




