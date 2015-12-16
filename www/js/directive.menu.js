angular.module('starter-kit.directives', [])
    .directive('menu', function($compile, $http, $templateCache, menuService) {

        return {
            restrict: 'E',
            scope: {
                menulist: '=',
                side: '@',
                direct: '&'
            },
            controller : function(){
                menuService.init();
            },
            templateUrl: 'templates/menu/menu.html'
        }
    })
