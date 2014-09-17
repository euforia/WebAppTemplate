
var appServices = angular.module('appServices', []);

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




