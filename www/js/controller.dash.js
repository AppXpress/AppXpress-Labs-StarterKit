angular.module('starter.controllers').controller('DashCtrl', function($scope, $translate, menuService) {


	menuService.init();

	menuService.openSideMenu();

	menuService.closeSideMenu($scope.state);

	$scope.changeLanguage = function(key) {
		$translate.use(key);
		$scope.locales = {
			dynamicLocaleValue : key
		};
	};
});