/*
  Service for creating side menu with tab view template in ionic.
*/

angular.module('starter.services')
    .factory('menuService', function($rootScope) {
       

        function kickstart() {

            // menu list
            $rootScope.menulist = [{
                name: 'Home',
                icon: 'ion-home',
                goTo: 'tab.dash'
            }, {
                name: 'Help',
                icon: 'ion-help-circled',
                goTo: 'disclaimer'
            }, {
                name: 'Settings',
                icon: 'ion-settings',
                goTo: 'settings'
            }, {
                name: 'Terms and conditions',
                icon: 'ion-flag',
                goTo: 'disclaimer'
            }, {
                name: 'Feedback',
                icon: 'ion-star',
                goTo: 'disclaimer'
            }, {
                name: 'Thank You',
                icon: 'ion-heart',
                goTo: 'disclaimer'
            }];

            // initializing the menu object
            $rootScope.slideLeft = new Menu({
                wrapper: '#o-wrapper',
                type: 'slide-right',
                menuOpenerClass: '.starter-kit-button',
                maskId: '#starter-kit-mask'
            });
        }


        function openSideMenu_() {
            // open menu


            $rootScope.openSideMenu = function() {
                /**
                 * Slide left instantiation and action.
                 */
                $rootScope.slideLeft.open();


            }
        }

        function closeSideMenu_() {
            $rootScope.closeSideMenu = function(state) {
                console.log(state);
                $state.go(state);
                $rootScope.slideLeft.close();


            }
        }

        return {
            init: function() {
                 kickstart();
            },
            openSideMenu: function() {
                openSideMenu_();
            },
            closeSideMenu: function(state) {
                closeSideMenu_(state);
            }
        };
    })
