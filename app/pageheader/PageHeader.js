angular.module('pageheader', [])
.directive('pageHeaderUi', [function() {
    return {
        restrict: 'A',
        templateUrl: 'app/pageheader/page-header.html',
        link: function(scope, elem, attrs, ctrl) {
            if(!ctrl) return;
        }
    }
}])