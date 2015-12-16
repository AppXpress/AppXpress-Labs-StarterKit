angular.module('starter.controllers').controller('LoginCtrl', function($scope, $translate, $state, $rootScope) {

    $scope.signIn = function (userName, userPwd, authCode) {
//        $log.debug("starting to login");
//        if (userName != null && userPwd != null) {
            $state.go('tab.dash');
//        } else {
//            $log.debug("Username and password cannot be blank");
//        }
    };
    
    //
    $scope.showEnvSelection = function (isTrue) {
//        $log.debug("change env");
        $scope.env = isTrue;
//        $log.debug("$scope.envSelection " + $scope.envSelection);
        $rootScope.selectedURL = $scope.envSelection;

    };

});